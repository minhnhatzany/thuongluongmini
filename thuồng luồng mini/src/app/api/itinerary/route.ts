import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { days, budget, interests, groupSize } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Thiếu GEMINI_API_KEY' }, { status: 500 });
    }

    const prompt = `Bạn là Thổ Địa Tuyên Quang, một chuyên gia du lịch địa phương cực kỳ am hiểu về Tuyên Quang, Việt Nam.
Hãy thiết kế một lịch trình du lịch Tuyên Quang chi tiết dựa trên yêu cầu sau:
- Thời gian: ${days} ngày
- Ngân sách: ${budget}
- Sở thích: ${interests}
- Đi cùng: ${groupSize}

Yêu cầu định dạng đầu ra PHẢI LÀ JSON hợp lệ với cấu trúc chính xác như sau (KHÔNG thêm markdown \`\`\`json hay bất kỳ văn bản nào khác ngoài JSON):
{
  "id": "ai-generated",
  "title": "Tên lịch trình hấp dẫn do bạn nghĩ ra",
  "description": "Đoạn mô tả ngắn về lịch trình này",
  "image": "https://images.unsplash.com/photo-1542361345-89e58247f2d5?auto=format&fit=crop&q=80",
  "duration": "${days} ngày",
  "budget": "${budget}",
  "tags": ["tag1", "tag2"],
  "days": [
    {
      "day": 1,
      "title": "Tên chủ đề ngày 1",
      "activities": [
        {
          "time": "08:00 - 09:00",
          "title": "Tên hoạt động",
          "description": "Mô tả chi tiết hoạt động",
          "location": "Tên địa điểm ở Tuyên Quang"
        }
      ]
    }
  ]
}

Hãy đưa các địa danh có thật ở Tuyên Quang (như ATK Tân Trào, Na Hang, Hồng Thái, Suối khoáng Mỹ Lâm, đền Hạ, lẩu cá lăng sông Lô...). Đảm bảo JSON hợp lệ để parse.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return NextResponse.json({ error: 'Lỗi khi gọi AI' }, { status: 500 });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return NextResponse.json({ error: 'AI trả về kết quả rỗng' }, { status: 500 });
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(text);
    } catch (e) {
      // Thử dọn dẹp markdown nếu AI vẫn trả về
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedJson = JSON.parse(cleanedText);
    }

    return NextResponse.json(parsedJson);
  } catch (error) {
    console.error("AI Itinerary Error:", error);
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}
