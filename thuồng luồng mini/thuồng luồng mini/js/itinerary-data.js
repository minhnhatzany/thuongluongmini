// js/itinerary-data.js

export const ITINERARIES = [
  {
    id: 'ha-giang-loop-3n2d',
    title: 'Hà Giang Loop 3 Ngày 2 Đêm',
    shortDesc: 'Khám phá trọn vẹn Cao nguyên đá Đồng Văn, Mã Pí Lèng và Sông Nho Quế trong 3 ngày.',
    duration: '3 Ngày 2 Đêm',
    distance: '~350 km',
    transport: 'Xe máy',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800',
    costEstimate: '1.500.000đ - 2.500.000đ/người',
    tags: ['Phượt', 'Núi đèo', 'Cao nguyên đá'],
    days: [
      {
        day: 1,
        title: 'Hà Giang - Quản Bạ - Yên Minh - Đồng Văn',
        distance: '130 km',
        activities: [
          { time: '08:00', desc: 'Xuất phát từ TP. Hà Giang, check-in Cột mốc Km 0', type: 'location' },
          { time: '10:00', desc: 'Chinh phục Dốc Bắc Sum, dừng chân ở Cổng trời Quản Bạ, ngắm Núi Đôi Cô Tiên', type: 'photo' },
          { time: '12:30', desc: 'Ăn trưa tại thị trấn Yên Minh', type: 'food' },
          { time: '14:30', desc: 'Vượt Dốc Thẩm Mã, ghé thăm Nhà của Pao (Lũng Cẩm)', type: 'culture' },
          { time: '16:00', desc: 'Tham quan Dinh thự Vua Mèo (Sà Phìn)', type: 'history' },
          { time: '18:00', desc: 'Tới Đồng Văn, nhận phòng, ăn tối và dạo Phố cổ Đồng Văn', type: 'sleep' }
        ],
        sleepLocation: 'Đồng Văn',
        bookingLinks: [
          { name: 'Đồng Văn Cliffside House', url: '#' },
          { name: 'Plum Homestay', url: '#' }
        ]
      },
      {
        day: 2,
        title: 'Đồng Văn - Lũng Cú - Mã Pí Lèng - Mèo Vạc',
        distance: '90 km',
        activities: [
          { time: '08:00', desc: 'Chạy xe lên Cột cờ Lũng Cú - Điểm cực Bắc Tổ quốc', type: 'location' },
          { time: '11:00', desc: 'Trở lại Đồng Văn ăn trưa', type: 'food' },
          { time: '13:30', desc: 'Chinh phục đèo Mã Pí Lèng - một trong Tứ đại đỉnh đèo', type: 'photo' },
          { time: '15:00', desc: 'Đi thuyền trên Sông Nho Quế, đi qua Hẻm Tu Sản', type: 'activity' },
          { time: '17:30', desc: 'Đến Mèo Vạc nhận phòng, thưởng thức thắng cố, lợn bản', type: 'sleep' }
        ],
        sleepLocation: 'Mèo Vạc',
        bookingLinks: [
          { name: 'Auberge de Meo Vac (Nhà cổ)', url: '#' },
          { name: 'Lo Lo Homestay & Cafe', url: '#' }
        ]
      },
      {
        day: 3,
        title: 'Mèo Vạc - Du Già - Hà Giang',
        distance: '130 km',
        activities: [
          { time: '08:00', desc: 'Mua sắm tại chợ Mèo Vạc, khởi hành đi Du Già', type: 'shopping' },
          { time: '10:30', desc: 'Đường đi hoang sơ tuyệt đẹp qua đèo chữ M', type: 'photo' },
          { time: '12:00', desc: 'Đến bản Du Già, ăn trưa tại homestay người Tày', type: 'food' },
          { time: '14:00', desc: 'Tắm suối Thâm Luông trong vắt', type: 'activity' },
          { time: '15:30', desc: 'Lên đường về lại TP. Hà Giang', type: 'location' },
          { time: '18:00', desc: 'Về tới TP. Hà Giang, trả xe, kết thúc hành trình', type: 'location' }
        ],
        sleepLocation: null,
        bookingLinks: []
      }
    ],
    tips: [
      'Nên thuê xe máy số (Wave/Blade) hoặc xe côn tay (XR150), không nên đi xe ga vì đèo rất dốc.',
      'Luôn mang theo áo ấm vì nhiệt độ trên núi có thể giảm sâu vào ban đêm.',
      'Cần có Giấy phép vào khu vực biên giới (mua tại Hà Giang hoặc Đồng Văn).'
    ]
  },
  {
    id: 'na-hang-lam-binh-2n1d',
    title: 'Na Hang - Lâm Bình 2 Ngày 1 Đêm',
    shortDesc: 'Chìm đắm trong Hạ Long giữa đại ngàn xanh thẳm của xứ Tuyên.',
    duration: '2 Ngày 1 Đêm',
    distance: '~150 km',
    transport: 'Ô tô / Xe máy',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=800',
    costEstimate: '1.200.000đ - 1.800.000đ/người',
    tags: ['Sinh thái', 'Du thuyền', 'Gia đình'],
    days: [
      {
        day: 1,
        title: 'TP. Tuyên Quang - Bến Thủy Lâm Bình - Thác Khuổi Nhi',
        distance: '150 km',
        activities: [
          { time: '07:00', desc: 'Khởi hành từ TP. Tuyên Quang đi Lâm Bình', type: 'location' },
          { time: '11:00', desc: 'Tới bến thủy, lên thuyền và ăn trưa trên thuyền với đặc sản cá lăng', type: 'food' },
          { time: '13:30', desc: 'Tham quan Cọc Vài Phạ (Cọc buộc trâu trời)', type: 'photo' },
          { time: '15:00', desc: 'Đến Thác Khuổi Nhi, trekking nhẹ và trải nghiệm massage cá suối tự nhiên', type: 'activity' },
          { time: '17:30', desc: 'Về nhận phòng homestay tại Thượng Lâm, ăn tối với người Tày', type: 'sleep' }
        ],
        sleepLocation: 'Lâm Bình',
        bookingLinks: [
          { name: 'Homestay Tài Ngào', url: '#' },
          { name: 'Homestay Hoàng Tuấn', url: '#' }
        ]
      },
      {
        day: 2,
        title: 'Khám phá Bản làng - TP. Tuyên Quang',
        distance: '150 km',
        activities: [
          { time: '07:30', desc: 'Ăn sáng, dạo quanh bản Tày bằng xe đạp', type: 'activity' },
          { time: '09:00', desc: 'Chèo thuyền mảng trên suối, chụp ảnh', type: 'photo' },
          { time: '11:30', desc: 'Ăn trưa tại homestay', type: 'food' },
          { time: '13:00', desc: 'Lên xe khởi hành về TP. Tuyên Quang', type: 'location' },
          { time: '16:30', desc: 'Tới TP. Tuyên Quang, có thể tắm Suối khoáng Mỹ Lâm thư giãn', type: 'activity' }
        ],
        sleepLocation: null,
        bookingLinks: []
      }
    ],
    tips: [
      'Mang theo đồ bơi, quần áo gọn nhẹ để tắm thác Khuổi Nhi.',
      'Sóng điện thoại ở một số khu vực trên lòng hồ khá yếu.',
      'Nên đi theo nhóm 4-10 người để thuê trọn chuyến thuyền sẽ rẻ hơn.'
    ]
  }
];
