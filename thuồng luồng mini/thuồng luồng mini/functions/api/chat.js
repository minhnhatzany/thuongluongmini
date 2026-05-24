export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { messages, contextData } = body;

        const apiKey = env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ 
                error: "Chưa cấu hình API Key. Vui lòng thêm biến môi trường GEMINI_API_KEY trong Cloudflare Pages." 
            }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Prepare the system prompt using the context data (the places list)
        const systemInstruction = `Bạn là "Bé Thuồng Luồng", một trợ lý ảo siêu dễ thương, nhiệt tình và am hiểu về du lịch, ẩm thực tại Tuyên Quang. 
Nhiệm vụ của bạn là tư vấn cho khách du lịch và người dân địa phương dựa trên danh sách các địa điểm có sẵn trong hệ thống Thuồng Luồng Mini.
Nếu người dùng hỏi về địa điểm ăn uống, vui chơi, du lịch, hãy cố gắng gợi ý từ DỮ LIỆU ĐỊA ĐIỂM dưới đây. 
Nếu câu hỏi không nằm trong dữ liệu, hãy trả lời bằng kiến thức của bạn một cách khéo léo nhưng ưu tiên dữ liệu hệ thống.
Hãy xưng hô thân thiện (em/mình/tớ và gọi người dùng là bạn/anh/chị). Không bao giờ xưng là AI hay mô hình ngôn ngữ.
Văn phong vui vẻ, có sử dụng emoji phù hợp.
Tránh trả lời quá dài dòng, hãy chia thành các gạch đầu dòng dễ đọc.

DỮ LIỆU ĐỊA ĐIỂM TRONG HỆ THỐNG:
${contextData}
`;

        // Map the user messages to Gemini format
        const geminiMessages = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Call Gemini 1.5 Flash API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: geminiMessages,
                systemInstruction: {
                    role: "user",
                    parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800,
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return new Response(JSON.stringify({ error: data.error?.message || "Lỗi khi gọi Gemini API" }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const replyText = data.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ reply: replyText }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
