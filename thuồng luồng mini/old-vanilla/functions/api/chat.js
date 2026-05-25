export async function onRequestPost(context) {
    const { request, env } = context;

    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [
        'https://thuongluongmini.pages.dev',
        'http://localhost:8788',
        'http://127.0.0.1:8788',
        'http://localhost:3000'
    ];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : 'https://thuongluongmini.pages.dev';

    const corsHeaders = {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const body = await request.json();
        const { messages, contextData } = body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: 'Tin nhắn không hợp lệ' }), { status: 400, headers: corsHeaders });
        }

        if (messages.length > 30) {
            return new Response(JSON.stringify({ error: 'Cuộc hội thoại quá dài. Vui lòng bắt đầu lại.' }), { status: 400, headers: corsHeaders });
        }

        const contextStr = String(contextData || '');
        if (contextStr.length > 50000) {
            return new Response(JSON.stringify({ error: 'Dữ liệu ngữ cảnh quá lớn' }), { status: 400, headers: corsHeaders });
        }

        const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
        const rateKey = `chat:${clientIp}`;
        const limit = 20;
        const windowSec = 3600;

        if (env.CHAT_KV) {
            const count = parseInt(await env.CHAT_KV.get(rateKey) || '0', 10);
            if (count >= limit) {
                return new Response(JSON.stringify({ error: 'Bạn đã gửi quá nhiều tin nhắn. Thử lại sau 1 giờ nhé!' }), { status: 429, headers: corsHeaders });
            }
            await env.CHAT_KV.put(rateKey, String(count + 1), { expirationTtl: windowSec });
        }

        const apiKey = env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'Chưa cấu hình API Key. Vui lòng thêm biến môi trường GEMINI_API_KEY trong Cloudflare Pages.'
            }), {
                status: 500,
                headers: corsHeaders
            });
        }

        const systemInstruction = `Bạn là "Bé Thuồng Luồng", một trợ lý ảo siêu dễ thương, nhiệt tình và am hiểu về du lịch, ẩm thực tại Tuyên Quang. 
Nhiệm vụ của bạn là tư vấn cho khách du lịch và người dân địa phương dựa trên danh sách các địa điểm có sẵn trong hệ thống Thuồng Luồng Mini.
Nếu người dùng hỏi về địa điểm ăn uống, vui chơi, du lịch, hãy cố gắng gợi ý từ DỮ LIỆU ĐỊA ĐIỂM dưới đây. 
Nếu câu hỏi không nằm trong dữ liệu, hãy trả lời bằng kiến thức của bạn một cách khéo léo nhưng ưu tiên dữ liệu hệ thống.
Hãy xưng hô thân thiện (em/mình/tớ và gọi người dùng là bạn/anh/chị). Không bao giờ xưng là AI hay mô hình ngôn ngữ.
Văn phong vui vẻ, có sử dụng emoji phù hợp.
Tránh trả lời quá dài dòng, hãy chia thành các gạch đầu dòng dễ đọc.

DỮ LIỆU ĐỊA ĐIỂM TRONG HỆ THỐNG:
${contextStr.slice(0, 40000)}
`;

        const geminiMessages = messages.slice(-20).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(msg.content || '').slice(0, 2000) }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: geminiMessages,
                systemInstruction: {
                    role: 'user',
                    parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', data);
            return new Response(JSON.stringify({ error: data.error?.message || 'Lỗi khi gọi Gemini API' }), {
                status: 500,
                headers: corsHeaders
            });
        }

        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Em chưa trả lời được, bạn thử hỏi lại nhé!';

        return new Response(JSON.stringify({ reply: replyText }), { headers: corsHeaders });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: corsHeaders
        });
    }
}
