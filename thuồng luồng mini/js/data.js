/**
 * ============================================================
 *  THUỒNG LUỒNG MINI — Dữ liệu mẫu
 *  Nền tảng khám phá lifestyle địa phương tại Tuyên Quang
 * ============================================================
 *
 *  File này chứa toàn bộ dữ liệu mock cho ứng dụng:
 *    • CATEGORIES   – Danh mục chính
 *    • SUB_CATEGORIES – Danh mục con
 *    • PLACES        – Danh sách địa điểm (28 địa điểm)
 *    • Helper functions – Truy vấn & tìm kiếm
 */

// ─── DANH MỤC CHÍNH ─────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'an-uong',
    name: 'Ăn uống',
    icon: '🍜',
    description: 'Khám phá ẩm thực đa dạng tại Tuyên Quang — từ phở nóng hổi buổi sáng đến trà sữa mát lạnh buổi chiều.',
    color: '#F4A261'
  },
  {
    id: 'vui-choi',
    name: 'Vui chơi giải trí',
    icon: '🎮',
    description: 'Tìm nơi giải trí, thư giãn sau giờ làm — karaoke, phim ảnh, trò chơi và nhiều hơn nữa.',
    color: '#2A9D8F'
  },
  {
    id: 'du-lich',
    name: 'Du lịch',
    icon: '✈️',
    description: 'Khám phá danh lam thắng cảnh, di tích lịch sử và vẻ đẹp thiên nhiên của xứ Tuyên.',
    color: '#E76F51'
  },
  {
    id: 'trang-phuc',
    name: 'Trang phục',
    icon: '👗',
    description: 'Mua sắm quần áo, phụ kiện thời trang và thuê trang phục cho mọi dịp.',
    color: '#9B59B6'
  }
];

// ─── DANH MỤC CON ───────────────────────────────────────────
const SUB_CATEGORIES = {
  'an-uong': ['Quán ăn', 'Cafe & Trà sữa', 'Nhà hàng', 'Ẩm thực đường phố', 'Bánh & Dessert', 'Bar & Pub'],
  'vui-choi': ['Karaoke', 'Rạp phim', 'Khu vui chơi', 'Billiards & Bowling', 'Game Center'],
  'du-lich': ['Danh thắng', 'Khách sạn & Homestay', 'Di tích lịch sử', 'Suối & Thác', 'Lễ hội'],
  'trang-phuc': ['Quần áo', 'Thuê trang phục', 'Phụ kiện', 'Giày dép', 'Second-hand']
};

// ─── DANH SÁCH ĐỊA ĐIỂM ─────────────────────────────────────
import { TOURISM_PLACES } from './tourism-data.js';

const BASE_PLACES = [

  /* ═══════════════════════════════════════════════════════════
   *  ĂN UỐNG  (10 địa điểm)
   * ═══════════════════════════════════════════════════════════ */

  // 1 ── Phở Tuyên ──────────────────────────────────────────
  {
    id: 1,
    name: 'Phở Tuyên',
    slug: 'pho-tuyen',
    category: 'an-uong',
    subCategory: 'Quán ăn',
    description: 'Quán phở truyền thống nổi tiếng nhất Tuyên Quang với nước dùng hầm xương hơn 12 tiếng. Phục vụ từ sáng sớm, luôn đông khách.',
    fullDescription: 'Phở Tuyên là cái tên quen thuộc với mọi người dân thành phố Tuyên Quang. Quán hoạt động từ năm 1998, nổi tiếng với bát phở bò nước dùng trong vắt nhưng đậm đà, hầm từ xương ống và các loại gia vị truyền thống trong hơn 12 tiếng đồng hồ. Bánh phở mỏng, dai, thịt bò tươi thái mỏng chín tới khi chan nước dùng nóng hổi. Không gian quán giản dị, mộc mạc nhưng luôn sạch sẽ. Mỗi buổi sáng, quán đông nghẹt khách từ 6 giờ, nhiều người phải xếp hàng chờ. Đây là điểm đến không thể bỏ qua khi đến Tuyên Quang.',
    address: '15 Đường 17/8, Tỉnh Tuyên Quang',
    phone: '0359 123 456',
    priceRange: '$',
    priceText: '35.000đ - 65.000đ',
    rating: 4.7,
    totalReviews: 245,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#F4A261', '#E9C46A', '#D4A373'],
    openHours: 'T2-CN: 05:30 - 10:00, 17:00 - 21:00',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['phở', 'ăn sáng', 'truyền thống', 'nổi tiếng'],
    amenities: ['Bãi đỗ xe', 'Mang về', 'Đặt bàn trước'],
    coordinates: { lat: 21.8230, lng: 105.2175 },
    social: {
      facebook: 'https://facebook.com/photuyen.tq',
      zalo: '0359123456',
      instagram: ''
    },
    menu: [
      { name: 'Phở bò tái', price: '40.000đ' },
      { name: 'Phở bò chín', price: '40.000đ' },
      { name: 'Phở bò đặc biệt', price: '55.000đ' },
      { name: 'Phở gà truyền thống', price: '40.000đ' },
      { name: 'Phở gà đặc biệt', price: '50.000đ' },
      { name: 'Phở tái lăn', price: '45.000đ' },
      { name: 'Nước xương hầm (thêm)', price: '10.000đ' },
      { name: 'Quẩy (3 cái)', price: '10.000đ' }
    ],
    reviews: [
      {
        id: 101,
        userName: 'Nguyễn Thị Hương',
        userAvatar: '',
        rating: 5,
        date: '2026-05-10',
        text: 'Phở ở đây ngon nhất Tuyên Quang luôn! Nước dùng trong, ngọt tự nhiên từ xương, không dùng bột ngọt nhiều. Bánh phở mỏng, thịt bò tươi. Mỗi sáng mình đều ghé, ăn hoài không chán. Chỉ tiếc là quán đông quá, có hôm phải chờ 15 phút mới có chỗ ngồi.',
        images: [],
        helpful: 34,
        reply: {
          text: 'Cảm ơn chị đã ủng hộ quán suốt thời gian qua ạ! Quán sẽ cố gắng sắp xếp chỗ ngồi tốt hơn ạ.',
          date: '2026-05-11'
        }
      },
      {
        id: 102,
        userName: 'Trần Văn Đức',
        userAvatar: '',
        rating: 5,
        date: '2026-04-28',
        text: 'Mình từ Hà Nội lên Tuyên Quang công tác, được đồng nghiệp giới thiệu quán này. Phải nói là phở ngon đặc biệt, đậm vị miền Bắc chính hiệu. Bát phở đặc biệt 55k mà thịt bò đầy ắp, rất hời. Sẽ quay lại lần sau!',
        images: [],
        helpful: 18,
        reply: null
      },
      {
        id: 103,
        userName: 'Lê Minh Châu',
        userAvatar: '',
        rating: 4,
        date: '2026-03-15',
        text: 'Phở ngon, nước dùng đậm đà. Tuy nhiên buổi sáng hơi đông, phải chờ khá lâu. Quán nên mở rộng thêm chỗ ngồi. Giá cả thì hợp lý cho chất lượng này.',
        images: [],
        helpful: 9,
        reply: null
      }
    ]
  },

  // 2 ── Cafe Sông Lô ───────────────────────────────────────
  {
    id: 2,
    name: 'Cafe Sông Lô',
    slug: 'cafe-song-lo',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Quán cafe view sông Lô tuyệt đẹp, không gian mở, lý tưởng để ngắm hoàng hôn và nhâm nhi cà phê cuối chiều.',
    fullDescription: 'Cafe Sông Lô tọa lạc ngay bên bờ sông Lô, mang đến cho khách hàng trải nghiệm thưởng thức cà phê với tầm nhìn panorama ra dòng sông thơ mộng. Quán được thiết kế theo phong cách mở, kết hợp giữa gỗ tự nhiên và cây xanh, tạo cảm giác gần gũi với thiên nhiên. Buổi chiều tà, khi mặt trời lặn xuống phía sau dãy núi, ánh hoàng hôn phản chiếu trên mặt sông tạo nên khung cảnh lãng mạn vô cùng. Menu đa dạng từ cà phê rang xay thủ công, trà hoa, đến các loại sinh tố trái cây tươi. Đây là điểm hẹn yêu thích của giới trẻ Tuyên Quang vào cuối tuần.',
    address: '88 Đường Bình Thuận, Tỉnh Tuyên Quang',
    phone: '0387 654 321',
    priceRange: '$$',
    priceText: '25.000đ - 75.000đ',
    rating: 4.5,
    totalReviews: 189,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg', 'placeholder-4.jpg'],
    imageColors: ['#2A9D8F', '#264653', '#287271', '#E9C46A'],
    openHours: 'T2-CN: 07:00 - 22:30',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['view đẹp', 'sông Lô', 'wifi', 'lãng mạn', 'hoàng hôn'],
    amenities: ['WiFi miễn phí', 'Điều hòa', 'Bãi đỗ xe', 'Chỗ ngồi ngoài trời', 'Live nhạc cuối tuần'],
    coordinates: { lat: 21.8248, lng: 105.2140 },
    social: {
      facebook: 'https://facebook.com/cafesonglo',
      zalo: '0387654321',
      instagram: 'https://instagram.com/cafesonglo'
    },
    menu: [
      { name: 'Cà phê đen đá', price: '25.000đ' },
      { name: 'Cà phê sữa đá', price: '30.000đ' },
      { name: 'Bạc xỉu', price: '30.000đ' },
      { name: 'Latte', price: '45.000đ' },
      { name: 'Cappuccino', price: '45.000đ' },
      { name: 'Trà đào cam sả', price: '35.000đ' },
      { name: 'Sinh tố bơ', price: '40.000đ' },
      { name: 'Nước ép cam tươi', price: '35.000đ' }
    ],
    reviews: [
      {
        id: 201,
        userName: 'Phạm Thùy Linh',
        userAvatar: '',
        rating: 5,
        date: '2026-05-18',
        text: 'View sông Lô đẹp mê ly! Chiều chiều ra đây ngồi uống cafe, ngắm hoàng hôn thì tuyệt vời lắm. Cà phê rang xay tại quán, vị đậm vừa phải, thơm. Nhân viên phục vụ nhiệt tình, không gian thoáng đãng. Giá hơi cao hơn mặt bằng chung ở Tuyên Quang nhưng xứng đáng với view này.',
        images: [],
        helpful: 27,
        reply: null
      },
      {
        id: 202,
        userName: 'Hoàng Minh Tuấn',
        userAvatar: '',
        rating: 4,
        date: '2026-04-22',
        text: 'Không gian rất chill, thích hợp để đi với bạn bè hoặc hẹn hò. Trà đào cam sả ngon, cà phê thì mình thấy khá ổn. Buổi tối cuối tuần có nhạc acoustic hay lắm. Điểm trừ nhỏ là cuối tuần hơi đông, nên đặt bàn trước.',
        images: [],
        helpful: 15,
        reply: {
          text: 'Cảm ơn bạn đã ghé quán! Cuối tuần bạn có thể nhắn Zalo để đặt bàn trước nhé ạ.',
          date: '2026-04-23'
        }
      },
      {
        id: 203,
        userName: 'Đỗ Ngọc Anh',
        userAvatar: '',
        rating: 5,
        date: '2026-03-30',
        text: 'Quán cafe yêu thích nhất của mình ở Tuyên Quang. Mỗi lần từ Hà Nội về quê là phải ghé. View sông Lô lúc chiều tà đẹp lắm, chụp ảnh rất ảo. Recommend trà đào cam sả và sinh tố bơ nhé mọi người!',
        images: [],
        helpful: 22,
        reply: null
      }
    ]
  },

  // 3 ── Nhà hàng Hương Việt ─────────────────────────────────
  {
    id: 3,
    name: 'Nhà hàng Hương Việt',
    slug: 'nha-hang-huong-viet',
    category: 'an-uong',
    subCategory: 'Nhà hàng',
    description: 'Nhà hàng sang trọng phục vụ ẩm thực Việt Nam đẳng cấp, chuyên tiệc cưới và hội nghị.',
    fullDescription: 'Nhà hàng Hương Việt là một trong những nhà hàng cao cấp nhất tại thành phố Tuyên Quang, chuyên phục vụ các món ăn Việt Nam truyền thống được chế biến với kỹ thuật hiện đại. Không gian nhà hàng rộng rãi, sang trọng với 3 tầng phục vụ, bao gồm cả phòng VIP riêng biệt cho các buổi tiệc, hội nghị. Thực đơn phong phú từ các món đặc sản vùng miền đến hải sản tươi sống. Đội ngũ bếp trưởng có nhiều năm kinh nghiệm, đảm bảo mỗi món ăn đều đạt chuẩn về hương vị và cách trình bày. Nhà hàng cũng nhận tổ chức tiệc cưới, sinh nhật, và các sự kiện đặc biệt.',
    address: '256 Đường Trần Hưng Đạo, Tỉnh Tuyên Quang',
    phone: '0207 381 8888',
    priceRange: '$$$',
    priceText: '150.000đ - 500.000đ',
    rating: 4.3,
    totalReviews: 156,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#9B59B6', '#8E44AD', '#6C3483'],
    openHours: 'T2-CN: 10:00 - 14:00, 17:00 - 22:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['sang trọng', 'tiệc cưới', 'hội nghị', 'VIP', 'hải sản'],
    amenities: ['Điều hòa', 'Bãi đỗ xe rộng', 'Phòng VIP', 'Thanh toán thẻ', 'WiFi miễn phí', 'Sân khấu'],
    coordinates: { lat: 21.8215, lng: 105.2195 },
    social: {
      facebook: 'https://facebook.com/huongviet.tq',
      zalo: '0207381888',
      instagram: ''
    },
    menu: [
      { name: 'Gỏi cuốn tôm thịt (2 cuốn)', price: '55.000đ' },
      { name: 'Chả giò giòn (4 cuốn)', price: '65.000đ' },
      { name: 'Bò lúc lắc khoai tây', price: '185.000đ' },
      { name: 'Cá chép om dưa', price: '220.000đ' },
      { name: 'Lẩu thập cẩm (2-3 người)', price: '350.000đ' },
      { name: 'Gà đồi hấp muối', price: '280.000đ' },
      { name: 'Rau muống xào tỏi', price: '45.000đ' },
      { name: 'Cơm chiên Dương Châu', price: '75.000đ' }
    ],
    reviews: [
      {
        id: 301,
        userName: 'Vũ Thành Nam',
        userAvatar: '',
        rating: 4,
        date: '2026-05-05',
        text: 'Nhà hàng rộng rãi, phục vụ chuyên nghiệp. Món bò lúc lắc ngon, thịt bò mềm, gia vị vừa ăn. Cá chép om dưa cũng rất đậm đà. Giá hơi cao nhưng chất lượng tương xứng. Phù hợp cho các buổi tiệc, đãi khách.',
        images: [],
        helpful: 11,
        reply: null
      },
      {
        id: 302,
        userName: 'Bùi Thị Mai',
        userAvatar: '',
        rating: 5,
        date: '2026-04-12',
        text: 'Mình tổ chức sinh nhật cho bé ở đây, rất hài lòng. Phòng VIP rộng, trang trí đẹp. Nhân viên hỗ trợ setup từ A đến Z. Đồ ăn ngon, đặc biệt là gà đồi hấp muối — thịt ngọt, da giòn. Sẽ giới thiệu cho bạn bè.',
        images: [],
        helpful: 19,
        reply: {
          text: 'Nhà hàng rất vui vì đã đem lại trải nghiệm tốt cho gia đình chị ạ! Hẹn gặp lại chị lần sau!',
          date: '2026-04-13'
        }
      },
      {
        id: 303,
        userName: 'Đặng Quốc Huy',
        userAvatar: '',
        rating: 4,
        date: '2026-02-20',
        text: 'Chất lượng món ăn tốt, không gian đẹp. Tuy nhiên thời gian chờ đồ ăn hơi lâu, khoảng 30 phút mới lên món đầu tiên. Nên cải thiện tốc độ phục vụ. Bù lại, lẩu thập cẩm rất tươi và ngon.',
        images: [],
        helpful: 7,
        reply: null
      }
    ]
  },

  // 4 ── Bún riêu cô Hà ──────────────────────────────────────
  {
    id: 4,
    name: 'Bún riêu cô Hà',
    slug: 'bun-rieu-co-ha',
    category: 'an-uong',
    subCategory: 'Ẩm thực đường phố',
    description: 'Quán bún riêu cua vỉa hè nổi tiếng, nước dùng chua chua ngọt ngọt đặc trưng. Mở từ 6 giờ sáng, hết hàng thì nghỉ.',
    fullDescription: 'Bún riêu cô Hà là một trong những quán ăn vỉa hè "huyền thoại" của Tuyên Quang. Cô Hà bán bún riêu ở góc phố này đã hơn 20 năm, tạo nên thương hiệu bún riêu cua đồng ngon nức tiếng. Nước dùng được nấu từ cua đồng giã tay, cà chua chín mọng, cho vị chua thanh, ngọt tự nhiên. Mỗi bát bún riêu được thêm đậu hũ chiên, chả cua, rau sống tươi xanh, ăn kèm mắm tôm đặc biệt pha chế theo công thức gia truyền. Quán thường bán hết trước 9 giờ sáng vào những ngày đông khách, nên ai muốn ăn thì phải dậy sớm.',
    address: 'Ngã ba Đường Lê Đại Hành - Nguyễn Trãi, Tỉnh Tuyên Quang',
    phone: '0978 234 567',
    priceRange: '$',
    priceText: '25.000đ - 40.000đ',
    rating: 4.6,
    totalReviews: 312,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg'],
    imageColors: ['#E76F51', '#F4A261'],
    openHours: 'T2-CN: 06:00 - 09:30 (hết hàng nghỉ sớm)',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['bún riêu', 'ăn sáng', 'vỉa hè', 'đặc sản', 'giá rẻ'],
    amenities: ['Mang về'],
    coordinates: { lat: 21.8240, lng: 105.2160 },
    social: {
      facebook: '',
      zalo: '0978234567',
      instagram: ''
    },
    menu: [
      { name: 'Bún riêu cua thường', price: '25.000đ' },
      { name: 'Bún riêu cua đặc biệt', price: '35.000đ' },
      { name: 'Bún riêu + giò heo', price: '40.000đ' },
      { name: 'Thêm chả cua', price: '10.000đ' },
      { name: 'Thêm đậu hũ chiên', price: '5.000đ' }
    ],
    reviews: [
      {
        id: 401,
        userName: 'Trịnh Hoàng Anh',
        userAvatar: '',
        rating: 5,
        date: '2026-05-12',
        text: 'Bún riêu cô Hà bán đã mấy chục năm rồi, ngon vẫn ngon! Nước dùng chua chua, ngọt thanh, cua đồng thơm lừng. 25k một bát to bự, ăn no căng bụng. Đến Tuyên Quang mà không ăn bún riêu cô Hà là chưa đến Tuyên Quang.',
        images: [],
        helpful: 45,
        reply: null
      },
      {
        id: 402,
        userName: 'Ngô Quỳnh Trang',
        userAvatar: '',
        rating: 5,
        date: '2026-04-08',
        text: 'Hồi nhỏ mình hay được mẹ dẫn đi ăn ở đây, giờ lớn rồi vẫn ghiền. Bát bún riêu đặc biệt đầy ắp topping, mắm tôm pha chua cay ngon xuất sắc. Nhớ đi sớm nhé, 8 giờ là hết hàng rồi!',
        images: [],
        helpful: 31,
        reply: null
      },
      {
        id: 403,
        userName: 'Lý Thanh Hải',
        userAvatar: '',
        rating: 4,
        date: '2026-03-22',
        text: 'Bún ngon, giá rẻ, nhưng chỗ ngồi hơi chật vì là quán vỉa hè. Nếu chấp nhận được điều đó thì đây là lựa chọn ăn sáng số 1 ở Tuyên Quang. Mình thường gọi mang về cho tiện.',
        images: [],
        helpful: 12,
        reply: null
      }
    ]
  },

  // 5 ── Trà chanh Thanh Xuân ─────────────────────────────────
  {
    id: 5,
    name: 'Trà chanh Thanh Xuân',
    slug: 'tra-chanh-thanh-xuan',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Quán trà chanh phố kiểu Hà Nội giữa lòng Tuyên Quang, nơi tụ tập quen thuộc của giới trẻ thành phố.',
    fullDescription: 'Trà chanh Thanh Xuân mang phong cách trà chanh phố cổ Hà Nội về với Tuyên Quang. Quán nằm trên con phố nhỏ yên tĩnh, bày ghế nhựa hai bên vỉa hè, tạo không gian trò chuyện thân mật. Menu chủ đạo là các loại trà chanh, trà tắc, cùng đồ ăn vặt như nem chua rán, xúc xích, khoai tây chiên. Giá cả bình dân, phù hợp túi tiền học sinh sinh viên. Buổi tối, quán sáng đèn lung linh, nhạc nhẹ du dương, là điểm hẹn quen thuộc của các nhóm bạn trẻ thành phố Tuyên Quang.',
    address: '42 Đường Tôn Đức Thắng, Tỉnh Tuyên Quang',
    phone: '0912 345 678',
    priceRange: '$',
    priceText: '15.000đ - 45.000đ',
    rating: 4.2,
    totalReviews: 178,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#E9C46A', '#F4A261', '#2A9D8F'],
    openHours: 'T2-CN: 15:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['trà chanh', 'giá rẻ', 'vỉa hè', 'giới trẻ', 'ăn vặt'],
    amenities: ['WiFi miễn phí', 'Ghế ngồi ngoài trời'],
    coordinates: { lat: 21.8252, lng: 105.2165 },
    social: {
      facebook: 'https://facebook.com/trachanhthanhxuan.tq',
      zalo: '0912345678',
      instagram: ''
    },
    menu: [
      { name: 'Trà chanh', price: '15.000đ' },
      { name: 'Trà tắc', price: '15.000đ' },
      { name: 'Trà đào', price: '20.000đ' },
      { name: 'Trà vải', price: '20.000đ' },
      { name: 'Nem chua rán', price: '25.000đ' },
      { name: 'Khoai tây chiên', price: '25.000đ' },
      { name: 'Xúc xích nướng', price: '20.000đ' }
    ],
    reviews: [
      {
        id: 501,
        userName: 'Nguyễn Bảo Ngọc',
        userAvatar: '',
        rating: 4,
        date: '2026-05-15',
        text: 'Chỗ ngồi tâm sự buổi tối cùng bạn bè rất tuyệt. Trà chanh đúng vị, mát lạnh. Nem chua rán giòn, ăn kèm tương ớt ngon lắm. Giá sinh viên, 50k ngồi cả tối được.',
        images: [],
        helpful: 14,
        reply: null
      },
      {
        id: 502,
        userName: 'Phan Đức Minh',
        userAvatar: '',
        rating: 4,
        date: '2026-04-30',
        text: 'Quán đơn giản nhưng có cái hồn, kiểu trà chanh phố Hà Nội ấy. Buổi tối ngồi ngoài vỉa hè, gió mát, nhâm nhi trà chanh, tám chuyện với bạn — cuộc sống giản dị mà vui.',
        images: [],
        helpful: 8,
        reply: null
      }
    ]
  },

  // 6 ── Nhà hàng Tùng Lâm ───────────────────────────────────
  {
    id: 6,
    name: 'Nhà hàng Tùng Lâm',
    slug: 'nha-hang-tung-lam',
    category: 'an-uong',
    subCategory: 'Nhà hàng',
    description: 'Nhà hàng chuyên tiệc cưới, hội nghị và liên hoan, với sức chứa lên đến 500 khách. Ẩm thực phong phú, dịch vụ chuyên nghiệp.',
    fullDescription: 'Nhà hàng Tùng Lâm là địa chỉ quen thuộc của người dân Tuyên Quang khi tổ chức các sự kiện lớn như tiệc cưới, sinh nhật, liên hoan công ty, hội nghị. Với diện tích hơn 1.000m², nhà hàng có sức chứa lên đến 500 khách, được trang bị hệ thống âm thanh, ánh sáng hiện đại. Thực đơn đa dạng, từ các set menu tiệc cưới trọn gói đến thực đơn gọi món linh hoạt. Bếp trưởng nhiều kinh nghiệm, nguyên liệu tươi ngon nhập hàng ngày. Dịch vụ tổ chức sự kiện trọn gói bao gồm MC, nhạc sống, trang trí hoa, rạp đón khách.',
    address: '189 Đường Quang Trung, Tỉnh Tuyên Quang',
    phone: '0207 382 6789',
    priceRange: '$$$',
    priceText: '200.000đ - 600.000đ/người',
    rating: 4.1,
    totalReviews: 98,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#6C3483', '#9B59B6', '#D4A373'],
    openHours: 'T2-CN: 10:00 - 22:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['tiệc cưới', 'hội nghị', 'liên hoan', 'sự kiện', 'phòng VIP'],
    amenities: ['Điều hòa', 'Bãi đỗ xe lớn', 'Sân khấu', 'Phòng VIP', 'Thanh toán thẻ', 'WiFi miễn phí', 'Tổ chức sự kiện trọn gói'],
    coordinates: { lat: 21.8200, lng: 105.2210 },
    social: {
      facebook: 'https://facebook.com/nhahangTungLam',
      zalo: '02073826789',
      instagram: ''
    },
    menu: [
      { name: 'Set tiệc cưới A (10 người)', price: '3.500.000đ' },
      { name: 'Set tiệc cưới B (10 người)', price: '5.000.000đ' },
      { name: 'Set tiệc cưới VIP (10 người)', price: '7.500.000đ' },
      { name: 'Gà luộc lá chanh', price: '250.000đ' },
      { name: 'Tôm sú nướng muối ớt', price: '320.000đ' },
      { name: 'Bò bít tết', price: '180.000đ' }
    ],
    reviews: [
      {
        id: 601,
        userName: 'Nguyễn Hữu Toàn',
        userAvatar: '',
        rating: 4,
        date: '2026-04-20',
        text: 'Tổ chức tiệc cưới ở đây, set B khá ổn, đồ ăn ngon và đủ lượng cho 10 người/bàn. MC vui nhộn, nhạc sống hay. Bãi đỗ xe rộng, khách mời không phải lo chỗ gửi xe. Tổng thể hài lòng.',
        images: [],
        helpful: 15,
        reply: {
          text: 'Cảm ơn anh Toàn! Chúc anh chị trăm năm hạnh phúc ạ!',
          date: '2026-04-21'
        }
      },
      {
        id: 602,
        userName: 'Trương Thị Phương',
        userAvatar: '',
        rating: 4,
        date: '2026-03-10',
        text: 'Liên hoan công ty ở đây, phòng VIP đẹp, cách âm tốt. Thức ăn tươi, đặc biệt là gà luộc lá chanh rất ngon. Nhân viên nhanh nhẹn. Sẽ quay lại cho buổi liên hoan tiếp theo.',
        images: [],
        helpful: 6,
        reply: null
      }
    ]
  },

  // 7 ── Bánh cuốn Phương ─────────────────────────────────────
  {
    id: 7,
    name: 'Bánh cuốn Phương',
    slug: 'banh-cuon-phuong',
    category: 'an-uong',
    subCategory: 'Ẩm thực đường phố',
    description: 'Bánh cuốn tráng tay truyền thống, lá bánh mỏng trong, nhân thịt thơm. Ăn kèm nước mắm pha chua ngọt đặc biệt.',
    fullDescription: 'Bánh cuốn Phương là quán bánh cuốn tráng tay lâu đời ở Tuyên Quang, nổi tiếng với lá bánh mỏng tang, trong suốt, được tráng trực tiếp trên nồi hơi trước mắt thực khách. Nhân bánh cuốn gồm thịt lợn xay, mộc nhĩ, hành phi thơm nức, cuốn gọn gàng. Mỗi đĩa bánh cuốn được ăn kèm với chả quế thơm lừng, rau sống giòn mát, và đặc biệt là bát nước mắm pha theo công thức riêng — chua nhẹ, ngọt vừa, cay nồng. Cô Phương bán bánh cuốn ở đây hơn 15 năm, mỗi sáng tráng hơn 200 lá bánh mà vẫn không đủ phục vụ khách.',
    address: '67 Đường Nguyễn Văn Cừ, Tỉnh Tuyên Quang',
    phone: '0965 432 109',
    priceRange: '$',
    priceText: '20.000đ - 35.000đ',
    rating: 4.5,
    totalReviews: 203,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg'],
    imageColors: ['#D4A373', '#E9C46A'],
    openHours: 'T2-CN: 06:00 - 10:30',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['bánh cuốn', 'ăn sáng', 'truyền thống', 'tráng tay'],
    amenities: ['Mang về', 'Đặt số lượng lớn'],
    coordinates: { lat: 21.8225, lng: 105.2185 },
    social: {
      facebook: '',
      zalo: '0965432109',
      instagram: ''
    },
    menu: [
      { name: 'Bánh cuốn thường', price: '20.000đ' },
      { name: 'Bánh cuốn đặc biệt', price: '30.000đ' },
      { name: 'Bánh cuốn trứng', price: '25.000đ' },
      { name: 'Thêm chả quế', price: '10.000đ' },
      { name: 'Thêm giò lụa', price: '10.000đ' }
    ],
    reviews: [
      {
        id: 701,
        userName: 'Cao Thị Loan',
        userAvatar: '',
        rating: 5,
        date: '2026-05-08',
        text: 'Bánh cuốn tráng tay mỏng tang, nhân thịt thơm, nước mắm pha chua ngọt vừa miệng. 20k một đĩa to, ăn no mà rẻ. Chả quế ở đây cũng ngon lắm, giòn bên ngoài, mềm bên trong. Nhất định phải thử!',
        images: [],
        helpful: 28,
        reply: null
      },
      {
        id: 702,
        userName: 'Đinh Văn Thắng',
        userAvatar: '',
        rating: 4,
        date: '2026-04-15',
        text: 'Quán nhỏ, bình dân nhưng bánh cuốn cực ngon. Lá bánh trong veo, nhìn thấy nhân bên trong luôn. Nhược điểm là buổi sáng khá đông, chỗ ngồi hạn chế. Gợi ý là nên gọi mang về nếu không muốn chờ.',
        images: [],
        helpful: 16,
        reply: null
      }
    ]
  },

  // 8 ── Cafe Tuyên Phố ──────────────────────────────────────
  {
    id: 8,
    name: 'Cafe Tuyên Phố',
    slug: 'cafe-tuyen-pho',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Quán cafe decor vintage xinh xắn, yêu thích bởi tín đồ chụp ảnh. Cà phê chất lượng, bánh ngọt handmade.',
    fullDescription: 'Cafe Tuyên Phố là điểm đến mới của giới trẻ Tuyên Quang, nổi bật với phong cách decor vintage pha lẫn hiện đại. Quán có hai tầng, tầng trệt là không gian làm việc yên tĩnh với bàn gỗ, đèn vàng ấm áp, tầng trên là khu vực mở với ban công nhìn ra phố. Mỗi góc quán đều được chăm chút tỉ mỉ, từ giá sách cũ, chậu cây xanh, đến những bức tranh vẽ tay trên tường — lý tưởng cho ai thích chụp ảnh "sống ảo". Ngoài cà phê rang xay, quán còn có các loại bánh ngọt handmade như tiramisu, cheesecake, cookies được làm tại chỗ mỗi ngày.',
    address: '23 Đường Ngô Quyền, Tỉnh Tuyên Quang',
    phone: '0398 765 432',
    priceRange: '$$',
    priceText: '30.000đ - 85.000đ',
    rating: 4.4,
    totalReviews: 145,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg', 'placeholder-4.jpg'],
    imageColors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261'],
    openHours: 'T2-CN: 08:00 - 22:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['vintage', 'decor đẹp', 'sống ảo', 'bánh ngọt', 'laptop'],
    amenities: ['WiFi miễn phí', 'Điều hòa', 'Ổ cắm điện', 'Bãi đỗ xe'],
    coordinates: { lat: 21.8260, lng: 105.2150 },
    social: {
      facebook: 'https://facebook.com/cafetuyenpho',
      zalo: '0398765432',
      instagram: 'https://instagram.com/cafetuyenpho'
    },
    menu: [
      { name: 'Espresso', price: '35.000đ' },
      { name: 'Americano', price: '35.000đ' },
      { name: 'Latte', price: '45.000đ' },
      { name: 'Cà phê sữa đá', price: '30.000đ' },
      { name: 'Matcha Latte', price: '50.000đ' },
      { name: 'Tiramisu slice', price: '55.000đ' },
      { name: 'Cheesecake', price: '60.000đ' },
      { name: 'Cookies (3 cái)', price: '35.000đ' }
    ],
    reviews: [
      {
        id: 801,
        userName: 'Lê Hà My',
        userAvatar: '',
        rating: 5,
        date: '2026-05-20',
        text: 'Quán decor xinh quá trời! Chụp ảnh ở góc nào cũng đẹp. Matcha Latte vị đậm, không quá ngọt, đúng gu mình. Tiramisu handmade mềm mịn, vị cà phê thấm vừa đủ. Sẽ mang laptop ra đây ngồi làm việc thường xuyên.',
        images: [],
        helpful: 21,
        reply: {
          text: 'Cảm ơn bạn nhiều! Mong được đón bạn thường xuyên tại quán nhé!',
          date: '2026-05-20'
        }
      },
      {
        id: 802,
        userName: 'Trần Quang Khải',
        userAvatar: '',
        rating: 4,
        date: '2026-04-25',
        text: 'Không gian đẹp, yên tĩnh, có ổ cắm điện nhiều nên ngồi làm việc thoải mái. Cà phê ngon, giá hơi nhỉnh so với các quán khác ở Tuyên Quang nhưng chấp nhận được vì decor và không gian tốt.',
        images: [],
        helpful: 13,
        reply: null
      }
    ]
  },

  // 9 ── Lẩu Hùng Béo ────────────────────────────────────────
  {
    id: 9,
    name: 'Lẩu Hùng Béo',
    slug: 'lau-hung-beo',
    category: 'an-uong',
    subCategory: 'Quán ăn',
    description: 'Quán lẩu bình dân đông khách nhất phố, nổi tiếng với nước lẩu tomyum cay nồng và set hải sản tươi sống.',
    fullDescription: 'Lẩu Hùng Béo là cái tên "đình đám" trong giới ăn uống Tuyên Quang, nổi tiếng với các set lẩu giá bình dân nhưng chất lượng không thua kém nhà hàng. Anh Hùng — chủ quán — vốn là đầu bếp từng làm việc tại Hà Nội, về quê mở quán và nhanh chóng tạo dựng thương hiệu nhờ nước lẩu đặc biệt. Menu có nhiều loại lẩu: tomyum, lẩu Thái, lẩu nấm, lẩu riêu cua, nhưng "best seller" vẫn là lẩu tomyum hải sản với tôm, mực, nghêu tươi roi rói. Quán mở buổi chiều tối, không gian sân vườn thoáng mát, bàn ghế bố trí hợp lý, phù hợp cho nhóm bạn 4-6 người.',
    address: '112 Đường Chiến Thắng, Tỉnh Tuyên Quang',
    phone: '0934 567 890',
    priceRange: '$$',
    priceText: '99.000đ - 250.000đ/set',
    rating: 4.4,
    totalReviews: 167,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#E76F51', '#F4A261', '#E9C46A'],
    openHours: 'T2-CN: 16:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['lẩu', 'hải sản', 'tomyum', 'nhóm bạn', 'sân vườn'],
    amenities: ['Bãi đỗ xe', 'Sân vườn', 'WiFi miễn phí', 'Quạt mát'],
    coordinates: { lat: 21.8220, lng: 105.2200 },
    social: {
      facebook: 'https://facebook.com/lauhungbeo.tq',
      zalo: '0934567890',
      instagram: ''
    },
    menu: [
      { name: 'Set lẩu tomyum hải sản (2-3 người)', price: '199.000đ' },
      { name: 'Set lẩu tomyum hải sản (4-5 người)', price: '299.000đ' },
      { name: 'Set lẩu nấm chay (2-3 người)', price: '149.000đ' },
      { name: 'Set lẩu riêu cua bắp bò (2-3 người)', price: '219.000đ' },
      { name: 'Thêm tôm sú (5 con)', price: '80.000đ' },
      { name: 'Thêm mực tươi', price: '70.000đ' },
      { name: 'Mỳ tôm (gói)', price: '10.000đ' },
      { name: 'Rau nhúng lẩu', price: '25.000đ' }
    ],
    reviews: [
      {
        id: 901,
        userName: 'Phùng Thế Anh',
        userAvatar: '',
        rating: 5,
        date: '2026-05-14',
        text: 'Lẩu tomyum ở đây cay nồng, chua chua, đúng vị Thái luôn. Set 199k cho 2-3 người mà hải sản tươi roi rói, tôm to bự. Nước lẩu uống được luôn, không cần gọi thêm nước. Quán sân vườn thoáng, ngồi buổi tối mát mẻ.',
        images: [],
        helpful: 22,
        reply: null
      },
      {
        id: 902,
        userName: 'Đỗ Thanh Hà',
        userAvatar: '',
        rating: 4,
        date: '2026-04-10',
        text: 'Nhóm mình 5 người gọi set lớn, ăn no nê mà mới hết 360k thôi. Chất lượng tốt so với giá tiền. Chỉ tiếc là cuối tuần đông quá, phải chờ bàn khoảng 20 phút. Nên đặt trước nhé.',
        images: [],
        helpful: 14,
        reply: {
          text: 'Cảm ơn nhóm bạn! Cuối tuần các bạn nhắn Zalo trước để anh giữ bàn nhé!',
          date: '2026-04-11'
        }
      },
      {
        id: 903,
        userName: 'Mai Hồng Ngọc',
        userAvatar: '',
        rating: 4,
        date: '2026-03-05',
        text: 'Lẩu ngon, hải sản tươi. Nước lẩu riêu cua bắp bò cũng rất đặc biệt, nước dùng đậm vị cua đồng. Không gian quán ổn, phục vụ nhanh. Sẽ quay lại.',
        images: [],
        helpful: 9,
        reply: null
      }
    ]
  },

  // 10 ── Kem & Trà sữa Chill ────────────────────────────────
  {
    id: 10,
    name: 'Kem & Trà sữa Chill',
    slug: 'kem-tra-sua-chill',
    category: 'an-uong',
    subCategory: 'Bánh & Dessert',
    description: 'Thiên đường kem tươi và trà sữa dành cho teen Tuyên Quang. Menu đa dạng, decor pastel cực cute.',
    fullDescription: 'Kem & Trà sữa Chill là địa chỉ yêu thích của các bạn trẻ Tuyên Quang, đặc biệt là học sinh cấp 2, cấp 3. Quán nổi bật với tông màu pastel hồng - xanh mint, decor đáng yêu với gấu bông, đèn neon và góc chụp ảnh check-in. Menu phong phú gồm kem tươi Ý (gelato), kem cuộn Thái, các loại trà sữa truyền thống và trà sữa topping đặc biệt. Kem tươi được làm tại chỗ mỗi ngày với các vị đặc biệt như matcha, dâu tây, socola Bỉ, khoai môn. Giá cả phải chăng, phần lớn món dưới 40 nghìn đồng.',
    address: '5 Đường Lý Thường Kiệt, Tỉnh Tuyên Quang',
    phone: '0376 543 210',
    priceRange: '$',
    priceText: '20.000đ - 55.000đ',
    rating: 4.3,
    totalReviews: 134,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#FFB5C2', '#B5EAD7', '#C7CEEA'],
    openHours: 'T2-CN: 09:00 - 22:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['kem', 'trà sữa', 'teen', 'pastel', 'check-in'],
    amenities: ['Điều hòa', 'WiFi miễn phí', 'Góc check-in'],
    coordinates: { lat: 21.8255, lng: 105.2172 },
    social: {
      facebook: 'https://facebook.com/kemtrasuachill.tq',
      zalo: '0376543210',
      instagram: 'https://instagram.com/kemtrasuachill'
    },
    menu: [
      { name: 'Kem gelato (1 viên)', price: '20.000đ' },
      { name: 'Kem gelato (2 viên)', price: '35.000đ' },
      { name: 'Kem cuộn Thái', price: '35.000đ' },
      { name: 'Trà sữa trân châu đường đen', price: '30.000đ' },
      { name: 'Trà sữa matcha', price: '35.000đ' },
      { name: 'Trà sữa khoai môn', price: '35.000đ' },
      { name: 'Socola đá xay', price: '40.000đ' },
      { name: 'Sinh tố dâu tây', price: '40.000đ' }
    ],
    reviews: [
      {
        id: 1001,
        userName: 'Trần Thúy Hằng',
        userAvatar: '',
        rating: 5,
        date: '2026-05-18',
        text: 'Quán xinh quá đi! Kem gelato vị matcha ngon lắm, béo vừa, vị trà xanh đậm. Trà sữa trân châu đường đen cũng không thua kém các hãng lớn. Góc check-in dễ thương, chụp ảnh đẹp lung linh. Con gái chắc chắn sẽ thích quán này!',
        images: [],
        helpful: 19,
        reply: null
      },
      {
        id: 1002,
        userName: 'Nguyễn Thanh Tùng',
        userAvatar: '',
        rating: 4,
        date: '2026-04-30',
        text: 'Đưa em gái đi ăn kem, bé thích mê luôn. Kem cuộn Thái làm trước mặt, nhìn rất thú vị. Vị kem thì ngon, giá ok. Chỉ là quán hơi nhỏ, buổi tối cuối tuần khá chật.',
        images: [],
        helpful: 11,
        reply: null
      },
      {
        id: 1003,
        userName: 'Vũ Khánh Linh',
        userAvatar: '',
        rating: 4,
        date: '2026-03-25',
        text: 'Trà sữa khoai môn ngon nhất Tuyên Quang! Vị khoai môn thơm, ngọt vừa, trân châu dẻo. Quán decor pastel dễ thương. Wifi nhanh nữa, ngồi học bài cũng được.',
        images: [],
        helpful: 8,
        reply: {
          text: 'Cảm ơn bạn! Quán luôn cố gắng mang đến những ly trà sữa ngon nhất. Chúc bạn học tốt nhé!',
          date: '2026-03-26'
        }
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════════
   *  VUI CHƠI GIẢI TRÍ  (5 địa điểm)
   * ═══════════════════════════════════════════════════════════ */

  // 11 ── Karaoke Star Tuyên Quang ────────────────────────────
  {
    id: 11,
    name: 'Karaoke Star Tuyên Quang',
    slug: 'karaoke-star-tuyen-quang',
    category: 'vui-choi',
    subCategory: 'Karaoke',
    description: 'Hệ thống karaoke hiện đại nhất Tuyên Quang với phòng VIP, âm thanh chuyên nghiệp và menu đồ uống phong phú.',
    fullDescription: 'Karaoke Star là chuỗi karaoke lớn nhất tại thành phố Tuyên Quang, hoạt động từ năm 2020. Hệ thống gồm 25 phòng hát được trang bị thiết bị âm thanh, ánh sáng hiện đại nhất: loa JBL, micro không dây, hệ thống đầu màn hình LCD 55 inch, đèn laser sân khấu. Phòng hát được cách âm tốt, thiết kế sang trọng với 3 loại: phòng thường, phòng VIP, và phòng VVIP. Mỗi phòng có mini bar riêng, bàn DJ, và hệ thống điều hòa mát lạnh. Menu đồ uống và đồ ăn nhẹ phong phú, giá cả minh bạch. Đội ngũ nhân viên chuyên nghiệp, hỗ trợ kỹ thuật nhanh chóng.',
    address: '78 Đường Hùng Vương, Tỉnh Tuyên Quang',
    phone: '0207 381 9999',
    priceRange: '$$',
    priceText: '80.000đ - 250.000đ/giờ',
    rating: 4.2,
    totalReviews: 112,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#6C3483', '#2A9D8F', '#E76F51'],
    openHours: 'T2-CN: 09:00 - 01:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['karaoke', 'phòng VIP', 'âm thanh tốt', 'nhóm bạn'],
    amenities: ['Điều hòa', 'Bãi đỗ xe', 'Mini bar', 'Cách âm', 'Thanh toán thẻ'],
    coordinates: { lat: 21.8210, lng: 105.2190 },
    social: {
      facebook: 'https://facebook.com/karaokestar.tq',
      zalo: '02073819999',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1101,
        userName: 'Phạm Công Danh',
        userAvatar: '',
        rating: 4,
        date: '2026-05-09',
        text: 'Phòng VIP rộng rãi, âm thanh tốt, mic bắt giọng rõ. Hệ thống bài hát cập nhật khá nhiều bài mới. Nhân viên phục vụ nhanh. Giá phòng VIP 200k/giờ ở Tuyên Quang thì hơi cao nhưng chấp nhận được.',
        images: [],
        helpful: 8,
        reply: null
      },
      {
        id: 1102,
        userName: 'Hoàng Thị Yến',
        userAvatar: '',
        rating: 4,
        date: '2026-04-18',
        text: 'Hay đi karaoke ở đây. Phòng thường 80k/giờ, chất lượng ổn cho nhóm 4-5 người. Cách âm tốt, không sợ ồn hàng xóm. Menu đồ uống giá hợp lý.',
        images: [],
        helpful: 5,
        reply: null
      },
      {
        id: 1103,
        userName: 'Lê Đình Phong',
        userAvatar: '',
        rating: 5,
        date: '2026-03-28',
        text: 'Tổ chức sinh nhật cho bạn ở đây, phòng VVIP rất xịn. Có đèn laser, bàn DJ, màn hình to. Nhân viên hỗ trợ trang trí phòng nữa. Sẽ quay lại!',
        images: [],
        helpful: 12,
        reply: {
          text: 'Cảm ơn bạn! Rất vui vì buổi sinh nhật đã thành công. Hẹn gặp lại bạn!',
          date: '2026-03-29'
        }
      }
    ]
  },

  // 12 ── Rạp chiếu phim Tuyên Quang ─────────────────────────
  {
    id: 12,
    name: 'Rạp chiếu phim Tuyên Quang',
    slug: 'rap-chieu-phim-tuyen-quang',
    category: 'vui-choi',
    subCategory: 'Rạp phim',
    description: 'Rạp chiếu phim duy nhất tại Tuyên Quang, chiếu phim bom tấn quốc tế và Việt Nam với hệ thống âm thanh Dolby.',
    fullDescription: 'Rạp chiếu phim Tuyên Quang nằm trong trung tâm thương mại thành phố, là rạp phim hiện đại duy nhất tại đây. Rạp có 3 phòng chiếu với tổng cộng 450 ghế ngồi, được trang bị hệ thống máy chiếu 4K và âm thanh Dolby Surround 7.1. Lịch chiếu phim cập nhật đồng bộ với các cụm rạp lớn trên toàn quốc, đảm bảo khán giả Tuyên Quang được thưởng thức những bom tấn mới nhất. Bên ngoài phòng chiếu là khu vực bán bỏng ngô, nước uống và đồ ăn nhẹ. Giá vé hợp lý, có ưu đãi cho học sinh sinh viên và suất chiếu sớm.',
    address: 'Tầng 3, TTTM Vincom Tuyên Quang, Tỉnh Tuyên Quang',
    phone: '0207 389 0000',
    priceRange: '$$',
    priceText: '55.000đ - 120.000đ/vé',
    rating: 4.0,
    totalReviews: 89,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg'],
    imageColors: ['#264653', '#E76F51'],
    openHours: 'T2-CN: 09:00 - 23:30',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['phim', 'giải trí', 'cuối tuần', 'hẹn hò'],
    amenities: ['Điều hòa', 'Bỏng ngô', 'Ghế đôi', 'Thanh toán thẻ', 'Bãi đỗ xe TTTM'],
    coordinates: { lat: 21.8242, lng: 105.2168 },
    social: {
      facebook: 'https://facebook.com/rapphim.tq',
      zalo: '02073890000',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1201,
        userName: 'Nguyễn Hải Đăng',
        userAvatar: '',
        rating: 4,
        date: '2026-05-16',
        text: 'Cuối cùng Tuyên Quang cũng có rạp phim xịn! Âm thanh tốt, ghế ngồi êm. Phim chiếu đồng bộ với Hà Nội, không phải chờ lâu nữa. Giá vé 55k suất thường, hợp lý. Chỉ tiếc là rạp chỉ có 3 phòng nên lịch chiếu hơi ít.',
        images: [],
        helpful: 14,
        reply: null
      },
      {
        id: 1202,
        userName: 'Trần Thị Bích Ngọc',
        userAvatar: '',
        rating: 4,
        date: '2026-04-08',
        text: 'Đưa bạn trai đi xem phim cuối tuần, ghế đôi rất thoải mái. Bỏng ngô vị caramel ngon. Rạp sạch sẽ, nhân viên thân thiện. Mong rạp có thêm nhiều suất chiếu hơn.',
        images: [],
        helpful: 7,
        reply: null
      }
    ]
  },

  // 13 ── Khu vui chơi trẻ em Thiên Đường Nhỏ ────────────────
  {
    id: 13,
    name: 'Khu vui chơi trẻ em Thiên Đường Nhỏ',
    slug: 'khu-vui-choi-thien-duong-nho',
    category: 'vui-choi',
    subCategory: 'Khu vui chơi',
    description: 'Khu vui chơi trong nhà dành cho trẻ em từ 2-12 tuổi. An toàn, đa dạng trò chơi, có khu vực cho phụ huynh ngồi chờ.',
    fullDescription: 'Thiên Đường Nhỏ là khu vui chơi trẻ em trong nhà lớn nhất Tuyên Quang, với diện tích hơn 500m². Khu vui chơi có đầy đủ các trò chơi: nhà bóng, cầu trượt, xích đu, khu vẽ tranh, khu xếp hình Lego, bể cát kinetic, trò chơi điện tử dành cho trẻ nhỏ. Tất cả thiết bị đều được nhập khẩu, đạt chuẩn an toàn quốc tế, có đệm bảo vệ xung quanh. Đội ngũ nhân viên trông trẻ chuyên nghiệp, luôn giám sát đảm bảo an toàn. Khu vực dành cho phụ huynh có cafe, WiFi, ghế ngồi thoải mái để chờ đợi con em vui chơi.',
    address: 'Tầng 2, TTTM Vincom Tuyên Quang, Tỉnh Tuyên Quang',
    phone: '0347 890 123',
    priceRange: '$$',
    priceText: '80.000đ - 150.000đ/lượt',
    rating: 4.3,
    totalReviews: 76,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#FFB5C2', '#B5EAD7', '#FFE066'],
    openHours: 'T2-CN: 09:00 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['trẻ em', 'gia đình', 'an toàn', 'trong nhà', 'cuối tuần'],
    amenities: ['Điều hòa', 'Khu vực phụ huynh', 'WiFi miễn phí', 'Tủ khóa', 'Nhà vệ sinh trẻ em'],
    coordinates: { lat: 21.8243, lng: 105.2169 },
    social: {
      facebook: 'https://facebook.com/thienduongnho.tq',
      zalo: '0347890123',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1301,
        userName: 'Nguyễn Thị Thu Hà',
        userAvatar: '',
        rating: 5,
        date: '2026-05-11',
        text: 'Con mình 5 tuổi chơi ở đây mê lắm, phải kéo về mới chịu đi. Khu vực sạch sẽ, nhân viên trông nom cẩn thận. Phụ huynh ngồi ngoài uống cafe, có WiFi, rất tiện. Giá 100k/lượt 2 tiếng, hợp lý.',
        images: [],
        helpful: 16,
        reply: null
      },
      {
        id: 1302,
        userName: 'Lê Văn Trung',
        userAvatar: '',
        rating: 4,
        date: '2026-03-15',
        text: 'Cuối tuần đưa 2 bé đi chơi, bé nào cũng thích. Khu nhà bóng rộng, cầu trượt an toàn. Chỉ tiếc là cuối tuần khá đông, nên đi ngày thường thoải mái hơn.',
        images: [],
        helpful: 8,
        reply: null
      }
    ]
  },

  // 14 ── Billiards Club 68 ───────────────────────────────────
  {
    id: 14,
    name: 'Billiards Club 68',
    slug: 'billiards-club-68',
    category: 'vui-choi',
    subCategory: 'Billiards & Bowling',
    description: 'Câu lạc bộ billiards cao cấp với bàn bi-a chuẩn quốc tế, không gian rộng rãi và dịch vụ đồ uống.',
    fullDescription: 'Billiards Club 68 là điểm đến yêu thích của dân chơi bi-a Tuyên Quang. Câu lạc bộ sở hữu 12 bàn bi-a chuẩn quốc tế (6 bàn pool và 6 bàn carom), được bảo trì định kỳ, mặt bàn luôn phẳng mịn. Không gian rộng rãi, thoáng mát, ánh sáng được bố trí khoa học. Bên cạnh bi-a, CLB còn có 2 bàn bóng bàn và khu vực snack bar phục vụ nước uống, đồ ăn nhẹ. Thường xuyên tổ chức các giải đấu bi-a giao hữu, thu hút nhiều tay cơ từ các huyện về thi đấu.',
    address: '68 Đường Bình Thuận, Tỉnh Tuyên Quang',
    phone: '0923 456 789',
    priceRange: '$',
    priceText: '30.000đ - 50.000đ/giờ',
    rating: 4.1,
    totalReviews: 64,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg'],
    imageColors: ['#264653', '#2A9D8F'],
    openHours: 'T2-CN: 08:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['billiards', 'bi-a', 'giải đấu', 'thể thao'],
    amenities: ['Điều hòa', 'Bãi đỗ xe', 'Snack bar', 'WiFi miễn phí'],
    coordinates: { lat: 21.8235, lng: 105.2148 },
    social: {
      facebook: 'https://facebook.com/billiards68.tq',
      zalo: '0923456789',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1401,
        userName: 'Đỗ Mạnh Cường',
        userAvatar: '',
        rating: 4,
        date: '2026-04-25',
        text: 'Bàn bi-a chuẩn, mặt bàn phẳng, gậy tốt. Giá 30k/giờ buổi sáng, 50k/giờ buổi tối, hợp lý. Không gian sạch sẽ, có điều hòa mát. Thỉnh thoảng có giải đấu nhỏ rất vui.',
        images: [],
        helpful: 6,
        reply: null
      },
      {
        id: 1402,
        userName: 'Trần Minh Quân',
        userAvatar: '',
        rating: 4,
        date: '2026-03-10',
        text: 'CLB bi-a tốt nhất Tuyên Quang rồi. Bàn pool 9 bi chuẩn, cơ carbon có cho thuê. Nhân viên vui vẻ. Cuối tuần đông hơn, nên đi đầu tuần nếu muốn yên tĩnh tập trung.',
        images: [],
        helpful: 4,
        reply: null
      }
    ]
  },

  // 15 ── Game Center TQ ──────────────────────────────────────
  {
    id: 15,
    name: 'Game Center TQ',
    slug: 'game-center-tq',
    category: 'vui-choi',
    subCategory: 'Game Center',
    description: 'Trung tâm giải trí điện tử hiện đại với máy game thùng, game đua xe, máy gắp thú bông và khu vực gaming PC.',
    fullDescription: 'Game Center TQ là trung tâm giải trí điện tử tổng hợp phục vụ mọi lứa tuổi. Khu vực arcade có hơn 30 máy game thùng các loại: đua xe, bắn súng, nhảy, đánh trống. Khu gắp thú bông với 15 máy gắp luôn được update thú bông mới. Khu gaming PC có 20 máy cấu hình cao, ghế gaming, tai nghe 7.1 — phục vụ game thủ chuyên nghiệp. Ngoài ra còn có khu vực console PS5 cho thuê theo giờ. Mỗi tháng trung tâm tổ chức event nhỏ, giải đấu game online, thu hút đông đảo giới trẻ Tuyên Quang tham gia.',
    address: '99 Đường 17/8, Tỉnh Tuyên Quang',
    phone: '0367 891 234',
    priceRange: '$$',
    priceText: '20.000đ - 100.000đ/giờ',
    rating: 4.0,
    totalReviews: 58,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#E76F51', '#6C3483', '#2A9D8F'],
    openHours: 'T2-CN: 08:00 - 22:30',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['game', 'arcade', 'gaming PC', 'PS5', 'giải trí'],
    amenities: ['Điều hòa', 'WiFi miễn phí', 'Ghế gaming', 'Tai nghe 7.1', 'Nước uống'],
    coordinates: { lat: 21.8228, lng: 105.2178 },
    social: {
      facebook: 'https://facebook.com/gamecentertq',
      zalo: '0367891234',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1501,
        userName: 'Nguyễn Hoàng Sơn',
        userAvatar: '',
        rating: 4,
        date: '2026-05-06',
        text: 'Máy PC cấu hình mạnh, chơi game mượt. Ghế gaming êm, tai nghe tốt. Giá 20k/giờ cho PC, hợp lý lắm. Khu arcade cũng vui, đặc biệt là máy đua xe và máy nhảy. Sẽ đến thường xuyên hơn.',
        images: [],
        helpful: 9,
        reply: null
      },
      {
        id: 1502,
        userName: 'Vũ Đức Huy',
        userAvatar: '',
        rating: 4,
        date: '2026-04-15',
        text: 'Thuê PS5 chơi FIFA với bạn bè, rất vui. 80k/giờ cho PS5 + TV to. Khu gắp thú bông cũng hay, bạn gái mình gắp được 2 con gấu. Không gian thoáng, sạch.',
        images: [],
        helpful: 7,
        reply: {
          text: 'Cảm ơn bạn đã ghé chơi! Tuần này có event giảm giá 20% cho PS5, ghé lại nhé!',
          date: '2026-04-16'
        }
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════════
   *  DU LỊCH  (6 địa điểm)
   * ═══════════════════════════════════════════════════════════ */

  // 16 ── Thác Bản Ba ─────────────────────────────────────────
  {
    id: 16,
    name: 'Thác Bản Ba',
    slug: 'thac-ban-ba',
    category: 'du-lich',
    subCategory: 'Suối & Thác',
    description: 'Thác nước hùng vĩ 3 tầng giữa rừng nguyên sinh, cảnh quan hoang sơ tuyệt đẹp. Điểm trekking lý tưởng.',
    fullDescription: 'Thác Bản Ba nằm ở xã Phúc Yên, huyện Lâm Bình, tỉnh Tuyên Quang, được mệnh danh là "nàng tiên giữa đại ngàn". Thác có 3 tầng nước đổ trải dài hơn 500 mét, xung quanh là rừng nguyên sinh xanh mướt quanh năm. Tầng thấp nhất là hồ nước trong vắt, có thể tắm và bơi lội. Tầng giữa hùng vĩ nhất với dòng nước đổ từ độ cao gần 50 mét, tạo nên màn sương mờ ảo. Tầng trên cùng hoang sơ, ít người đặt chân đến. Đường trekking xuyên rừng đến thác dài khoảng 3km, đi qua suối đá, cầu treo, rừng tre nứa — trải nghiệm phiêu lưu đầy thú vị. Mùa đẹp nhất để thăm thác là từ tháng 5 đến tháng 10.',
    address: 'Xã Phúc Yên, Huyện Lâm Bình, Tỉnh Tuyên Quang',
    phone: '0207 389 5555',
    priceRange: '$',
    priceText: 'Vé tham quan: 30.000đ/người',
    rating: 4.8,
    totalReviews: 234,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg', 'placeholder-4.jpg'],
    imageColors: ['#2A9D8F', '#264653', '#287271', '#B5EAD7'],
    openHours: 'Hàng ngày: 07:00 - 17:00',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['thác nước', 'trekking', 'thiên nhiên', 'rừng nguyên sinh', 'check-in'],
    amenities: ['Hướng dẫn viên', 'Nhà vệ sinh', 'Quầy bán nước', 'Bãi đỗ xe'],
    coordinates: { lat: 22.3000, lng: 105.4000 },
    social: {
      facebook: 'https://facebook.com/thacbanba.lambinh',
      zalo: '',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1601,
        userName: 'Trần Anh Tuấn',
        userAvatar: '',
        rating: 5,
        date: '2026-05-01',
        text: 'Thác Bản Ba đẹp mê hồn! Nước trong xanh, không khí mát lạnh, phong cảnh hoang sơ. Trek khoảng 3km qua rừng, hơi mệt nhưng xứng đáng lắm. Tầng 1 tắm được, nước mát sảng khoái. Nhớ mang giày trekking và chống muỗi nhé.',
        images: [],
        helpful: 42,
        reply: null
      },
      {
        id: 1602,
        userName: 'Lê Thị Ngọc Mai',
        userAvatar: '',
        rating: 5,
        date: '2026-04-18',
        text: 'Một trong những thác nước đẹp nhất miền Bắc mà mình từng đi. 3 tầng thác hùng vĩ, chụp ảnh góc nào cũng xuất sắc. Nên đi vào mùa hè, nước nhiều và xanh đẹp. Hướng dẫn viên địa phương rất nhiệt tình.',
        images: [],
        helpful: 35,
        reply: null
      },
      {
        id: 1603,
        userName: 'Phạm Quốc Bảo',
        userAvatar: '',
        rating: 4,
        date: '2026-03-25',
        text: 'Phong cảnh tuyệt đẹp, đường đi hơi khó nhưng thú vị. Vé vào chỉ 30k, rất rẻ. Tuy nhiên cơ sở vật chất ở đây còn hạn chế, nhà vệ sinh ít, không có nhiều hàng quán. Nên mang theo đồ ăn nhẹ và nước.',
        images: [],
        helpful: 18,
        reply: null
      },
      {
        id: 1604,
        userName: 'Nguyễn Phương Thảo',
        userAvatar: '',
        rating: 5,
        date: '2026-02-14',
        text: 'Đi cùng nhóm 8 người, thuê hướng dẫn viên 200k/nhóm. Anh hướng dẫn dẫn đường rất tận tình, kể chuyện về rừng, về bản địa. Thác đẹp ngoài sức tưởng tượng. Chắc chắn sẽ quay lại mùa hè này!',
        images: [],
        helpful: 26,
        reply: null
      }
    ]
  },

  // 17 ── Na Hang – Lâm Bình ─────────────────────────────────
  {
    id: 17,
    name: 'Na Hang – Lâm Bình',
    slug: 'na-hang-lam-binh',
    category: 'du-lich',
    subCategory: 'Danh thắng',
    description: 'Hồ trên núi tuyệt đẹp, được ví như "Hạ Long trên cạn" với núi đá vôi hùng vĩ, mặt hồ xanh ngọc bích.',
    fullDescription: 'Khu du lịch Na Hang – Lâm Bình là viên ngọc quý của Tuyên Quang, nổi tiếng với hồ nước nhân tạo trải dài giữa những dãy núi đá vôi hùng vĩ. Mặt hồ rộng mênh mông, nước xanh ngọc bích phản chiếu bầu trời và những ngọn núi, tạo nên khung cảnh "Hạ Long giữa đại ngàn". Du khách có thể đi thuyền khám phá các hang động, đảo nhỏ trên hồ, thăm bản làng dân tộc Tày, Dao ven hồ. Buổi sáng sớm, sương mù giăng kín mặt hồ, tạo nên khung cảnh như chốn tiên cảnh. Đây là điểm đến lý tưởng cho những ai yêu thiên nhiên hoang sơ, thích trải nghiệm homestay và khám phá văn hóa dân tộc vùng cao.',
    address: 'Huyện Na Hang - Huyện Lâm Bình, Tỉnh Tuyên Quang',
    phone: '0207 382 3333',
    priceRange: '$$',
    priceText: '100.000đ - 300.000đ (vé thuyền)',
    rating: 4.9,
    totalReviews: 456,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg', 'placeholder-4.jpg'],
    imageColors: ['#264653', '#2A9D8F', '#287271', '#E9C46A'],
    openHours: 'Hàng ngày: 06:00 - 18:00',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['hồ', 'núi', 'thiên nhiên', 'thuyền', 'homestay', 'dân tộc'],
    amenities: ['Thuyền du lịch', 'Hướng dẫn viên', 'Homestay', 'Nhà hàng', 'Bãi đỗ xe'],
    coordinates: { lat: 22.3611, lng: 105.3833 },
    social: {
      facebook: 'https://facebook.com/dulichnahang',
      zalo: '02073823333',
      instagram: 'https://instagram.com/nahanglambinh'
    },
    menu: [],
    reviews: [
      {
        id: 1701,
        userName: 'Hoàng Đức Thịnh',
        userAvatar: '',
        rating: 5,
        date: '2026-05-20',
        text: 'Na Hang đẹp quá! Mình đi thuyền trên hồ, hai bên là núi đá vôi xanh mướt, nước hồ trong vắt. Buổi sáng sương mù giăng trên mặt hồ, đẹp như tranh vẽ. Ở homestay bản Tày, ăn cơm lam, gà đồi — tuyệt vời. Chắc chắn phải đi ít nhất một lần trong đời!',
        images: [],
        helpful: 56,
        reply: null
      },
      {
        id: 1702,
        userName: 'Nguyễn Thị Tâm',
        userAvatar: '',
        rating: 5,
        date: '2026-04-30',
        text: 'Xứng đáng là "Hạ Long trên cạn"! Phong cảnh hoang sơ, hùng vĩ, yên bình. Đi thuyền 2 tiếng khám phá các đảo nhỏ, hang động, rất thú vị. Người dân địa phương hiếu khách, thức ăn ngon và rẻ. Nhất định sẽ quay lại.',
        images: [],
        helpful: 43,
        reply: null
      },
      {
        id: 1703,
        userName: 'Phan Minh Đức',
        userAvatar: '',
        rating: 5,
        date: '2026-03-18',
        text: 'Đi từ Hà Nội lên mất khoảng 5 tiếng xe, nhưng đáng lắm! Cảnh đẹp lung linh, không khí trong lành. Nên đi 2 ngày 1 đêm để trải nghiệm hết. Giá vé thuyền 150k/người, đi khoảng 2-3 tiếng. Nhớ mang áo khoác nhé, sáng sớm lạnh.',
        images: [],
        helpful: 31,
        reply: null
      },
      {
        id: 1704,
        userName: 'Vũ Thanh Nga',
        userAvatar: '',
        rating: 4,
        date: '2026-02-05',
        text: 'Mình đi mùa đông, hơi se lạnh nhưng cảnh vẫn đẹp. Nước hồ xanh ngọc, núi non hùng vĩ. Chỉ tiếc là mùa này sương mù ít hơn mùa hè. Cơ sở homestay sạch sẽ nhưng còn đơn giản. Hy vọng sẽ được đầu tư thêm.',
        images: [],
        helpful: 19,
        reply: null
      }
    ]
  },

  // 18 ── Tân Trào – Khu di tích lịch sử ─────────────────────
  {
    id: 18,
    name: 'Tân Trào – Khu di tích lịch sử',
    slug: 'tan-trao-khu-di-tich',
    category: 'du-lich',
    subCategory: 'Di tích lịch sử',
    description: 'Khu di tích quốc gia đặc biệt, "Thủ đô khu giải phóng" — nơi Bác Hồ chỉ đạo Tổng khởi nghĩa tháng 8/1945.',
    fullDescription: 'Khu di tích lịch sử Tân Trào thuộc xã Tân Trào, huyện Sơn Dương, tỉnh Tuyên Quang — được mệnh danh là "Thủ đô khu giải phóng". Đây là nơi Chủ tịch Hồ Chí Minh đã ở và làm việc, chỉ đạo Tổng khởi nghĩa tháng Tám năm 1945. Khu di tích bao gồm: lán Nà Nưa (nơi Bác Hồ ở và làm việc), đình Tân Trào (nơi diễn ra Quốc dân Đại hội), cây đa Tân Trào (nơi phát lệnh Tổng khởi nghĩa), hang Bòng, đình Hồng Thái và nhiều di tích khác. Năm 2012, khu di tích được xếp hạng Di tích quốc gia đặc biệt. Đến đây, du khách không chỉ tìm hiểu lịch sử mà còn được chiêm ngưỡng cảnh quan thiên nhiên tươi đẹp của vùng núi rừng Việt Bắc.',
    address: 'Xã Tân Trào, Huyện Sơn Dương, Tỉnh Tuyên Quang',
    phone: '0207 385 1945',
    priceRange: '$',
    priceText: 'Miễn phí tham quan',
    rating: 4.6,
    totalReviews: 198,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#D4A373', '#8B7355', '#2A9D8F'],
    openHours: 'T2-CN: 07:30 - 17:00',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['lịch sử', 'Bác Hồ', 'di tích', 'giáo dục', 'cách mạng'],
    amenities: ['Hướng dẫn viên miễn phí', 'Bãi đỗ xe lớn', 'Nhà trưng bày', 'Nhà vệ sinh', 'Quầy lưu niệm'],
    coordinates: { lat: 21.8500, lng: 105.4667 },
    social: {
      facebook: 'https://facebook.com/ditichtantrao',
      zalo: '',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1801,
        userName: 'Bùi Thành Công',
        userAvatar: '',
        rating: 5,
        date: '2026-05-19',
        text: 'Đưa con đi tham quan khu di tích Tân Trào, rất ý nghĩa. Các cháu được nghe hướng dẫn viên kể chuyện lịch sử, xem lán Nà Nưa, đình Tân Trào, cây đa lịch sử. Không gian rộng rãi, xanh mát, phong cảnh đẹp. Miễn phí tham quan, hướng dẫn viên nhiệt tình.',
        images: [],
        helpful: 24,
        reply: null
      },
      {
        id: 1802,
        userName: 'Đặng Phương Linh',
        userAvatar: '',
        rating: 5,
        date: '2026-04-02',
        text: 'Nơi đây thiêng liêng lắm. Đứng dưới cây đa Tân Trào, cảm giác xúc động khi nghĩ về lịch sử dân tộc. Hướng dẫn viên kể chuyện hay, chi tiết, dễ hiểu. Nên đi 1 ngày để thăm hết các điểm di tích.',
        images: [],
        helpful: 20,
        reply: null
      },
      {
        id: 1803,
        userName: 'Lý Hồng Quân',
        userAvatar: '',
        rating: 4,
        date: '2026-02-28',
        text: 'Điểm du lịch lịch sử rất đáng đến. Không gian yên bình, cây cối xanh mát. Tuy nhiên đường từ trung tâm Tuyên Quang vào hơi xa (khoảng 40km), nên chuẩn bị xe máy hoặc ô tô riêng.',
        images: [],
        helpful: 12,
        reply: null
      }
    ]
  },

  // 19 ── Suối khoáng Mỹ Lâm ─────────────────────────────────
  {
    id: 19,
    name: 'Suối khoáng Mỹ Lâm',
    slug: 'suoi-khoang-my-lam',
    category: 'du-lich',
    subCategory: 'Suối & Thác',
    description: 'Khu du lịch suối khoáng nóng tự nhiên, nổi tiếng với nước nóng chữa bệnh và dịch vụ spa thư giãn.',
    fullDescription: 'Suối khoáng Mỹ Lâm thuộc xã Phú Lâm, huyện Yên Sơn, tỉnh Tuyên Quang, là một trong những nguồn nước khoáng nóng thiên nhiên quý giá của Việt Nam. Nước khoáng ở đây có nhiệt độ từ 42-46°C, chứa nhiều khoáng chất có lợi cho sức khỏe như lưu huỳnh, canxi, magie, fluor — được chứng minh có tác dụng tốt trong điều trị các bệnh về xương khớp, da liễu, thần kinh. Khu du lịch được quy hoạch bài bản với bể tắm nước khoáng nóng trong nhà và ngoài trời, dịch vụ spa, massage, và khu nghỉ dưỡng. Đến đây, du khách vừa được tắm nước nóng thiên nhiên, vừa được ngắm cảnh đồi chè xanh mướt xung quanh.',
    address: 'Xã Phú Lâm, Huyện Yên Sơn, Tỉnh Tuyên Quang',
    phone: '0207 384 7777',
    priceRange: '$$',
    priceText: '80.000đ - 200.000đ',
    rating: 4.4,
    totalReviews: 167,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#2A9D8F', '#E9C46A', '#F4A261'],
    openHours: 'T2-CN: 07:00 - 20:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['suối khoáng', 'spa', 'nghỉ dưỡng', 'sức khỏe', 'nước nóng'],
    amenities: ['Bể bơi nước nóng', 'Spa & Massage', 'Phòng nghỉ', 'Nhà hàng', 'Bãi đỗ xe', 'Phòng thay đồ'],
    coordinates: { lat: 21.8500, lng: 105.0500 },
    social: {
      facebook: 'https://facebook.com/suoikhoangmylam',
      zalo: '02073847777',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 1901,
        userName: 'Nguyễn Thị Lan',
        userAvatar: '',
        rating: 5,
        date: '2026-05-03',
        text: 'Ngâm nước khoáng nóng sướng lắm! Nước nóng tự nhiên, cảm giác thư giãn toàn thân. Vợ chồng mình bị đau khớp, ngâm xong thấy nhẹ hẳn. Dịch vụ massage cũng tốt. 150k/người cho gói ngâm + massage 30 phút, rất đáng.',
        images: [],
        helpful: 21,
        reply: null
      },
      {
        id: 1902,
        userName: 'Hoàng Văn Tùng',
        userAvatar: '',
        rating: 4,
        date: '2026-04-12',
        text: 'Suối khoáng nóng tự nhiên, nước có mùi lưu huỳnh nhẹ, tốt cho da và xương khớp. Bể ngoài trời view đồi chè xanh, đẹp lắm. Chỉ là cơ sở vật chất một số chỗ hơi cũ, cần nâng cấp thêm.',
        images: [],
        helpful: 14,
        reply: null
      },
      {
        id: 1903,
        userName: 'Đinh Thị Hạnh',
        userAvatar: '',
        rating: 4,
        date: '2026-03-08',
        text: 'Cuối tuần đưa gia đình lên nghỉ dưỡng, phòng nghỉ sạch sẽ, có bể nước nóng riêng. Trẻ con rất thích tắm nước nóng. Buffet sáng ở nhà hàng cũng ngon. Đường từ trung tâm thành phố lên khoảng 30 phút, dễ đi.',
        images: [],
        helpful: 10,
        reply: null
      }
    ]
  },

  // 20 ── Thành phố Tuyên Quang – City Tour ───────────────────
  {
    id: 20,
    name: 'Thành phố Tuyên Quang – City Tour',
    slug: 'thanh-pho-tuyen-quang-city-tour',
    category: 'du-lich',
    subCategory: 'Danh thắng',
    description: 'Khám phá thành phố Tuyên Quang xinh đẹp bên sông Lô — bờ kè lung linh, quảng trường Nguyễn Tất Thành, cầu Tân Hà.',
    fullDescription: 'Thành phố Tuyên Quang tuy nhỏ nhưng mang vẻ đẹp bình yên, thơ mộng bên dòng sông Lô. Tour city bao gồm các điểm: Quảng trường Nguyễn Tất Thành — quảng trường trung tâm rộng lớn với tượng Bác Hồ; Bờ kè sông Lô — con đường dạo bộ lung linh ánh đèn mỗi buổi tối; Cầu Tân Hà — cây cầu biểu tượng nối hai bờ sông; Chùa An Vinh — ngôi chùa cổ kính giữa lòng thành phố; Hồ công viên Nguyễn Tất Thành — hồ nước xanh mát, nơi người dân tập thể dục buổi sáng. Buổi tối, bờ kè sông Lô sáng rực đèn LED, phố đi bộ nhộn nhịp với các quầy hàng ăn vặt, trò chơi — là trải nghiệm không thể thiếu khi đến Tuyên Quang.',
    address: 'Trung tâm TP. Tuyên Quang, Tỉnh Tuyên Quang',
    phone: '0207 381 0000',
    priceRange: '$',
    priceText: 'Miễn phí',
    rating: 4.3,
    totalReviews: 134,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg', 'placeholder-4.jpg'],
    imageColors: ['#E9C46A', '#F4A261', '#264653', '#2A9D8F'],
    openHours: 'Mở cửa 24/7',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['city tour', 'bờ kè', 'sông Lô', 'đêm', 'phố đi bộ', 'miễn phí'],
    amenities: ['Phố đi bộ', 'Quảng trường', 'Bờ kè sông', 'Ăn vặt đường phố'],
    coordinates: { lat: 21.8233, lng: 105.2180 },
    social: {
      facebook: 'https://facebook.com/tptuyenquang',
      zalo: '',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 2001,
        userName: 'Lê Quang Vinh',
        userAvatar: '',
        rating: 4,
        date: '2026-05-15',
        text: 'Tuyên Quang buổi tối đẹp lắm! Bờ kè sông Lô lung linh đèn LED, đi dạo rất lãng mạn. Phố đi bộ có nhiều quầy đồ ăn vặt ngon. Thành phố nhỏ nhưng sạch đẹp, yên bình, con người thân thiện.',
        images: [],
        helpful: 18,
        reply: null
      },
      {
        id: 2002,
        userName: 'Trần Hồng Nhung',
        userAvatar: '',
        rating: 5,
        date: '2026-04-20',
        text: 'Mình là dân Tuyên Quang nhưng mỗi lần đi xa về vẫn thấy thành phố đẹp. Bờ kè mới được làm lại rất đẹp, sạch sẽ. Quảng trường rộng, buổi tối người dân ra tập thể dục, trẻ em chơi đùa — không khí rất vui.',
        images: [],
        helpful: 15,
        reply: null
      }
    ]
  },

  // 21 ── Lễ hội Thành Tuyên ─────────────────────────────────
  {
    id: 21,
    name: 'Lễ hội Thành Tuyên',
    slug: 'le-hoi-thanh-tuyen',
    category: 'du-lich',
    subCategory: 'Lễ hội',
    description: 'Lễ hội đèn lồng lớn nhất Việt Nam, diễn ra vào Tết Trung thu hàng năm với hàng trăm mô hình đèn lồng khổng lồ.',
    fullDescription: 'Lễ hội Thành Tuyên (hay còn gọi là Lễ hội Trung thu Tuyên Quang) là sự kiện văn hóa lớn nhất trong năm của tỉnh Tuyên Quang, được tổ chức vào dịp Tết Trung thu (rằm tháng 8 Âm lịch) hàng năm. Lễ hội nổi tiếng với hàng trăm mô hình đèn lồng khổng lồ được các tổ dân phố tự tay chế tạo, mỗi mô hình là một tác phẩm nghệ thuật độc đáo với đèn LED rực rỡ, có thể chuyển động linh hoạt. Đêm hội, các mô hình đèn lồng được rước diễu hành qua các con phố chính, thu hút hàng chục nghìn du khách từ khắp nơi đổ về. Ngoài diễu hành, lễ hội còn có các chương trình văn nghệ, múa lân sư rồng, pháo hoa, và không gian ẩm thực đường phố sôi động. Lễ hội Thành Tuyên đã trở thành thương hiệu du lịch đặc trưng của Tuyên Quang, được nhiều tổ chức du lịch vinh danh.',
    address: 'Trung tâm TP. Tuyên Quang (Toàn thành phố)',
    phone: '0207 381 2222',
    priceRange: '$',
    priceText: 'Miễn phí',
    rating: 4.9,
    totalReviews: 523,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg', 'placeholder-4.jpg'],
    imageColors: ['#E76F51', '#F4A261', '#E9C46A', '#FFB5C2'],
    openHours: 'Rằm tháng 8 Âm lịch hàng năm (khoảng tháng 9-10 Dương lịch)',
    isOpen: false,
    isFeatured: true,
    isNew: false,
    tags: ['lễ hội', 'đèn lồng', 'Trung thu', 'diễu hành', 'văn hóa', 'pháo hoa'],
    amenities: ['Sự kiện ngoài trời', 'Ẩm thực đường phố', 'Múa lân', 'Pháo hoa'],
    coordinates: { lat: 21.8233, lng: 105.2180 },
    social: {
      facebook: 'https://facebook.com/lehoithanhtuyen',
      zalo: '',
      instagram: 'https://instagram.com/lehoithanhtuyen'
    },
    menu: [],
    reviews: [
      {
        id: 2101,
        userName: 'Nguyễn Minh Hải',
        userAvatar: '',
        rating: 5,
        date: '2025-10-08',
        text: 'Lễ hội Thành Tuyên năm nay hoành tráng quá! Đèn lồng năm nay đẹp hơn mọi năm, có mô hình rồng dài 20 mét, mắt biết chuyển động, tuyệt vời. Diễu hành kéo dài 3 tiếng, người dân đứng kín hai bên đường. Pháo hoa đẹp ngất. Năm sau chắc chắn phải lên lại!',
        images: [],
        helpful: 78,
        reply: null
      },
      {
        id: 2102,
        userName: 'Phạm Thị Thu Trang',
        userAvatar: '',
        rating: 5,
        date: '2025-10-07',
        text: 'Đây là lễ hội Trung thu đẹp nhất Việt Nam mà mình từng đến! Mô hình đèn lồng sáng tạo, lung linh, mỗi tổ dân phố làm mỗi kiểu khác nhau. Không khí lễ hội vui tươi, ai cũng cười. Con mình mê lắm, cứ đòi đi xem mãi. Nhớ đặt khách sạn sớm vì Trung thu rất đông!',
        images: [],
        helpful: 65,
        reply: null
      },
      {
        id: 2103,
        userName: 'Đỗ Anh Khoa',
        userAvatar: '',
        rating: 5,
        date: '2025-10-06',
        text: 'Mình từ Sài Gòn bay ra chỉ để xem Lễ hội Thành Tuyên. Không thất vọng! Quy mô lớn, mô hình đèn lồng cực kỳ công phu. Ẩm thực đường phố ngon và rẻ. Người dân Tuyên Quang hiếu khách lắm. Đã thêm vào bucket list hàng năm!',
        images: [],
        helpful: 52,
        reply: null
      },
      {
        id: 2104,
        userName: 'Lê Bảo Trân',
        userAvatar: '',
        rating: 4,
        date: '2025-10-05',
        text: 'Lễ hội rất đẹp và vui, nhưng đông người kinh khủng! Nên đến sớm để có chỗ đứng xem diễu hành tốt. Khách sạn cháy phòng trước 1 tháng, nên book sớm. Giao thông hơi tắc vào đêm hội. Nhưng nhìn chung, trải nghiệm rất đáng nhớ!',
        images: [],
        helpful: 38,
        reply: null
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════════
   *  TRANG PHỤC  (5 địa điểm)
   * ═══════════════════════════════════════════════════════════ */

  // 22 ── Shop Hương Tuyên ────────────────────────────────────
  {
    id: 22,
    name: 'Shop Hương Tuyên',
    slug: 'shop-huong-tuyen',
    category: 'trang-phuc',
    subCategory: 'Quần áo',
    description: 'Shop thời trang nữ bình dân, cập nhật xu hướng mới nhất. Chuyên váy, áo, quần jean, đồ công sở.',
    fullDescription: 'Shop Hương Tuyên là một trong những shop thời trang nữ được yêu thích nhất tại Tuyên Quang, hoạt động từ năm 2019. Shop chuyên cung cấp quần áo nữ đa dạng phong cách: từ váy xinh dạo phố, áo thun basic, quần jean trẻ trung đến đồ công sở thanh lịch. Mỗi tuần, shop đều cập nhật mẫu mới theo xu hướng thời trang Hàn Quốc, đảm bảo khách hàng luôn có nhiều lựa chọn. Giá cả bình dân, phù hợp túi tiền đại đa số chị em Tuyên Quang. Chị Hương — chủ shop — tư vấn nhiệt tình, mix đồ đẹp, và có chính sách đổi trả linh hoạt trong 7 ngày.',
    address: '34 Đường Nguyễn Trãi, Tỉnh Tuyên Quang',
    phone: '0945 678 901',
    priceRange: '$',
    priceText: '100.000đ - 450.000đ',
    rating: 4.3,
    totalReviews: 87,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#FFB5C2', '#9B59B6', '#E9C46A'],
    openHours: 'T2-CN: 08:30 - 21:30',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['thời trang nữ', 'váy', 'quần jean', 'giá rẻ', 'Hàn Quốc'],
    amenities: ['Phòng thử đồ', 'Đổi trả 7 ngày', 'Ship COD', 'Tư vấn mix đồ'],
    coordinates: { lat: 21.8245, lng: 105.2158 },
    social: {
      facebook: 'https://facebook.com/shophuongtuyen',
      zalo: '0945678901',
      instagram: 'https://instagram.com/shophuongtuyen'
    },
    menu: [],
    reviews: [
      {
        id: 2201,
        userName: 'Trần Thu Hương',
        userAvatar: '',
        rating: 5,
        date: '2026-05-17',
        text: 'Shop váy đẹp nhất Tuyên Quang! Mẫu mã cập nhật liên tục, tuần nào cũng có hàng mới. Giá rất hợp lý, váy 200-300k mà chất lượng ổn. Chị chủ shop tư vấn nhiệt tình, biết cách mix đồ. Mua hoài không chán!',
        images: [],
        helpful: 13,
        reply: {
          text: 'Cảm ơn em Hương! Tuần này shop về nhiều mẫu váy hoa mới, ghé xem nhé em!',
          date: '2026-05-17'
        }
      },
      {
        id: 2202,
        userName: 'Nguyễn Thùy Dương',
        userAvatar: '',
        rating: 4,
        date: '2026-04-22',
        text: 'Mình hay mua đồ công sở ở đây. Áo sơ mi, quần tây chất vải tốt, form đẹp, giá 150-250k. Đổi trả trong 7 ngày nếu không vừa, rất thuận tiện. Có ship COD nữa nên lười ra shop cũng được.',
        images: [],
        helpful: 9,
        reply: null
      },
      {
        id: 2203,
        userName: 'Phạm Ngọc Bích',
        userAvatar: '',
        rating: 4,
        date: '2026-03-30',
        text: 'Quần jean ở đây dày dặn, form chuẩn, giá 250k thôi. Mình mua 3 cái mặc vẫn đẹp sau nhiều lần giặt. Shop nhỏ nhưng đồ trưng bày gọn gàng, dễ chọn.',
        images: [],
        helpful: 6,
        reply: null
      }
    ]
  },

  // 23 ── Áo dài Thanh Hằng ──────────────────────────────────
  {
    id: 23,
    name: 'Áo dài Thanh Hằng',
    slug: 'ao-dai-thanh-hang',
    category: 'trang-phuc',
    subCategory: 'Thuê trang phục',
    description: 'Dịch vụ may đo và cho thuê áo dài truyền thống. Phục vụ cưới hỏi, lễ tốt nghiệp, chụp ảnh kỷ yếu.',
    fullDescription: 'Áo dài Thanh Hằng là tiệm áo dài uy tín nhất tại Tuyên Quang, chuyên may đo và cho thuê áo dài truyền thống cho mọi dịp: cưới hỏi, lễ tốt nghiệp, chụp ảnh kỷ yếu, sự kiện công ty. Chị Thanh Hằng — chủ tiệm — là thợ may có hơn 20 năm kinh nghiệm, từng học nghề tại các tiệm áo dài nổi tiếng ở Huế. Tiệm có sẵn hơn 200 bộ áo dài cho thuê với nhiều mẫu mã: áo dài truyền thống, áo dài cách tân, áo dài cô dâu, áo dài nam. Dịch vụ may đo riêng từ 3-5 ngày, vải và kiểu dáng do khách hàng tự chọn. Tiệm cũng hỗ trợ make-up và chụp ảnh cơ bản cho khách thuê áo dài.',
    address: '156 Đường Trần Phú, Tỉnh Tuyên Quang',
    phone: '0956 789 012',
    priceRange: '$$',
    priceText: '150.000đ - 500.000đ (thuê), 800.000đ - 3.000.000đ (may)',
    rating: 4.6,
    totalReviews: 92,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#E76F51', '#9B59B6', '#FFB5C2'],
    openHours: 'T2-T7: 08:00 - 20:00, CN: 08:00 - 17:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['áo dài', 'thuê trang phục', 'cưới hỏi', 'kỷ yếu', 'may đo'],
    amenities: ['May đo riêng', 'Phòng thử đồ', 'Hỗ trợ make-up', 'Giao hàng tận nơi'],
    coordinates: { lat: 21.8205, lng: 105.2200 },
    social: {
      facebook: 'https://facebook.com/aodaithanhhang.tq',
      zalo: '0956789012',
      instagram: 'https://instagram.com/aodaithanhhang'
    },
    menu: [],
    reviews: [
      {
        id: 2301,
        userName: 'Lê Thị Phương Anh',
        userAvatar: '',
        rating: 5,
        date: '2026-05-10',
        text: 'Thuê áo dài chụp kỷ yếu ở đây, rất đẹp! Chị Hằng tư vấn màu và kiểu dáng phù hợp với từng người, nhóm mình 10 bạn ai cũng hài lòng. Áo dài sạch sẽ, mới tinh, giá thuê 200k/bộ/ngày, rất hợp lý.',
        images: [],
        helpful: 17,
        reply: {
          text: 'Cảm ơn các em! Ảnh kỷ yếu đẹp lắm, chị xem trên Facebook rồi. Chúc các em tốt nghiệp thành công!',
          date: '2026-05-11'
        }
      },
      {
        id: 2302,
        userName: 'Vũ Thị Hồng Nhung',
        userAvatar: '',
        rating: 5,
        date: '2026-04-05',
        text: 'Mình may áo dài cưới ở đây, chị Hằng may rất đẹp, tỉ mỉ từng đường kim mũi chỉ. Vải gấm đỏ sang trọng, thêu hoa sen tinh tế. Từ lúc đo đến khi nhận chỉ 5 ngày. Giá 1.5 triệu cho một bộ áo dài cưới, quá hời!',
        images: [],
        helpful: 22,
        reply: null
      },
      {
        id: 2303,
        userName: 'Đặng Thế Phong',
        userAvatar: '',
        rating: 4,
        date: '2026-02-15',
        text: 'Thuê áo dài nam cho đám cưới bạn, chất lượng ổn. Áo dài nam ở đây có nhiều mẫu, đặc biệt là mẫu áo dài cách tân trông rất lịch lãm. Giá thuê 150k/ngày, hợp lý.',
        images: [],
        helpful: 8,
        reply: null
      }
    ]
  },

  // 24 ── Phụ kiện Xinh Xinh ─────────────────────────────────
  {
    id: 24,
    name: 'Phụ kiện Xinh Xinh',
    slug: 'phu-kien-xinh-xinh',
    category: 'trang-phuc',
    subCategory: 'Phụ kiện',
    description: 'Thiên đường phụ kiện dành cho phái đẹp — bông tai, vòng tay, kẹp tóc, túi xách với giá từ 20 nghìn đồng.',
    fullDescription: 'Phụ kiện Xinh Xinh là shop phụ kiện thời trang quen thuộc của chị em Tuyên Quang. Shop trưng bày hàng nghìn món phụ kiện đa dạng: bông tai, vòng cổ, vòng tay, nhẫn, kẹp tóc, băng đô, cặp tóc, túi xách mini, ví cầm tay, mắt kính thời trang, và nhiều loại phụ kiện khác. Tất cả đều được chọn lọc theo xu hướng Hàn - Nhật, thiết kế tinh tế, chất lượng tốt. Giá cả vô cùng bình dân, phần lớn sản phẩm dưới 100 nghìn đồng. Shop thường xuyên có chương trình combo giảm giá: mua 3 tặng 1, giảm 20% đơn từ 200k. Đây là điểm đến lý tưởng khi muốn mua quà tặng bạn bè hoặc "tự thưởng" cho bản thân.',
    address: '12 Đường Lê Lợi, Tỉnh Tuyên Quang',
    phone: '0978 901 234',
    priceRange: '$',
    priceText: '20.000đ - 200.000đ',
    rating: 4.2,
    totalReviews: 73,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg'],
    imageColors: ['#FFB5C2', '#C7CEEA'],
    openHours: 'T2-CN: 08:00 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['phụ kiện', 'bông tai', 'vòng tay', 'kẹp tóc', 'giá rẻ', 'quà tặng'],
    amenities: ['Gói quà miễn phí', 'Combo giảm giá', 'Ship COD'],
    coordinates: { lat: 21.8250, lng: 105.2162 },
    social: {
      facebook: 'https://facebook.com/phukienxinhxinh.tq',
      zalo: '0978901234',
      instagram: 'https://instagram.com/phukienxinhxinh'
    },
    menu: [],
    reviews: [
      {
        id: 2401,
        userName: 'Hoàng Mai Phương',
        userAvatar: '',
        rating: 4,
        date: '2026-05-12',
        text: 'Shop phụ kiện đa dạng nhất Tuyên Quang! Bông tai nhiều mẫu xinh, giá từ 30-80k thôi. Mình hay mua combo mua 3 tặng 1, rất hời. Chất lượng ổn, đeo mấy tháng không bị dị ứng hay xuống màu.',
        images: [],
        helpful: 10,
        reply: null
      },
      {
        id: 2402,
        userName: 'Nguyễn Hạ Vy',
        userAvatar: '',
        rating: 4,
        date: '2026-04-18',
        text: 'Mua kẹp tóc và túi xách mini ở đây, xinh lắm! Kẹp tóc kiểu Hàn 25k/cái, túi xách mini 150k — giá quá hời. Gói quà đẹp nữa, mua tặng bạn rất tiện.',
        images: [],
        helpful: 7,
        reply: null
      }
    ]
  },

  // 25 ── Giày dép Tuyên Quang ────────────────────────────────
  {
    id: 25,
    name: 'Giày dép Tuyên Quang',
    slug: 'giay-dep-tuyen-quang',
    category: 'trang-phuc',
    subCategory: 'Giày dép',
    description: 'Cửa hàng giày dép đa dạng mẫu mã, từ sneaker thể thao đến sandal, guốc cao gót, giá cả phải chăng.',
    fullDescription: 'Giày dép Tuyên Quang là cửa hàng giày dép lớn nhất khu vực trung tâm thành phố, cung cấp đa dạng sản phẩm cho cả nam và nữ. Cửa hàng có hơn 500 mẫu giày dép đang bán, bao gồm: sneaker thể thao (Nike, Adidas, Converse phiên bản Việt Nam chất lượng cao), giày lười nam, giày công sở nữ, sandal, guốc cao gót, dép quai ngang, boots. Giá dao động từ 150.000đ đến 800.000đ, phù hợp mọi phân khúc. Cửa hàng cam kết bảo hành đế giày 6 tháng, đổi size trong 3 ngày nếu không vừa. Mỗi tháng đều có chương trình giảm giá từ 20-50% cho các mẫu cũ.',
    address: '45 Đường 17/8, Tỉnh Tuyên Quang',
    phone: '0989 012 345',
    priceRange: '$$',
    priceText: '150.000đ - 800.000đ',
    rating: 4.0,
    totalReviews: 56,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#264653', '#D4A373', '#E9C46A'],
    openHours: 'T2-CN: 08:00 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['giày', 'sneaker', 'sandal', 'cao gót', 'nam nữ'],
    amenities: ['Bảo hành 6 tháng', 'Đổi size 3 ngày', 'Ship COD'],
    coordinates: { lat: 21.8232, lng: 105.2173 },
    social: {
      facebook: 'https://facebook.com/giaydeptq',
      zalo: '0989012345',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 2501,
        userName: 'Trần Đức Anh',
        userAvatar: '',
        rating: 4,
        date: '2026-05-08',
        text: 'Mua đôi sneaker trắng 350k, chất lượng tốt, đế êm, form đẹp. Đi mấy tháng vẫn bền. Shop đổi size nhanh, nhân viên tư vấn vui vẻ. Hài lòng!',
        images: [],
        helpful: 5,
        reply: null
      },
      {
        id: 2502,
        userName: 'Lê Thị Kim Chi',
        userAvatar: '',
        rating: 4,
        date: '2026-03-20',
        text: 'Mua guốc cao gót cho dự tiệc, 280k thôi mà xinh lắm. Đế chắc, đi không bị trơn. Shop có nhiều mẫu giày cho nữ, từ sandal đến boots. Giá ổn so với chất lượng.',
        images: [],
        helpful: 4,
        reply: null
      }
    ]
  },

  // 26 ── Đồ 2hand TQ ────────────────────────────────────────
  {
    id: 26,
    name: 'Đồ 2hand TQ',
    slug: 'do-2hand-tq',
    category: 'trang-phuc',
    subCategory: 'Second-hand',
    description: 'Shop đồ secondhand chất lượng cao, hàng tuyển từ Nhật, Hàn. Quần áo, túi xách, giày dép hàng hiệu giá siêu rẻ.',
    fullDescription: 'Đồ 2hand TQ là shop quần áo secondhand (đồ cũ) đầu tiên và lớn nhất tại Tuyên Quang, mở cửa từ năm 2022. Shop tuyển chọn quần áo, túi xách, giày dép secondhand từ Nhật Bản và Hàn Quốc — những thị trường nổi tiếng với hàng 2hand chất lượng cao. Mỗi món đồ đều được kiểm tra kỹ lưỡng trước khi bày bán, đảm bảo sạch sẽ, ít hao mòn. Ở đây, bạn có thể tìm thấy áo khoác Uniqlo, quần jean Levi\'s, túi xách Coach, giày New Balance... với giá chỉ bằng 1/5 đến 1/10 giá gốc. Shop cập nhật hàng mới mỗi tuần, và thường livestream trên Facebook để khách hàng chọn đồ online.',
    address: '78B Đường Tôn Đức Thắng, Tỉnh Tuyên Quang',
    phone: '0932 109 876',
    priceRange: '$',
    priceText: '30.000đ - 300.000đ',
    rating: 4.4,
    totalReviews: 108,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#2A9D8F', '#E9C46A', '#D4A373'],
    openHours: 'T2-CN: 09:00 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['secondhand', '2hand', 'giá rẻ', 'hàng Nhật', 'hàng Hàn', 'bền vững'],
    amenities: ['Phòng thử đồ', 'Livestream Facebook', 'Ship COD', 'Đổi trả 3 ngày'],
    coordinates: { lat: 21.8258, lng: 105.2155 },
    social: {
      facebook: 'https://facebook.com/do2handtq',
      zalo: '0932109876',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 2601,
        userName: 'Phan Thị Minh Tâm',
        userAvatar: '',
        rating: 5,
        date: '2026-05-14',
        text: 'Yêu shop này! Hàng 2hand Nhật chất lượng cực tốt, như mới luôn. Mình mua được áo khoác Uniqlo 120k, quần jean Levi\'s 150k — quá hời! Mỗi tuần shop về hàng mới, cứ thứ 6 là mình chạy ra xem. Ủng hộ thời trang bền vững!',
        images: [],
        helpful: 18,
        reply: {
          text: 'Cảm ơn chị Tâm đã luôn ủng hộ shop! Thứ 6 tuần này về lô áo khoác mùa thu xịn lắm, ghé xem nhé chị!',
          date: '2026-05-15'
        }
      },
      {
        id: 2602,
        userName: 'Nguyễn Đình Khoa',
        userAvatar: '',
        rating: 4,
        date: '2026-04-20',
        text: 'Lần đầu mua đồ 2hand, hơi ngại nhưng thử rồi thì ghiền luôn. Mua được đôi New Balance 80k, trông như mới, đi êm chân. Áo hoodie Champion 100k, dày dặn ấm áp. Giá quá rẻ so với chất lượng.',
        images: [],
        helpful: 12,
        reply: null
      },
      {
        id: 2603,
        userName: 'Trương Hà Linh',
        userAvatar: '',
        rating: 4,
        date: '2026-03-12',
        text: 'Shop bán hàng 2hand nhưng rất cẩn thận, đồ sạch sẽ, không có mùi. Livestream trên Facebook vui, chọn đồ online tiện lắm. Mình ở huyện ngoài, đặt ship COD về rất nhanh.',
        images: [],
        helpful: 9,
        reply: null
      }
    ]
  },

  // 27 ── Thời trang nam Đức Phát ─────────────────────────────
  {
    id: 27,
    name: 'Thời trang nam Đức Phát',
    slug: 'thoi-trang-nam-duc-phat',
    category: 'trang-phuc',
    subCategory: 'Quần áo',
    description: 'Shop thời trang nam lịch lãm, chuyên sơ mi, vest, quần tây và đồ casual phong cách Hàn Quốc.',
    fullDescription: 'Thời trang nam Đức Phát là shop thời trang nam đẳng cấp nhất tại Tuyên Quang, chuyên phục vụ các anh em muốn mặc đẹp mà không cần phải lên Hà Nội shopping. Shop có hai mảng chính: đồ công sở (sơ mi, vest, quần tây, cà vạt) và đồ casual Hàn Quốc (áo polo, áo thun, quần jogger, quần short). Tất cả sản phẩm đều được anh Phát — chủ shop — lựa chọn kỹ lưỡng, ưu tiên chất vải tốt, form chuẩn Á Đông. Đặc biệt, shop có dịch vụ tư vấn phối đồ miễn phí — anh Phát sẽ gợi ý set đồ phù hợp theo vóc dáng, nghề nghiệp và phong cách của từng khách hàng.',
    address: '92 Đường Hùng Vương, Tỉnh Tuyên Quang',
    phone: '0967 890 123',
    priceRange: '$$',
    priceText: '200.000đ - 1.200.000đ',
    rating: 4.3,
    totalReviews: 65,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'],
    imageColors: ['#264653', '#2A9D8F', '#D4A373'],
    openHours: 'T2-CN: 08:30 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['thời trang nam', 'vest', 'sơ mi', 'Hàn Quốc', 'công sở'],
    amenities: ['Phòng thử đồ', 'Tư vấn phối đồ miễn phí', 'Sửa miễn phí', 'Ship COD'],
    coordinates: { lat: 21.8212, lng: 105.2192 },
    social: {
      facebook: 'https://facebook.com/ducphat.fashion',
      zalo: '0967890123',
      instagram: ''
    },
    menu: [],
    reviews: [
      {
        id: 2701,
        userName: 'Nguyễn Hữu Phúc',
        userAvatar: '',
        rating: 5,
        date: '2026-05-06',
        text: 'Mua bộ vest đi dự đám cưới bạn, anh Phát tư vấn rất tận tâm. Vest slim fit, chất vải mềm, form chuẩn. Giá 1.2 triệu cho cả bộ vest + sơ mi + cà vạt, quá hời so với lên Hà Nội mua. Được sửa miễn phí nếu không vừa.',
        images: [],
        helpful: 11,
        reply: {
          text: 'Cảm ơn anh Phúc! Anh mặc vest đẹp lắm ạ. Hẹn anh ghé shop dịp sau!',
          date: '2026-05-07'
        }
      },
      {
        id: 2702,
        userName: 'Trần Quốc Đạt',
        userAvatar: '',
        rating: 4,
        date: '2026-04-15',
        text: 'Đồ casual ở đây đẹp, kiểu Hàn Quốc nam tính. Áo polo 250k, quần jogger 300k — chất lượng tốt, mặc thoải mái. Anh chủ shop vui tính, tư vấn nhiệt tình, không ép mua.',
        images: [],
        helpful: 7,
        reply: null
      }
    ]
  },

  // 28 ── Cháo gà Tuyên Quang ────────────────────────────────
  {
    id: 28,
    name: 'Cháo gà Tuyên Quang',
    slug: 'chao-ga-tuyen-quang',
    category: 'an-uong',
    subCategory: 'Ẩm thực đường phố',
    description: 'Quán cháo gà đêm nổi tiếng, mở từ 20h đến 2h sáng. Cháo nấu từ gà đồi, thơm phức mùi hành phi.',
    fullDescription: 'Cháo gà Tuyên Quang là quán ăn khuya "huyền thoại" của thành phố, phục vụ từ 20 giờ tối đến 2 giờ sáng. Quán nằm ở góc phố nhỏ, bày vài bộ bàn ghế đơn giản dưới mái che bạt, nhưng mỗi đêm đều đông nghẹt khách. Bí quyết nằm ở nồi cháo được nấu từ gà đồi thả vườn, xương gà hầm nhừ cho nước ngọt tự nhiên. Mỗi bát cháo được rắc hành phi thơm phức, gừng tươi thái sợi, thêm vài miếng gà xé nhỏ mềm ngọt. Ăn kèm là đĩa quẩy giòn rụm, dầm vào cháo nóng — sự kết hợp hoàn hảo cho những đêm se lạnh xứ Tuyên.',
    address: 'Góc Đường Chiến Thắng - Lê Đại Hành, Tỉnh Tuyên Quang',
    phone: '0943 210 987',
    priceRange: '$',
    priceText: '25.000đ - 45.000đ',
    rating: 4.5,
    totalReviews: 178,
    images: ['placeholder-1.jpg', 'placeholder-2.jpg'],
    imageColors: ['#E9C46A', '#D4A373'],
    openHours: 'T2-CN: 20:00 - 02:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['cháo gà', 'ăn khuya', 'đêm', 'vỉa hè', 'giá rẻ'],
    amenities: ['Mang về'],
    coordinates: { lat: 21.8222, lng: 105.2163 },
    social: {
      facebook: '',
      zalo: '0943210987',
      instagram: ''
    },
    menu: [
      { name: 'Cháo gà thường', price: '25.000đ' },
      { name: 'Cháo gà đặc biệt', price: '35.000đ' },
      { name: 'Cháo gà + lòng gà', price: '40.000đ' },
      { name: 'Quẩy (3 cái)', price: '10.000đ' },
      { name: 'Thêm trứng gà', price: '5.000đ' }
    ],
    reviews: [
      {
        id: 2801,
        userName: 'Hoàng Anh Tú',
        userAvatar: '',
        rating: 5,
        date: '2026-05-19',
        text: 'Đêm nào cũng ghé! Cháo gà nóng hổi, thơm mùi hành phi, gà đồi ngọt thịt. Đêm mùa đông ăn bát cháo nóng thì sướng không gì bằng. 25k thôi mà no căng bụng. Quẩy giòn rụm, dầm cháo ăn phê lắm!',
        images: [],
        helpful: 23,
        reply: null
      },
      {
        id: 2802,
        userName: 'Lê Ngọc Hân',
        userAvatar: '',
        rating: 4,
        date: '2026-04-28',
        text: 'Ăn khuya ở Tuyên Quang thì phải ra đây! Bát cháo gà đặc biệt 35k, nhiều thịt gà xé, thêm lòng gà ngon tuyệt. Quán bình dân, chỗ ngồi đơn giản nhưng đồ ăn thì ngon thật sự.',
        images: [],
        helpful: 15,
        reply: null
      },
      {
        id: 2803,
        userName: 'Phạm Tuấn Kiệt',
        userAvatar: '',
        rating: 5,
        date: '2026-03-15',
        text: 'Cháo gà ở đây là comfort food của mình mỗi khi về Tuyên Quang. Nước cháo ngọt từ xương gà, hành phi thơm nức. Thêm chút tương ớt, vắt chanh — bát cháo hoàn hảo. Giá rẻ, ngon, ấm bụng. Recommend!',
        images: [],
        helpful: 12,
        reply: null
      }
    ]
  }
];


// ─── HÀM TRUY VẤN & TÌM KIẾM ───────────────────────────────

// Mảng gộp tất cả địa điểm (Sẽ được ghi đè bởi Firebase nếu có)
export let PLACES = [...BASE_PLACES, ...TOURISM_PLACES];

export function setPlaces(newPlaces) {
    PLACES = newPlaces;
}

/**
 * Lấy danh sách địa điểm theo danh mục
 * @param {string} categoryId - ID danh mục (vd: 'an-uong', 'du-lich')
 * @returns {Array} Danh sách địa điểm thuộc danh mục
 */
export function getPlacesByCategory(categoryId) {
  return PLACES.filter(place => place.category === categoryId);
}

/**
 * Lấy thông tin địa điểm theo ID
 * @param {number} id - ID của địa điểm
 * @returns {Object|undefined} Thông tin địa điểm hoặc undefined
 */
export function getPlaceById(id) {
  return PLACES.find(place => place.id === id);
}

/**
 * Lấy thông tin địa điểm theo slug
 * @param {string} slug - Slug của địa điểm
 * @returns {Object|undefined} Thông tin địa điểm hoặc undefined
 */
export function getPlaceBySlug(slug) {
  return PLACES.find(place => place.slug === slug);
}

/**
 * Lấy danh sách địa điểm nổi bật (isFeatured = true)
 * @returns {Array} Danh sách địa điểm nổi bật
 */
export function getFeaturedPlaces() {
  return PLACES.filter(place => place.isFeatured);
}

/**
 * Lấy danh sách địa điểm mới (isNew = true)
 * @returns {Array} Danh sách địa điểm mới
 */
export function getNewPlaces() {
  return PLACES.filter(place => place.isNew);
}

/**
 * Lấy danh sách địa điểm đánh giá cao nhất
 * @param {number} limit - Số lượng tối đa (mặc định: 8)
 * @returns {Array} Danh sách địa điểm sắp xếp theo rating giảm dần
 */
export function getTopRatedPlaces(limit = 8) {
  return [...PLACES]
    .sort((a, b) => b.rating - a.rating || b.totalReviews - a.totalReviews)
    .slice(0, limit);
}

/**
 * Tìm kiếm địa điểm theo từ khóa
 * Tìm trong: tên, mô tả, địa chỉ, tags, danh mục con
 * @param {string} query - Từ khóa tìm kiếm
 * @returns {Array} Danh sách địa điểm phù hợp
 */
export function searchPlaces(query) {
  if (!query || !query.trim()) return [];

  const normalizedQuery = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

  /**
   * Chuẩn hóa chuỗi tiếng Việt (bỏ dấu) để so sánh
   * @param {string} str
   * @returns {string}
   */
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  return PLACES.filter(place => {
    const searchableText = [
      place.name,
      place.description,
      place.address,
      place.subCategory,
      ...place.tags
    ].join(' ');

    return normalize(searchableText).includes(normalizedQuery);
  });
}

/**
 * Lấy danh sách địa điểm liên quan
 * Ưu tiên: cùng danh mục con → cùng danh mục → khác danh mục
 * @param {Object} place - Địa điểm gốc
 * @param {number} limit - Số lượng tối đa (mặc định: 4)
 * @returns {Array} Danh sách địa điểm liên quan
 */
export function getRelatedPlaces(place, limit = 4) {
  if (!place) return [];

  // Ưu tiên 1: Cùng danh mục con (loại trừ chính nó)
  const sameSubCategory = PLACES.filter(
    p => p.id !== place.id && p.subCategory === place.subCategory
  );

  // Ưu tiên 2: Cùng danh mục nhưng khác danh mục con
  const sameCategory = PLACES.filter(
    p => p.id !== place.id &&
         p.category === place.category &&
         p.subCategory !== place.subCategory
  );

  // Ưu tiên 3: Khác danh mục, đánh giá cao
  const otherCategory = PLACES
    .filter(p => p.id !== place.id && p.category !== place.category)
    .sort((a, b) => b.rating - a.rating);

  // Gộp kết quả theo thứ tự ưu tiên, loại bỏ trùng lặp
  const combined = [...sameSubCategory, ...sameCategory, ...otherCategory];
  const seen = new Set();
  const unique = [];

  for (const p of combined) {
    if (!seen.has(p.id)) {
      seen.add(p.id);
      unique.push(p);
    }
    if (unique.length >= limit) break;
  }

  return unique;
}

/**
 * Lấy danh sách địa điểm theo danh mục con
 * @param {string} subCategory - Tên danh mục con (vd: 'Cafe & Trà sữa')
 * @returns {Array} Danh sách địa điểm
 */
export function getPlacesBySubCategory(subCategory) {
  return PLACES.filter(place => place.subCategory === subCategory);
}

/**
 * Lấy thống kê tổng quan
 * @returns {Object} { totalPlaces, totalReviews, avgRating, categoryCounts }
 */
export function getStats() {
  const totalPlaces = PLACES.length;
  const totalReviews = PLACES.reduce((sum, p) => sum + p.totalReviews, 0);
  const avgRating = (PLACES.reduce((sum, p) => sum + p.rating, 0) / totalPlaces).toFixed(1);

  const categoryCounts = {};
  for (const cat of CATEGORIES) {
    categoryCounts[cat.id] = PLACES.filter(p => p.category === cat.id).length;
  }

  return { totalPlaces, totalReviews, avgRating: parseFloat(avgRating), categoryCounts };
}

/**
 * Lấy thông tin danh mục theo ID
 * @param {string} categoryId - ID danh mục
 * @returns {Object|undefined} Thông tin danh mục
 */
export function getCategoryById(categoryId) {
  return CATEGORIES.find(cat => cat.id === categoryId);
}

/**
 * Lấy danh sách danh mục con theo danh mục
 * @param {string} categoryId - ID danh mục
 * @returns {Array} Danh sách danh mục con
 */
export function getSubCategories(categoryId) {
  return SUB_CATEGORIES[categoryId] || [];
}


// ─── XUẤT DỮ LIỆU ──────────────────────────────────────────

export { CATEGORIES, SUB_CATEGORIES };

