/**
 * ============================================================
 *  THUỒNG LUỒNG MINI — Dữ liệu mẫu
 *  Nền tảng khám phá lifestyle địa phương tại Tuyên Quang
 * ============================================================
 *
 *  File này chứa toàn bộ dữ liệu mock cho ứng dụng:
 *    • CATEGORIES   – Danh mục chính
 *    • SUB_CATEGORIES – Danh mục con
 *    • PLACES        – Danh sách địa điểm (33 địa điểm)
 *    • Helper functions – Truy vấn & tìm kiếm
 */

import { TOURISM_PLACES } from './tourism-data.js';

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
const BASE_PLACES = [
  // ── NHÀ HÀNG & QUÁN ĂN ──────────────────────────────────────────
  {
    id: 1,
    name: 'Nhà hàng Royal Tuyên Quang',
    slug: 'royal-tuyen-quang',
    category: 'an-uong',
    subCategory: 'Nhà hàng',
    description: 'Địa điểm sang trọng, không gian hiện đại, chuyên đặc sản địa phương và hải sản tươi sống.',
    fullDescription: 'Royal Tuyên Quang là một trong những nhà hàng sang trọng bậc nhất thành phố trong năm 2026. Với thiết kế hiện đại, không gian mở thoáng đãng và hệ thống phòng VIP đẳng cấp, đây là lựa chọn hàng đầu cho các buổi tiệc gia đình, tiếp khách hoặc sự kiện lớn. Thực đơn giao thoa giữa đặc sản địa phương vùng núi và hải sản tươi sống nhập trong ngày.',
    address: '08 Mạc Đĩnh Chi, Phường Tân Quang, TP. Tuyên Quang',
    phone: '0207 381 8888',
    priceRange: '$$$',
    priceText: '200.000đ - 600.000đ',
    rating: 4.8,
    totalReviews: 845,
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'],
    imageColors: ['#8E44AD', '#9B59B6', '#F4A261'],
    openHours: 'T2-CN: 10:00 - 22:30',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['sang trọng', 'hải sản', 'tiệc cưới', 'phòng VIP'],
    amenities: ['Bãi đỗ xe', 'Phòng VIP', 'Điều hòa', 'Thanh toán thẻ'],
    coordinates: { lat: 21.8210, lng: 105.2150 },
    social: { facebook: 'https://facebook.com/royal.tuyenquang', zalo: '02073818888', instagram: '' },
    menu: [
      { name: 'Cá hồi Sapa ăn sống', price: '350.000đ' },
      { name: 'Lẩu cá lăng chua cay', price: '450.000đ' },
      { name: 'Gà đồi nướng mắc khén', price: '280.000đ' },
      { name: 'Ba ba rang muối', price: '600.000đ' }
    ],
    reviews: []
  },
  {
    id: 2,
    name: 'Nhà hàng Ẩm Thực Việt',
    slug: 'am-thuc-viet-tq',
    category: 'an-uong',
    subCategory: 'Nhà hàng',
    description: 'Quy mô lớn với thực đơn hơn 100 món Á Đông, không gian cực kỳ rộng rãi và thoáng mát.',
    fullDescription: 'Tọa lạc trên đường Phan Bội Châu, Ẩm Thực Việt tự hào sở hữu thực đơn hơn 100 món ăn từ truyền thống Việt Nam đến phong cách Á Đông đương đại. Quán nổi tiếng với nguồn nguyên liệu tươi ngon, đặc biệt là các món chế biến từ cá sông Lô và lợn bản đen.',
    address: 'Đường Phan Bội Châu, Phường Phan Thiết, TP. Tuyên Quang',
    phone: '0988 123 456',
    priceRange: '$$',
    priceText: '150.000đ - 350.000đ',
    rating: 4.6,
    totalReviews: 620,
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80'],
    imageColors: ['#E76F51', '#F4A261', '#E9C46A'],
    openHours: 'T2-CN: 09:00 - 22:00',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['gia đình', 'đa dạng', 'cá sông Lô', 'nhậu'],
    amenities: ['Sân vườn', 'Bãi đỗ xe rộng', 'Máy lạnh'],
    coordinates: { lat: 21.8280, lng: 105.2120 },
    social: { facebook: 'https://facebook.com/amthucviet.tq', zalo: '0988123456', instagram: '' },
    menu: [
      { name: 'Cá bỗng sông Lô nướng', price: '250.000đ' },
      { name: 'Lợn đen quay giòn da', price: '180.000đ' },
      { name: 'Nộm hoa chuối tai heo', price: '80.000đ' },
      { name: 'Lẩu riêu cua bắp bò', price: '300.000đ' }
    ],
    reviews: []
  },
  {
    id: 3,
    name: 'MỘC Restaurant',
    slug: 'moc-restaurant-tq',
    category: 'an-uong',
    subCategory: 'Quán ăn',
    description: 'Chuyên đặc sản dê núi, gà đồi với không gian mộc mạc, gần gũi thiên nhiên.',
    fullDescription: 'Đúng như tên gọi, MỘC mang đến không gian dùng bữa ấm cúng, bài trí chủ đạo bằng gỗ và cây xanh. Nhà hàng liên tục cập nhật menu theo mùa, nổi tiếng nhất với đặc sản dê núi đá và gà đồi chạy bộ thịt chắc, ngọt.',
    address: '124 Trần Hưng Đạo, Phường Minh Xuân, TP. Tuyên Quang',
    phone: '0355 999 888',
    priceRange: '$$',
    priceText: '100.000đ - 250.000đ',
    rating: 4.7,
    totalReviews: 412,
    images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80'],
    imageColors: ['#5A7D59', '#3E5C3D', '#C5A059'],
    openHours: 'T2-CN: 10:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['dê núi', 'gà đồi', 'mộc mạc', 'nhậu'],
    amenities: ['Chỗ ngồi ngoài trời', 'WiFi', 'Chỗ để xe máy'],
    coordinates: { lat: 21.8250, lng: 105.2180 },
    social: { facebook: 'https://facebook.com/moc.restaurant.tq', zalo: '0355999888', instagram: '' },
    menu: [
      { name: 'Dê xào lăn', price: '150.000đ' },
      { name: 'Dê tái chanh', price: '140.000đ' },
      { name: 'Gà đồi rang muối', price: '160.000đ' },
      { name: 'Lẩu dê nhúng mẻ', price: '250.000đ' }
    ],
    reviews: []
  },
  {
    id: 4,
    name: 'Nhà hàng Dũng Cá',
    slug: 'nha-hang-dung-ca',
    category: 'an-uong',
    subCategory: 'Nhà hàng',
    description: 'Biểu tượng ẩm thực ven sông Lô, chuyên trị các món cá sông tươi rói bắt ngay tại lồng.',
    fullDescription: 'Nhà hàng Dũng Cá có vị trí đắc địa nhìn thẳng ra sông Lô thơ mộng. Đặc trưng của quán là hệ thống lồng cá nuôi trực tiếp dưới sông, khách đến chỉ việc chọn cá đang bơi và bếp sẽ chế biến ngay lập tức. Cực kỳ nổi tiếng với Gỏi cá bỗng.',
    address: 'Đường ven sông Lô (đối diện siêu thị Tuyên Quang)',
    phone: '0912 345 789',
    priceRange: '$$$',
    priceText: '250.000đ - 500.000đ',
    rating: 4.8,
    totalReviews: 1250,
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80'],
    imageColors: ['#2B4B6F', '#1A2F45', '#E9C46A'],
    openHours: 'T2-CN: 09:00 - 22:30',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['cá sông', 'view sông Lô', 'đặc sản', 'gỏi cá'],
    amenities: ['View sông', 'Phòng riêng', 'Bãi đỗ xe'],
    coordinates: { lat: 21.8225, lng: 105.2100 },
    social: { facebook: 'https://facebook.com/dungca.tq', zalo: '0912345789', instagram: '' },
    menu: [
      { name: 'Gỏi cá bỗng sông Lô', price: '280.000đ' },
      { name: 'Cá lăng nướng than hoa', price: '300.000đ' },
      { name: 'Lẩu cá tầm', price: '450.000đ' },
      { name: 'Cá chình nướng riềng mẻ', price: '350.000đ' }
    ],
    reviews: []
  },
  {
    id: 5,
    name: 'Min-Max BBQ',
    slug: 'min-max-bbq',
    category: 'an-uong',
    subCategory: 'Nhà hàng',
    description: 'Thiên đường lẩu nướng không khói phong cách Hàn Quốc, giá cả cực kỳ hợp lý cho giới trẻ.',
    fullDescription: 'Min-Max BBQ là điểm tụ tập quen thuộc của giới trẻ và các gia đình trẻ tại Tuyên Quang. Quán trang bị hệ thống hút mùi âm bàn hiện đại, phục vụ buffet nướng và lẩu với hàng chục loại thịt bò Mỹ, hải sản và panchan chuẩn vị Hàn.',
    address: 'Khu đô thị Việt Mỹ, Phường Phan Thiết, TP. Tuyên Quang',
    phone: '0987 654 321',
    priceRange: '$$',
    priceText: '169.000đ - 250.000đ/Buffet',
    rating: 4.5,
    totalReviews: 890,
    images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'],
    imageColors: ['#E76F51', '#F4A261', '#264653'],
    openHours: 'T2-CN: 17:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['buffet', 'lẩu nướng', 'bbq', 'hàn quốc', 'giới trẻ'],
    amenities: ['Điều hòa', 'Hút mùi', 'Buffet'],
    coordinates: { lat: 21.8260, lng: 105.2165 },
    social: { facebook: 'https://facebook.com/minmaxbbq.tq', zalo: '0987654321', instagram: '' },
    menu: [
      { name: 'Buffet nướng tiêu chuẩn', price: '169.000đ' },
      { name: 'Buffet lẩu nướng tổng hợp', price: '219.000đ' },
      { name: 'Buffet VIP Hải Sản', price: '289.000đ' }
    ],
    reviews: []
  },

  // ── CAFE & TRÀ SỮA ──────────────────────────────────────────
  {
    id: 6,
    name: 'Koi and You Coffee',
    slug: 'koi-and-you-coffee',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Cafe cá Koi lãng mạn, hồ cá tuyệt đẹp nằm giữa khuôn viên, điểm sống ảo hot nhất Tuyên Quang.',
    fullDescription: 'Koi and You mang đến một không gian xanh mát, thư giãn tuyệt đối với hồ cá Koi Nhật Bản trị giá hàng tỷ đồng ngay giữa trung tâm quán. Thiết kế mở, kết hợp cầu gỗ và tiểu cảnh bonsai khiến nơi đây trở thành góc check-in không thể bỏ lỡ của năm 2026.',
    address: 'Khu đô thị Việt Mỹ Villas, đường Lê Lợi 4, tổ 12, Phường Phan Thiết',
    phone: '0901 234 567',
    priceRange: '$$',
    priceText: '35.000đ - 70.000đ',
    rating: 4.8,
    totalReviews: 1050,
    images: ['https://images.unsplash.com/photo-1541123437800-1bb1317bc920?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80'],
    imageColors: ['#E76F51', '#2A9D8F', '#264653'],
    openHours: 'T2-CN: 07:00 - 22:30',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['cá koi', 'sống ảo', 'ngoài trời', 'thư giãn'],
    amenities: ['Hồ cá Koi', 'Bãi đỗ xe ô tô', 'Máy lạnh', 'Thức ăn cá'],
    coordinates: { lat: 21.8255, lng: 105.2175 },
    social: { facebook: 'https://facebook.com/koiandyou.tq', zalo: '0901234567', instagram: '' },
    menu: [
      { name: 'Cà phê muối', price: '45.000đ' },
      { name: 'Trà sen vàng', price: '50.000đ' },
      { name: 'Nước ép mix nhiệt đới', price: '55.000đ' },
      { name: 'Mồi cho cá Koi', price: '10.000đ' }
    ],
    reviews: []
  },
  {
    id: 7,
    name: 'Laika Cafe',
    slug: 'laika-cafe-tq',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Phong cách cổ điển pha hiện đại, tone màu vàng trắng sang chảnh chuẩn Gu thủ đô.',
    fullDescription: 'Thương hiệu Laika đình đám đã có mặt tại Tuyên Quang. Quán nổi bật với thiết kế tone vàng - trắng bắt mắt, ban công tầng 2 rộng rãi và hệ thống ánh sáng được setup chuẩn studio, đảm bảo cứ giơ máy lên là có ảnh đẹp.',
    address: '102 Quang Trung, Phường Tân Quang',
    phone: '0345 678 910',
    priceRange: '$$',
    priceText: '40.000đ - 65.000đ',
    rating: 4.6,
    totalReviews: 890,
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80'],
    imageColors: ['#E9C46A', '#F4A261', '#FFFFFF'],
    openHours: 'T2-CN: 08:00 - 23:00',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['sang chảnh', 'ban công', 'chuỗi', 'check-in'],
    amenities: ['Ban công', 'Điều hòa 24/7', 'Wifi mạnh', 'Chụp ảnh cưới'],
    coordinates: { lat: 21.8215, lng: 105.2185 },
    social: { facebook: 'https://facebook.com/laikacafe.tq', zalo: '0345678910', instagram: '' },
    menu: [
      { name: 'Trà nhài đác thơm', price: '55.000đ' },
      { name: 'Cà phê cốt dừa', price: '50.000đ' },
      { name: 'Bạc xỉu đá', price: '45.000đ' },
      { name: 'Bánh sừng bò (Croissant)', price: '40.000đ' }
    ],
    reviews: []
  },
  {
    id: 8,
    name: 'Cielo Coffee & Ice Cream',
    slug: 'cielo-coffee',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Không gian hiện đại, rộng rãi, tụ tập bạn bè và thưởng thức kem Ý Gelato đỉnh cao.',
    fullDescription: 'Cielo mang phong cách công nghiệp hiện đại (Industrial) với trần cao và tường kính đón nắng tự nhiên. Quán không chỉ nổi tiếng với đồ uống chất lượng mà còn là địa chỉ bán kem Ý Gelato làm thủ công ngon nhất thành phố Tuyên Quang.',
    address: '51 Bình Thuận, TP. Tuyên Quang',
    phone: '0977 888 999',
    priceRange: '$$',
    priceText: '30.000đ - 80.000đ',
    rating: 4.7,
    totalReviews: 650,
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1488597728638-76901802e3b2?auto=format&fit=crop&q=80'],
    imageColors: ['#264653', '#2A9D8F', '#F4A261'],
    openHours: 'T2-CN: 08:30 - 22:30',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['kem ý', 'gelato', 'hiện đại', 'trần cao'],
    amenities: ['Tủ kem tươi', 'Khu hút thuốc riêng', 'Wifi'],
    coordinates: { lat: 21.8230, lng: 105.2140 },
    social: { facebook: 'https://facebook.com/cielocoffee.tq', zalo: '0977888999', instagram: '' },
    menu: [
      { name: 'Kem Gelato Bỉ (1 viên)', price: '35.000đ' },
      { name: 'Trà xoài macchiato', price: '50.000đ' },
      { name: 'Cà phê ủ lạnh (Cold Brew)', price: '55.000đ' }
    ],
    reviews: []
  },
  {
    id: 9,
    name: 'Feline Café',
    slug: 'feline-cafe',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Quán cafe theo mùa, decor liên tục thay đổi theo concept Lễ, Tết, Giáng Sinh.',
    fullDescription: 'Nếu bạn là người đam mê đổi ảnh đại diện thường xuyên, Feline Café là chân ái. Mỗi tháng quán lại biến hóa không gian theo một chủ đề khác nhau: concept Trung Thu, concept Giáng Sinh lấp lánh, hay concept Tết cổ truyền. Đồ uống đi kèm bánh ngọt rất bắt mắt.',
    address: '126 Bình Thuận, TP. Tuyên Quang',
    phone: '0888 111 222',
    priceRange: '$$',
    priceText: '35.000đ - 65.000đ',
    rating: 4.5,
    totalReviews: 780,
    images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80'],
    imageColors: ['#E9C46A', '#FFB5C2', '#B5EAD7'],
    openHours: 'T2-CN: 08:00 - 22:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['concept', 'chụp ảnh', 'bánh ngọt', 'đổi mới'],
    amenities: ['Phụ kiện chụp ảnh', 'Gương soi', 'Điều hòa'],
    coordinates: { lat: 21.8235, lng: 105.2145 },
    social: { facebook: 'https://facebook.com/felinecafe.tq', zalo: '0888111222', instagram: '' },
    menu: [
      { name: 'Trà cam quế', price: '45.000đ' },
      { name: 'Bánh Red Velvet', price: '40.000đ' },
      { name: 'Trà sữa olong nướng', price: '45.000đ' }
    ],
    reviews: []
  },

  // ── VUI CHƠI & MUA SẮM ──────────────────────────────────────────
  {
    id: 10,
    name: 'Rạp chiếu phim Lotte Cinema Tuyên Quang',
    slug: 'lotte-cinema-tq',
    category: 'vui-choi',
    subCategory: 'Rạp phim',
    description: 'Cụm rạp tiêu chuẩn quốc tế với hệ thống âm thanh vòm đỉnh cao.',
    fullDescription: 'Nằm trong TTTM lớn nhất thành phố, Lotte Cinema mang đến trải nghiệm điện ảnh chuẩn Hàn Quốc với ghế ngồi rộng rãi, độ dốc hợp lý, màn hình cong siêu nét và combo bắp nước đa dạng.',
    address: 'Tầng 3, TTTM Vincom Tuyên Quang',
    phone: '1900 1234',
    priceRange: '$$',
    priceText: '55.000đ - 110.000đ/vé',
    rating: 4.7,
    totalReviews: 1450,
    images: ['https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80'],
    imageColors: ['#E76F51', '#2B4B6F', '#1A2F45'],
    openHours: 'T2-CN: 08:30 - 23:30',
    isOpen: true,
    isFeatured: true,
    isNew: false,
    tags: ['phim', 'bom tấn', 'vincom', 'giải trí'],
    amenities: ['Ghế đôi', 'Bãi đỗ xe hầm', 'Máy lạnh'],
    coordinates: { lat: 21.8242, lng: 105.2168 },
    social: { facebook: 'https://facebook.com/lottecinematuyenquang', zalo: '', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 11,
    name: 'Tiệm Đồ Boho - Boho Chic',
    slug: 'boho-chic-tq',
    category: 'trang-phuc',
    subCategory: 'Quần áo',
    description: 'Chuyên cho thuê trang phục phong cách Bohemian chụp ảnh ngoại cảnh.',
    fullDescription: 'Cửa hàng cung cấp hàng trăm mẫu váy Maxi, đầm Boho, phụ kiện thổ cẩm cực chất để phục vụ du khách đi check-in tại Bản Khun, Na Hang hay các cánh đồng hoa. Giá thuê rẻ, đồ luôn được giặt thơm tho sạch sẽ.',
    address: '15 Lê Lợi, TP. Tuyên Quang',
    phone: '0909 888 777',
    priceRange: '$',
    priceText: '80.000đ - 150.000đ/ngày',
    rating: 4.8,
    totalReviews: 210,
    images: ['https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1515347619152-16e788eb5cc3?auto=format&fit=crop&q=80'],
    imageColors: ['#C5A059', '#D4A373', '#9B59B6'],
    openHours: 'T2-CN: 08:00 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: false,
    tags: ['boho', 'thuê đồ', 'chụp ảnh', 'du lịch'],
    amenities: ['Thử đồ', 'Phụ kiện đi kèm', 'Giặt sấy'],
    coordinates: { lat: 21.8220, lng: 105.2140 },
    social: { facebook: 'https://facebook.com/bohochic.tq', zalo: '0909888777', instagram: '' },
    menu: [],
    reviews: []
  },

  // ── ĐỊA ĐIỂM MỚI 2026 ──────────────────────────────────────────
  {
    id: 12,
    name: 'Phê La Tuyên Quang - Quang Trung',
    slug: 'phe-la-tuyen-quang',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Thương hiệu ô long đặc sản Đà Lạt Phê La đã chính thức có mặt tại Tuyên Quang từ đầu năm 2026.',
    fullDescription: 'Không gian rộng rãi, đậm chất cắm trại "Glamping", menu đa dạng từ Trà Ô Long Nhài Sữa, Ô Long Bơ, Ô Long Đào. Là điểm đến check-in cực hot của giới trẻ hiện nay.',
    address: '155 Quang Trung, P. Phan Thiết, TP. Tuyên Quang',
    phone: '0981 123 456',
    priceRange: '$$',
    priceText: '45.000đ - 65.000đ',
    rating: 4.8,
    totalReviews: 320,
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#2A9D8F', '#264653', '#F4A261'],
    openHours: 'T2-CN: 08:00 - 23:00',
    isOpen: true,
    isFeatured: true,
    isNew: true,
    tags: ['Trà Ô Long', 'Phê La', 'Check-in', 'Glamping', 'Trending 2026'],
    amenities: ['Wifi miễn phí', 'Máy lạnh', 'Gửi xe miễn phí', 'Không gian Glamping', 'Takeaway'],
    coordinates: { lat: 21.8201, lng: 105.2155 },
    social: { facebook: '', zalo: '0981123456', instagram: '' },
    menu: [
      { name: 'Trà Ô Long Nhài Sữa', price: '55.000đ' },
      { name: 'Ô Long Bơ', price: '60.000đ' },
      { name: 'Ô Long Đào', price: '55.000đ' }
    ],
    reviews: []
  },
  {
    id: 13,
    name: 'Katinat Saigon Kafe - Vincom Tuyên Quang',
    slug: 'katinat-vincom-tuyen-quang',
    category: 'an-uong',
    subCategory: 'Cafe & Trà sữa',
    description: 'Trải nghiệm cà phê phong cách đường phố Sài Gòn nhưng giữa lòng Tuyên Quang.',
    fullDescription: 'Katinat Saigon Kafe mang hơi thở Sài Thành vào từng tách cà phê. Không gian tối giản, phối màu trắng - xanh dương đặc trưng, phục vụ các dòng cà phê sữa đá, bạc xỉu và trà hoa quả tươi.',
    address: 'Tầng 1, Vincom Tuyên Quang',
    phone: '1900 633 66',
    priceRange: '$$',
    priceText: '35.000đ - 60.000đ',
    rating: 4.6,
    totalReviews: 280,
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#264653', '#2A9D8F', '#E9C46A'],
    openHours: 'T2-CN: 08:00 - 22:30',
    isOpen: true,
    isFeatured: true,
    isNew: true,
    tags: ['Cà phê Sài Gòn', 'Katinat', 'Vincom', 'Sang trọng', 'Trending 2026'],
    amenities: ['Wifi miễn phí', 'Máy lạnh', 'Gửi xe Vincom', 'Takeaway', 'Thanh toán thẻ'],
    coordinates: { lat: 21.8240, lng: 105.2165 },
    social: { facebook: 'https://facebook.com/katinat.tuyenquang', zalo: '', instagram: '' },
    menu: [
      { name: 'Cà phê sữa đá', price: '35.000đ' },
      { name: 'Bạc xỉu', price: '40.000đ' },
      { name: 'Trà vải tươi', price: '50.000đ' }
    ],
    reviews: []
  },
  {
    id: 14,
    name: 'Karaoke Sunny Tuyên Quang',
    slug: 'karaoke-sunny-tq',
    category: 'vui-choi',
    subCategory: 'Karaoke',
    description: 'Hệ thống âm thanh đỉnh cao, phòng hát sang trọng, phục vụ 24/7.',
    fullDescription: 'Sunny là hệ thống karaoke cao cấp nhất Tuyên Quang với phòng hát cách âm chuẩn phòng thu, dàn âm thanh JBL nhập khẩu và màn hình LED 4K siêu nét. Có đầy đủ phòng VIP, phòng gia đình và phòng đôi lãng mạn.',
    address: '88 Nguyễn Trãi, Phường Tân Quang, TP. Tuyên Quang',
    phone: '0207 388 9999',
    priceRange: '$$$',
    priceText: '150.000đ - 500.000đ/giờ',
    rating: 4.5,
    totalReviews: 560,
    images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#9B59B6', '#8E44AD', '#2C3E50'],
    openHours: 'T2-CN: 09:00 - 06:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Karaoke', 'Âm thanh đỉnh', 'Phòng VIP', '24/7'],
    amenities: ['Phòng cách âm', 'JBL', 'LED 4K', 'Phục vụ đồ uống', 'Gửi xe'],
    coordinates: { lat: 21.8228, lng: 105.2170 },
    social: { facebook: '', zalo: '02073889999', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 15,
    name: 'Billiards & Cafe Hoàng Gia',
    slug: 'billiards-hoang-gia-tq',
    category: 'vui-choi',
    subCategory: 'Billiards & Bowling',
    description: 'Câu lạc bộ billiards chuyên nghiệp với bàn thi đấu chuẩn quốc tế.',
    fullDescription: 'Hoàng Gia sở hữu 10 bàn billiards lỗ và 5 bàn snooker chuẩn thi đấu. Không gian rộng rãi, máy lạnh mát rượi, có quầy bar phục vụ đồ uống và đồ ăn nhẹ. Tổ chức giải đấu hàng tuần.',
    address: '45 Lê Lợi, Phường Minh Xuân, TP. Tuyên Quang',
    phone: '0973 456 789',
    priceRange: '$$',
    priceText: '50.000đ - 120.000đ/giờ',
    rating: 4.4,
    totalReviews: 340,
    images: ['https://images.unsplash.com/photo-1529543544282-ea994074d807?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#2C3E50', '#34495E', '#E74C3C'],
    openHours: 'T2-CN: 08:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Billiards', 'Snooker', 'Giải đấu', 'Cafe'],
    amenities: ['Bàn thi đấu', 'Quầy bar', 'Máy lạnh', 'Wifi'],
    coordinates: { lat: 21.8218, lng: 105.2148 },
    social: { facebook: '', zalo: '0973456789', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 16,
    name: 'Khu Vui Chơi Trẻ Em Happy Zone',
    slug: 'happy-zone-tq',
    category: 'vui-choi',
    subCategory: 'Khu vui chơi',
    description: 'Khu vui chơi trong nhà lớn nhất Tuyên Quang cho bé từ 1-12 tuổi.',
    fullDescription: 'Happy Zone là thiên đường giải trí cho trẻ em với khu nhà bóng khổng lồ, cầu trượt xoắn ốc, hồ bóng biển, khu leo núi trong nhà và góc sáng tạo. An toàn tuyệt đối với đệm lót và giám sát 24/7.',
    address: 'Tầng 2, TTTM Vincom Tuyên Quang',
    phone: '0988 234 567',
    priceRange: '$$',
    priceText: '50.000đ - 100.000đ/vé',
    rating: 4.6,
    totalReviews: 420,
    images: ['https://images.unsplash.com/photo-1596993100471-7ab3e14d4c0c?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#E74C3C', '#F39C12', '#3498DB'],
    openHours: 'T2-CN: 08:30 - 21:30',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Trẻ em', 'Vui chơi', 'Gia đình', 'Trong nhà'],
    amenities: ['Nhà bóng', 'Leo núi', 'Góc sáng tạo', 'Giám sát', 'Gửi xe'],
    coordinates: { lat: 21.8243, lng: 105.2169 },
    social: { facebook: '', zalo: '0988234567', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 17,
    name: 'Game Center - G-Center Tuyên Quang',
    slug: 'g-center-tq',
    category: 'vui-choi',
    subCategory: 'Game Center',
    description: 'Trung tâm game hiện đại với máy PS5, PC gaming và khu VR trải nghiệm.',
    fullDescription: 'G-Center là điểm đến của các game thủ Tuyên Quang với 20 dàn PC gaming cấu hình cao, 10 máy PS5, khu thực tế ảo VR và góc boardgame. Tổ chức giải đấu Liên Minh, Valorant hàng tháng.',
    address: '67 Quang Trung, Phường Tân Quang, TP. Tuyên Quang',
    phone: '0369 888 999',
    priceRange: '$$',
    priceText: '15.000đ - 50.000đ/giờ',
    rating: 4.3,
    totalReviews: 510,
    images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#1A1A2E', '#16213E', '#E94560'],
    openHours: 'T2-CN: 07:00 - 00:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Game', 'PS5', 'PC Gaming', 'VR', 'Giải đấu'],
    amenities: ['PC Gaming', 'PS5', 'VR', 'Boardgame', 'Quầy bar'],
    coordinates: { lat: 21.8212, lng: 105.2158 },
    social: { facebook: 'https://facebook.com/gcenter.tq', zalo: '0369888999', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 18,
    name: 'Phòng Trọ Sinh Viên - Khu Việt Mỹ',
    slug: 'phong-tro-viet-my',
    category: 'trang-phuc',
    subCategory: 'Quần áo',
    description: 'Cửa hàng thời trang second-hand chất lượng cao, giá rẻ cho sinh viên.',
    fullDescription: 'Chuyên kinh doanh quần áo second-hand nhập từ Nhật, Hàn, Âu Mỹ. Hàng luôn được phân loại, giặt sạch và là phẳng. Có cả phụ kiện, giày dép và túi xách second-hand.',
    address: 'Khu đô thị Việt Mỹ, Phường Phan Thiết, TP. Tuyên Quang',
    phone: '0977 111 222',
    priceRange: '$',
    priceText: '20.000đ - 150.000đ',
    rating: 4.4,
    totalReviews: 180,
    images: ['https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#F39C12', '#E67E22', '#2C3E50'],
    openHours: 'T2-CN: 08:00 - 21:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Second-hand', 'Thời trang', 'Sinh viên', 'Giá rẻ'],
    amenities: ['Thử đồ', 'Đổi trả 3 ngày', 'Giảm giá số lượng'],
    coordinates: { lat: 21.8265, lng: 105.2170 },
    social: { facebook: '', zalo: '0977111222', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 19,
    name: 'Tiệm Bánh Ngọt Mochi Mochi',
    slug: 'mochi-mochi-tq',
    category: 'an-uong',
    subCategory: 'Bánh & Dessert',
    description: 'Tiệm bánh Nhật Bản phong cách Kawaii, chuyên bánh mochi, dorayaki và trà đạo.',
    fullDescription: 'Mochi Mochi mang hương vị Nhật Bản đến Tuyên Quang với các loại bánh mochi nhân đậu đỏ, kem tươi, trái cây; dorayaki nhân matcha; và bánh cheesecake Nhật siêu mềm mịn. Không gian decor theo phong cách Kawaii dễ thương.',
    address: '23 Nguyễn Văn Cừ, Phường Minh Xuân, TP. Tuyên Quang',
    phone: '0903 456 789',
    priceRange: '$$',
    priceText: '25.000đ - 80.000đ',
    rating: 4.7,
    totalReviews: 290,
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#FFB5C2', '#FF9AA2', '#FFDAC1'],
    openHours: 'T2-CN: 08:00 - 21:30',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Bánh Nhật', 'Mochi', 'Dessert', 'Kawaii', 'Matcha'],
    amenities: ['Wifi', 'Máy lạnh', 'Takeaway', 'Góc check-in'],
    coordinates: { lat: 21.8222, lng: 105.2155 },
    social: { facebook: 'https://facebook.com/mochimochi.tq', zalo: '0903456789', instagram: '' },
    menu: [
      { name: 'Mochi kem xoài', price: '35.000đ' },
      { name: 'Dorayaki matcha', price: '30.000đ' },
      { name: 'Cheesecake Nhật', price: '55.000đ' },
      { name: 'Trà matcha latte', price: '45.000đ' }
    ],
    reviews: []
  },
  {
    id: 20,
    name: 'Bar & Pub 1990',
    slug: 'bar-1990-tq',
    category: 'an-uong',
    subCategory: 'Bar & Pub',
    description: 'Quán bar phong cách retro, nhạc sống mỗi tối, điểm hẹn cuối tuần của giới trẻ.',
    fullDescription: '1990 là quán bar mang phong cách retro những năm 90 với nội thất gỗ, đèn neon và bàn bi-a. Có nhạc sống acoustic vào tối thứ 6 và DJ vào cuối tuần. Menu đồ uống đa dạng từ cocktail, bia tươi đến rượu mạnh nhập khẩu.',
    address: '56 Trần Hưng Đạo, Phường Minh Xuân, TP. Tuyên Quang',
    phone: '0911 234 567',
    priceRange: '$$$',
    priceText: '100.000đ - 300.000đ',
    rating: 4.5,
    totalReviews: 380,
    images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#2C3E50', '#E74C3C', '#F39C12'],
    openHours: 'T2-CN: 17:00 - 02:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Bar', 'Pub', 'Nhạc sống', 'Cocktail', 'Đêm'],
    amenities: ['Nhạc sống', 'DJ', 'Bia tươi', 'Bàn bi-a', 'Khu VIP'],
    coordinates: { lat: 21.8245, lng: 105.2185 },
    social: { facebook: 'https://facebook.com/bar1990.tq', zalo: '0911234567', instagram: '' },
    menu: [
      { name: 'Bia tươi (pint)', price: '40.000đ' },
      { name: 'Cocktail Mojito', price: '80.000đ' },
      { name: 'Whisky Johnnie Walker', price: '250.000đ' }
    ],
    reviews: []
  },
  {
    id: 21,
    name: 'Phở Bò Tuyên Quang - Gánh Hàng 1978',
    slug: 'pho-bo-ganh-hang-1978',
    category: 'an-uong',
    subCategory: 'Ẩm thực đường phố',
    description: 'Quán phở gia truyền hơn 40 năm, nước dùng xương ống ninh 12 tiếng.',
    fullDescription: 'Gánh Hàng 1978 là quán phở lâu đời nhất Tuyên Quang còn giữ được hương vị truyền thống. Nước dùng được ninh từ xương ống bò và xương đuôi trong 12 tiếng, bánh phở làm thủ công, thịt bò tái chín mềm tan trong miệng.',
    address: 'Góc đường Bình Thuận - Nguyễn Trãi, TP. Tuyên Quang',
    phone: '',
    priceRange: '$',
    priceText: '30.000đ - 60.000đ',
    rating: 4.9,
    totalReviews: 1250,
    images: ['https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#D4A373', '#8B4513', '#F4A261'],
    openHours: 'T2-CN: 06:00 - 12:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Phở', 'Gia truyền', 'Sáng', 'Bò', 'Đặc sản'],
    amenities: ['Chỗ ngồi vỉa hè', 'Takeaway'],
    coordinates: { lat: 21.8238, lng: 105.2142 },
    social: { facebook: '', zalo: '', instagram: '' },
    menu: [
      { name: 'Phở bò tái', price: '35.000đ' },
      { name: 'Phở bò chín', price: '35.000đ' },
      { name: 'Phở tái chín', price: '40.000đ' },
      { name: 'Phở đặc biệt', price: '55.000đ' }
    ],
    reviews: []
  },
  {
    id: 22,
    name: 'Bún Cá Sông Lô - Cô Hoa',
    slug: 'bun-ca-co-hoa',
    category: 'an-uong',
    subCategory: 'Ẩm thực đường phố',
    description: 'Bún cá đặc sản Tuyên Quang, cá tươi sông Lô chiên giòn, nước dùng chua ngọt.',
    fullDescription: 'Quán bún cá của cô Hoa đã có tiếng hơn 20 năm. Cá lăng, cá trắm sông Lô được chiên giòn rụm, nước dùng nấu từ xương cá và me chua thanh. Ăn kèm rau sống, giá đỗ và thì là thơm nức.',
    address: '12 Bình Thuận, TP. Tuyên Quang',
    phone: '',
    priceRange: '$',
    priceText: '25.000đ - 40.000đ',
    rating: 4.7,
    totalReviews: 890,
    images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#E9C46A', '#F4A261', '#E76F51'],
    openHours: 'T2-CN: 06:30 - 13:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Bún cá', 'Đặc sản', 'Sông Lô', 'Sáng'],
    amenities: ['Chỗ ngồi', 'Takeaway'],
    coordinates: { lat: 21.8235, lng: 105.2140 },
    social: { facebook: '', zalo: '', instagram: '' },
    menu: [
      { name: 'Bún cá chiên giòn', price: '30.000đ' },
      { name: 'Bún cá đặc biệt', price: '40.000đ' }
    ],
    reviews: []
  },
  {
    id: 23,
    name: 'Chợ Đêm Tuyên Quang',
    slug: 'cho-dem-tuyen-quang',
    category: 'vui-choi',
    subCategory: 'Khu vui chơi',
    description: 'Chợ đêm cuối tuần sầm uất với ẩm thực đường phố, hàng lưu niệm và văn nghệ.',
    fullDescription: 'Chợ đêm Tuyên Quang họp vào tối thứ 7 và chủ nhật hàng tuần tại khu vực Quảng trường Nguyễn Tất Thành. Có hàng chục gian hàng ẩm thực đường phố, đồ lưu niệm, quần áo và các tiết mục văn nghệ đường phố.',
    address: 'Quảng trường Nguyễn Tất Thành, TP. Tuyên Quang',
    phone: '',
    priceRange: '$',
    priceText: 'Miễn phí vào cửa',
    rating: 4.5,
    totalReviews: 670,
    images: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#E74C3C', '#F39C12', '#2C3E50'],
    openHours: 'T7-CN: 18:00 - 23:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Chợ đêm', 'Ẩm thực', 'Văn nghệ', 'Cuối tuần'],
    amenities: ['Ẩm thực đường phố', 'Hàng lưu niệm', 'Văn nghệ', 'Bãi đỗ xe'],
    coordinates: { lat: 21.8218, lng: 105.2135 },
    social: { facebook: '', zalo: '', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 24,
    name: 'Homestay Bản Tày - Thượng Lâm',
    slug: 'homestay-ban-tay-thuong-lam',
    category: 'du-lich',
    subCategory: 'Khách sạn & Homestay',
    description: 'Homestay truyền thống người Tày giữa lòng Na Hang, trải nghiệm văn hóa bản địa.',
    fullDescription: 'Nằm giữa thung lũng xanh mướt của huyện Lâm Bình, Homestay Bản Tày Thượng Lâm mang đến trải nghiệm ở cùng người dân tộc Tày. Nhà sàn gỗ truyền thống, ăn cơm lam, uống rượu ngô và tham gia múa hát Then.',
    address: 'Thôn Thượng Lâm, xã Lâm Bình, huyện Na Hang, tỉnh Tuyên Quang',
    phone: '0966 123 456',
    priceRange: '$$',
    priceText: '200.000đ - 500.000đ/đêm',
    rating: 4.8,
    totalReviews: 340,
    images: ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#5A7D59', '#3E5C3D', '#C5A059'],
    openHours: 'Nhận phòng 14:00 - Trả phòng 12:00',
    isOpen: true,
    isFeatured: false,
    isNew: true,
    tags: ['Homestay', 'Bản Tày', 'Văn hóa', 'Na Hang', 'Thiên nhiên'],
    amenities: ['Nhà sàn', 'Ăn sáng', 'Cho thuê xe', 'Wifi', 'Điều hòa'],
    coordinates: { lat: 22.35, lng: 105.39 },
    social: { facebook: '', zalo: '0966123456', instagram: '' },
    menu: [],
    reviews: []
  },
  {
    id: 25,
    name: 'Khách Sạn Mường Thanh Tuyên Quang',
    slug: 'muong-thanh-tuyen-quang',
    category: 'du-lich',
    subCategory: 'Khách sạn & Homestay',
    description: 'Khách sạn 4 sao tiêu chuẩn quốc tế ngay trung tâm thành phố.',
    fullDescription: 'Mường Thanh Tuyên Quang là khách sạn cao cấp nhất tỉnh với 120 phòng nghỉ tiêu chuẩn 4 sao. Có nhà hàng, hồ bơi, phòng gym, spa và trung tâm hội nghị sức chứa 500 người.',
    address: 'Đường Trần Hưng Đạo, Phường Minh Xuân, TP. Tuyên Quang',
    phone: '0207 388 8888',
    priceRange: '$$$',
    priceText: '800.000đ - 2.500.000đ/đêm',
    rating: 4.6,
    totalReviews: 780,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'],
    imageColors: ['#2C3E50', '#3498DB', '#BDC3C7'],
    openHours: 'Nhận phòng 14:00 - Trả phòng 12:00',
    isOpen: true,
    isFeatured: true,
    isNew: true,
    tags: ['Khách sạn', '4 sao', 'Hồ bơi', 'Spa', 'Trung tâm'],
    amenities: ['Hồ bơi', 'Spa', 'Gym', 'Nhà hàng', 'Hội nghị', 'Bãi đỗ xe'],
    coordinates: { lat: 21.8240, lng: 105.2180 },
    social: { facebook: 'https://facebook.com/muongthanh.tq', zalo: '02073888888', instagram: '' },
    menu: [],
    reviews: []
  }
];

// ─── HỢP NHẤT DỮ LIỆU ───────────────────────────────────────
let PLACES = [...BASE_PLACES, ...TOURISM_PLACES];

// ─── HÀM TRUY VẤN ───────────────────────────────────────────
function getPlacesByCategory(categoryId) {
  return PLACES.filter(p => p.category === categoryId);
}

function getPlaceById(id) {
  const n = Number(id);
  const searchId = Number.isNaN(n) ? id : n;
  return PLACES.find(p => p.id === searchId);
}

function getPlaceBySlug(slug) {
  return PLACES.find(p => p.slug === slug);
}

function getFeaturedPlaces() {
  return PLACES.filter(p => p.isFeatured);
}

function getNewPlaces(limit) {
  const result = PLACES.filter(p => p.isNew);
  return limit ? result.slice(0, limit) : result;
}

function searchPlaces(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PLACES.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.description.toLowerCase().includes(q) ||
    p.address.toLowerCase().includes(q)
  );
}

function getPlacesBySubCategory(categoryId, subCategory) {
  return PLACES.filter(p => p.category === categoryId && p.subCategory === subCategory);
}

function getTopRatedPlaces(limit = 10) {
  return [...PLACES].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

function getRelatedPlaces(place, limit = 4) {
  if (!place) return [];
  return PLACES.filter(p =>
    p.id !== place.id &&
    (p.category === place.category || p.tags.some(t => place.tags?.includes(t)))
  ).slice(0, limit);
}

// ─── SETTER (cho Firebase data) ──────────────────────────────
function setPlaces(newPlaces) {
  PLACES = newPlaces;
}

// ─── APPLY REVIEW TO PLACE ───────────────────────────────────
function applyNewReviewToPlace(placeId, newRating) {
  const place = getPlaceById(placeId);
  if (!place) return null;
  
  const oldTotal = place.totalReviews || 0;
  const oldRating = place.rating || 0;
  const newTotal = oldTotal + 1;
  const newAvg = Number(((oldRating * oldTotal + newRating) / newTotal).toFixed(1));
  
  place.rating = newAvg;
  place.totalReviews = newTotal;
  
  return { rating: newAvg, totalReviews: newTotal };
}

// ─── LẤY GỢI Ý THEO GIỜ SINH HỌC ──────────────────────────────
function getPlacesByTimeOfDay(limit = 4) {
  const currentHour = new Date().getHours();
  let recommendedTags = [];
  let greeting = "";

  if (currentHour >= 5 && currentHour < 11) {
    greeting = "Chào buổi sáng!";
    recommendedTags = ['sáng', 'phở', 'bún cá', 'cafe', 'cà phê'];
  } else if (currentHour >= 11 && currentHour < 14) {
    greeting = "Trưa rồi, đi ăn thôi!";
    recommendedTags = ['gia đình', 'cá sông', 'nhà hàng'];
  } else if (currentHour >= 14 && currentHour < 17) {
    greeting = "Chiều nhẹ nhàng!";
    recommendedTags = ['cafe', 'dessert', 'bánh ngọt', 'sống ảo'];
  } else {
    greeting = "Tối nay đi đâu?";
    recommendedTags = ['nhậu', 'bar', 'pub', 'chợ đêm', 'karaoke', 'lẩu nướng'];
  }

  const results = PLACES.filter(p => 
    p.tags.some(t => recommendedTags.includes(t.toLowerCase())) || 
    recommendedTags.some(tag => p.name.toLowerCase().includes(tag))
  );
  
  // Shuffle or just sort by rating
  results.sort((a, b) => b.rating - a.rating);
  
  return {
    greeting,
    timeOfDay: currentHour >= 5 && currentHour < 18 ? 'day' : 'night',
    places: results.slice(0, limit)
  };
}

// ─── EXPORT ──────────────────────────────────────────────────
export {
  CATEGORIES,
  SUB_CATEGORIES,
  PLACES,
  getPlacesByCategory,
  getPlaceById,
  getPlaceBySlug,
  getFeaturedPlaces,
  getNewPlaces,
  searchPlaces,
  getPlacesBySubCategory,
  getTopRatedPlaces,
  getRelatedPlaces,
  setPlaces,
  applyNewReviewToPlace,
  getPlacesByTimeOfDay
};
