export async function onRequestPost(context) {
  try {
    // 1. Lấy dữ liệu người dùng gửi lên
    const requestData = await context.request.json();
    const userMessage = requestData.message;
    
    // 2. Lấy API Key từ biến môi trường của Cloudflare
    const apiKey = context.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        error: "Server chưa được cấu hình GEMINI_API_KEY" 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Chuẩn bị prompt hướng dẫn AI
    const systemPrompt = `
      Bạn là "Bé Na" - một hướng dẫn viên du lịch ảo cực kỳ thân thiện, đáng yêu và am hiểu mọi thứ về Tuyên Quang. 
      Bạn đang làm việc cho trang web "Thuồng Luồng Mini" - Nền tảng Review địa phương số 1 Tuyên Quang.
      Hãy xưng hô là "Bé Na" và gọi người dùng là "bạn" hoặc "cậu".
      Luôn trả lời ngắn gọn (dưới 100 chữ), vui vẻ, dùng emoji và tập trung vào các địa điểm ăn uống, du lịch ở Tuyên Quang.
      Dưới đây là câu hỏi của khách:
    `;

    // 4. Gọi Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\\n\\n" + userMessage }]
          }
        ]
      })
    });

    const data = await response.json();

    // Xử lý lỗi từ Google API
    if (data.error) {
      throw new Error(data.error.message);
    }

    // Lấy câu trả lời
    const aiText = data.candidates[0].content.parts[0].text;

    // Trả về cho client
    return new Response(JSON.stringify({ 
      reply: aiText 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: "Bé Na đang bận ngủ trưa, cậu thử lại sau nhé! Lỗi: " + error.message
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
