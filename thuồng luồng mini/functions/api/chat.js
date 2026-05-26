export async function onRequestPost(context) {
  try {
    const requestData = await context.request.json();
    const userMessage = requestData.message;

    // Lấy Groq API Key từ biến môi trường Cloudflare
    const apiKey = context.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({
        error: "Server chưa được cấu hình GROQ_API_KEY"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const systemPrompt = `Bạn là "Bé Na" - một hướng dẫn viên du lịch ảo cực kỳ thân thiện, đáng yêu và am hiểu mọi thứ về Tuyên Quang.
Bạn đang làm việc cho trang web "Thuồng Luồng Mini" - Nền tảng Review địa phương số 1 Tuyên Quang.
Hãy xưng hô là "Bé Na" và gọi người dùng là "bạn" hoặc "cậu".
Luôn trả lời ngắn gọn (dưới 150 chữ), vui vẻ, dùng emoji và tập trung vào các địa điểm ăn uống, du lịch ở Tuyên Quang.
Nếu không biết thông tin cụ thể, hãy gợi ý khách khám phá trang web để tìm thêm.`;

    // Gọi Groq API (hoàn toàn miễn phí, 14400 req/ngày)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const aiText = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply: aiText }), {
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
