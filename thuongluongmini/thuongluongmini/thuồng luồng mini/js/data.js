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
  {
    id: 12,
    name: 'Phê La Tuyên Quang - Quang Trung',
    category: 'an-uong',
    subCategory: ['Cafe & Trà sữa'],
    rating: 4.8,
    reviewsCount: 320,
    address: '155 Quang Trung, P. Phan Thiết, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'],
    priceRange: '45,000đ - 65,000đ',
    openTime: '08:00',
    closeTime: '23:00',
    status: 'Đang mở cửa',
    phone: '0981 123 456',
    mapLink: 'https://goo.gl/maps/phela-tuyen-quang',
    lat: 21.8201,
    lng: 105.2155,
    description: 'Thương hiệu ô long đặc sản Đà Lạt Phê La đã chính thức có mặt tại Tuyên Quang từ đầu năm 2026. Không gian rộng rãi, đậm chất cắm trại "Glamping", menu đa dạng từ Trà Ô Long Nhài Sữa, Ô Long Bơ, Ô Long Đào. Là điểm đến check-in cực hot của giới trẻ hiện nay.',
    features: ['Wifi miễn phí', 'Máy lạnh', 'Gửi xe miễn phí', 'Không gian Glamping', 'Takeaway'],
    tags: ['Trà Ô Long', 'Phê La', 'Check-in', 'Glamping', 'Trending 2026'],
    menu: [],
    reviews: []
  },
  {
    id: 13,
    name: 'Katinat Saigon Kafe - Vincom Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Cafe & Trà sữa'],
    rating: 4.7,
    reviewsCount: 258,
    address: 'Tầng 1, Vincom Plaza Tuyên Quang, 260 Quang Trung, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80'],
    priceRange: '45,000đ - 70,000đ',
    openTime: '07:30',
    closeTime: '22:30',
    status: 'Đang mở cửa',
    phone: '0981 234 567',
    mapLink: 'https://goo.gl/maps/katinat-tuyen-quang',
    lat: 21.8155,
    lng: 105.2100,
    description: 'Trải nghiệm cà phê phong cách đường phố Sài Gòn nhưng mang hơi thở hiện đại ngay tại Tuyên Quang. Quán nổi tiếng với Cà phê Sữa Tươi, Trà Đào Hồng Đài và thiết kế kiến trúc vòm cung độc đáo.',
    features: ['Wifi miễn phí', 'Máy lạnh', 'View kính', 'Chỗ đậu ô tô'],
    tags: ['Katinat', 'Cafe sang chảnh', 'Vincom'],
    menu: [],
    reviews: []
  },
  {
    id: 14,
    name: 'Haidilao Hot Pot - Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Nhà hàng', 'Lẩu'],
    rating: 4.9,
    reviewsCount: 450,
    address: 'Tầng 4, Vincom Plaza Tuyên Quang, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?auto=format&fit=crop&w=600&q=80'],
    priceRange: '250,000đ - 500,000đ',
    openTime: '10:00',
    closeTime: '23:30',
    status: 'Đang mở cửa',
    phone: '0207 3888 999',
    mapLink: 'https://goo.gl/maps/haidilao-tuyen-quang',
    lat: 21.8155,
    lng: 105.2100,
    description: 'Thương hiệu lẩu đình đám với dịch vụ 5 sao. Không chỉ thưởng thức nước lẩu cà chua, lẩu cay Tứ Xuyên trứ danh, bạn còn được làm nail, in ảnh, xem múa mì và xem biến diện (đổi mặt) miễn phí.',
    features: ['Làm nail miễn phí', 'Múa mì', 'Khu vui chơi trẻ em', 'Ghế massage'],
    tags: ['Haidilao', 'Lẩu', 'Dịch vụ 5 sao', 'Trending'],
    menu: [],
    reviews: []
  },
  {
    id: 15,
    name: 'Tổ hợp giải trí GenZ Center (Khu VR & Arcade mới)',
    category: 'vui-choi',
    subCategory: ['Khu vui chơi', 'Game Center'],
    rating: 4.8,
    reviewsCount: 180,
    address: 'Khu đô thị Kim Phú, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'],
    priceRange: '50,000đ - 200,000đ',
    openTime: '09:00',
    closeTime: '23:00',
    status: 'Đang mở cửa',
    phone: '0981 999 888',
    mapLink: 'https://goo.gl/maps/genz-center',
    lat: 21.8000,
    lng: 105.2200,
    description: 'Vừa khai trương tháng 4/2026, đây là khu vui chơi thực tế ảo (VR) lớn nhất miền núi phía Bắc. Trang bị hàng chục máy chơi game thùng (Arcade), máy gắp gấu, phòng nhảy Audition và khu bắn súng laser.',
    features: ['Game VR', 'Gắp gấu', 'Phòng lạnh', 'Food court'],
    tags: ['Giải trí', 'GenZ', 'Thực tế ảo', 'Mới mở 2026'],
    menu: [],
    reviews: []
  },
  {
    id: 16,
    name: 'Mixue - Bình Thuận Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Bánh & Dessert', 'Cafe & Trà sữa'],
    rating: 4.6,
    reviewsCount: 890,
    address: '22 Bình Thuận, P. Tân Quang, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1570197781417-0a82375c9371?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1570197781417-0a82375c9371?auto=format&fit=crop&w=600&q=80'],
    priceRange: '10,000đ - 30,000đ',
    openTime: '08:00',
    closeTime: '23:00',
    status: 'Đang mở cửa',
    phone: '0981 444 555',
    mapLink: 'https://goo.gl/maps/mixue-binh-thuan',
    lat: 21.8210,
    lng: 105.2150,
    description: 'Thương hiệu kem tươi và trà sữa ngon - bổ - rẻ quen thuộc với kem ốc quế 10k, nước chanh giã tay 15k. Chi nhánh Bình Thuận luôn tấp nập học sinh sinh viên.',
    features: ['Bán mang đi', 'Ngồi vỉa hè', 'Giá rẻ'],
    tags: ['Mixue', 'Kem 10k', 'Bình dân'],
    menu: [],
    reviews: []
  },
  {
    id: 17,
    name: 'Cafe Muối Chú Long - Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Cafe & Trà sữa'],
    rating: 4.5,
    reviewsCount: 310,
    address: '88 Tân Trào, P. Phan Thiết, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'],
    priceRange: '20,000đ - 35,000đ',
    openTime: '06:30',
    closeTime: '22:00',
    status: 'Đang mở cửa',
    phone: '0981 666 777',
    mapLink: 'https://goo.gl/maps/cafe-muoi-chu-long',
    lat: 21.8220,
    lng: 105.2130,
    description: 'Cơn sốt cafe muối trứ danh đã đổ bộ Tuyên Quang. Vị đắng nhẹ của cafe kết hợp với lớp kem mặn mặn béo ngậy tạo nên hương vị bùng nổ, dễ gây nghiện.',
    features: ['Takeaway', 'Vỉa hè chill', 'Phục vụ nhanh'],
    tags: ['Cà phê muối', 'Bắt trend'],
    menu: [],
    reviews: []
  },
  {
    id: 18,
    name: 'Rạp chiếu phim Lotte Cinema Tuyên Quang',
    category: 'vui-choi',
    subCategory: ['Rạp phim'],
    rating: 4.8,
    reviewsCount: 520,
    address: 'Tầng 5, Vincom Plaza, 260 Quang Trung, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'],
    priceRange: '60,000đ - 120,000đ',
    openTime: '08:30',
    closeTime: '23:30',
    status: 'Đang mở cửa',
    phone: '0207 3999 888',
    mapLink: 'https://goo.gl/maps/lotte-cinema-tq',
    lat: 21.8155,
    lng: 105.2100,
    description: 'Cụm rạp phim hiện đại chuẩn quốc tế. Hệ thống âm thanh Dolby Atmos, màn hình sắc nét và ghế ngồi thoải mái. Cập nhật liên tục các bom tấn mới nhất của 2026.',
    features: ['Màn hình 3D', 'Ghế đôi (Sweetbox)', 'Phòng chờ sang trọng', 'Mua vé online'],
    tags: ['Chiếu phim', 'Lotte', 'Vincom'],
    menu: [],
    reviews: []
  },
  {
    id: 19,
    name: 'Doolly Studio - Thuê Cổ Phục & Hanbok',
    category: 'trang-phuc',
    subCategory: ['Thuê trang phục'],
    rating: 4.9,
    reviewsCount: 150,
    address: 'Ngõ 15 Quang Trung, P. Phan Thiết, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80'],
    priceRange: '150,000đ - 300,000đ/ngày',
    openTime: '08:00',
    closeTime: '21:00',
    status: 'Đang mở cửa',
    phone: '0988 111 222',
    mapLink: 'https://goo.gl/maps/doolly-studio',
    lat: 21.8205,
    lng: 105.2160,
    description: 'Studio cho thuê trang phục lớn nhất Tuyên Quang hiện nay. Chuyên cung cấp các mẫu Việt Phục (Nhật Bình, Áo Tấc), Hanbok Hàn Quốc, Kimono Nhật Bản để phục vụ nhu cầu sống ảo của giới trẻ tại các địa điểm du lịch.',
    features: ['Hỗ trợ trang điểm', 'Chụp ảnh sự kiện', 'Trang phục mới 100%'],
    tags: ['Cổ phục', 'Sống ảo', 'Make-up'],
    menu: [],
    reviews: []
  },
  {
    id: 20,
    name: 'Bò Tơ Quán Mộc - Chi nhánh Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Nhà hàng', 'Quán ăn'],
    rating: 4.7,
    reviewsCount: 280,
    address: 'Đường ven hồ Công viên Hoàng Hoa Thám, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1544025162-81111409f029?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1544025162-81111409f029?auto=format&fit=crop&w=600&q=80'],
    priceRange: '150,000đ - 250,000đ',
    openTime: '10:00',
    closeTime: '23:00',
    status: 'Đang mở cửa',
    phone: '0977 888 999',
    mapLink: 'https://goo.gl/maps/bo-to-quan-moc',
    lat: 21.8250,
    lng: 105.2200,
    description: 'Nhà hàng bò tơ thiết kế theo phong cách hoài cổ thập niên 80. Các món nổi bật: Bò tơ cuốn bánh tráng, Bê chao Mộc Châu, Lẩu đuôi bò. Thích hợp đi ăn gia đình, tụ tập công ty.',
    features: ['Không gian hoài cổ', 'Phòng VIP riêng', 'Chỗ đỗ ô tô rộng', 'Ghế trẻ em'],
    tags: ['Nhậu', 'Gia đình', 'Bò tơ'],
    menu: [],
    reviews: []
  },
  {
    id: 21,
    name: 'Tiệm Trà Chanh Chóp Chép (Ver 2026)',
    category: 'an-uong',
    subCategory: ['Cafe & Trà sữa', 'Ẩm thực đường phố'],
    rating: 4.5,
    reviewsCount: 420,
    address: 'Khu vực Quảng trường Nguyễn Tất Thành, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80'],
    priceRange: '15,000đ - 45,000đ',
    openTime: '18:00',
    closeTime: '23:30',
    status: 'Đang mở cửa',
    phone: '0909 123 456',
    mapLink: 'https://goo.gl/maps/tra-chanh-chop-chep',
    lat: 21.8150,
    lng: 105.2150,
    description: 'Phiên bản nâng cấp 2026 với menu siêu xịn xò: Trà chanh giã tay sả tắc, trà dâu tằm kem cheese, cá viên chiên mắm tỏi. Nơi tụ tập đông đúc nhất vào mỗi buổi tối của thanh niên Tuyên Quang.',
    features: ['Ngồi vỉa hè mát mẻ', 'Ăn vặt đa dạng', 'Mở khuya'],
    tags: ['Trà chanh', 'Ăn vặt', 'Quảng trường'],
    menu: [],
    reviews: []
  },
  {
    id: 22,
    name: 'Cửa hàng tiện lợi GS25 - Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Ẩm thực đường phố'],
    rating: 4.4,
    reviewsCount: 650,
    address: 'Ngã tư Quang Trung - Bình Thuận, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1576082404396-d4f1cd3e658e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1576082404396-d4f1cd3e658e?auto=format&fit=crop&w=600&q=80'],
    priceRange: '15,000đ - 80,000đ',
    openTime: '00:00',
    closeTime: '23:59',
    status: 'Đang mở cửa',
    phone: '1900 1234',
    mapLink: 'https://goo.gl/maps/gs25-tq',
    lat: 21.8180,
    lng: 105.2140,
    description: 'Cửa hàng tiện lợi Hàn Quốc mở cửa 24/7 đầu tiên tại Tuyên Quang. Nổi tiếng với Tteokbokki nấu tại chỗ, mì cay béo ngậy và các loại nước ép trái cây. Không gian có bàn ghế ngồi ăn uống tại chỗ mát mẻ.',
    features: ['Mở cửa 24/7', 'Wifi miễn phí', 'Máy lạnh', 'Nấu ăn tại chỗ'],
    tags: ['GS25', 'Tiện lợi', '24/7', 'Ăn đêm'],
    menu: [],
    reviews: []
  },
  {
    id: 23,
    name: 'Pizza 4P\'s - Khu shophouse Vincom',
    category: 'an-uong',
    subCategory: ['Nhà hàng'],
    rating: 4.9,
    reviewsCount: 380,
    address: 'Khu Shophouse, Vincom Plaza, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'],
    priceRange: '200,000đ - 600,000đ',
    openTime: '10:00',
    closeTime: '22:30',
    status: 'Đang mở cửa',
    phone: '1900 6043',
    mapLink: 'https://goo.gl/maps/pizza-4ps-tq',
    lat: 21.8153,
    lng: 105.2105,
    description: 'Thương hiệu Pizza chuẩn Nhật Bản đình đám. Trải nghiệm Pizza nướng củi với phô mai Burrata làm thủ công tươi mới mỗi ngày. Không gian sang trọng, dịch vụ OMOTENASHI tận tâm.',
    features: ['Nướng củi', 'Phòng lạnh', 'Dịch vụ 5 sao'],
    tags: ['Pizza', 'Sang trọng', 'Pizza 4Ps', 'Dát vàng'],
    menu: [],
    reviews: []
  },
  {
    id: 24,
    name: 'Mì Cay Sasin - Chi nhánh Mới 2026',
    category: 'an-uong',
    subCategory: ['Quán ăn'],
    rating: 4.5,
    reviewsCount: 450,
    address: 'Đường Phan Thiết, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80'],
    priceRange: '45,000đ - 70,000đ',
    openTime: '08:00',
    closeTime: '22:30',
    status: 'Đang mở cửa',
    phone: '0966 555 444',
    mapLink: 'https://goo.gl/maps/sasin-tq',
    lat: 21.8120,
    lng: 105.2110,
    description: 'Chi nhánh Sasin mới toanh rộng gấp đôi chi nhánh cũ. Thử thách mì cay 7 cấp độ phiên bản Hàn Quốc siêu cuốn, kèm kimbap chiên và takoyaki đậm vị.',
    features: ['Máy lạnh', 'Thử thách 7 cấp độ', 'Bán mang về'],
    tags: ['Mì cay', 'Hàn Quốc', 'Sinh viên'],
    menu: [],
    reviews: []
  },
  {
    id: 25,
    name: 'Khu câu cá giải trí sinh thái Sông Lô',
    category: 'vui-choi',
    subCategory: ['Khu vui chơi'],
    rating: 4.6,
    reviewsCount: 120,
    address: 'Dọc bờ kè Sông Lô, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=600&q=80'],
    priceRange: '100,000đ - 300,000đ',
    openTime: '07:00',
    closeTime: '20:00',
    status: 'Đang mở cửa',
    phone: '0912 345 678',
    mapLink: 'https://goo.gl/maps/cau-ca-song-lo',
    lat: 21.8100,
    lng: 105.2250,
    description: 'Địa điểm câu cá sinh thái cuối tuần siêu hot năm 2026. Có dịch vụ nướng cá ngay tại chòi, thích hợp cho các gia đình hoặc nhóm bạn nam đi nhậu, thư giãn cuối tuần.',
    features: ['Cho thuê cần câu', 'Chòi nghỉ mát', 'Nướng BBQ', 'Bãi đỗ xe'],
    tags: ['Câu cá', 'Dã ngoại', 'Cuối tuần'],
    menu: [],
    reviews: []
  },
  {
    id: 26,
    name: 'Cheese Coffee - Cửa hàng flagship Tuyên Quang',
    category: 'an-uong',
    subCategory: ['Cafe & Trà sữa'],
    rating: 4.8,
    reviewsCount: 510,
    address: 'Đại lộ Tân Trào, TP. Tuyên Quang',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80'],
    priceRange: '49,000đ - 79,000đ',
    openTime: '07:00',
    closeTime: '23:00',
    status: 'Đang mở cửa',
    phone: '0207 222 333',
    mapLink: 'https://goo.gl/maps/cheese-coffee',
    lat: 21.8190,
    lng: 105.2180,
    description: 'Cheese Coffee với phong cách Industrial pha chút nghệ thuật phục hưng Châu Âu cực ngầu. Trà sữa nguyên lá kem phô mai béo ngậy làm mưa làm gió cộng đồng mạng năm 2026.',
    features: ['Không gian rộng 3 tầng', 'Góc sống ảo cực chất', 'Wifi mạnh'],
    tags: ['Cheese Coffee', 'Sống ảo', 'Trà sữa kem phô mai', 'Flagship'],
    menu: [],
    reviews: []
  }
];


// ─── HÀM TRUY VẤN & TÌM KIẾM ───────────────────────────────

// Mảng gộp tất cả địa điểm (Sẽ được ghi đè bởi Firebase nếu có)
export let PLACES = [...BASE_PLACES, ...TOURISM_PLACES];

export function setPlaces(newPlaces) {
    PLACES = newPlaces;
}

/**
 * Cập nhật rating trung bình sau review mới (cả bộ nhớ & hiển thị)
 */
export function applyNewReviewToPlace(placeId, reviewRating) {
    const place = getPlaceById(placeId);
    if (!place) return null;

    const oldTotal = place.totalReviews || 0;
    const oldRating = place.rating || 0;
    const newTotal = oldTotal + 1;
    const newRating = Math.round((((oldRating * oldTotal) + reviewRating) / newTotal) * 10) / 10;

    place.totalReviews = newTotal;
    place.rating = newRating;

    return { rating: newRating, totalReviews: newTotal };
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
  if (id == null || id === '') return undefined;
  const numId = Number(id);
  const hasNum = !Number.isNaN(numId);
  return PLACES.find(place => {
    if (place.id === id) return true;
    if (hasNum && Number(place.id) === numId) return true;
    return String(place.id) === String(id);
  });
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
  const totalReviews = PLACES.reduce((sum, p) => sum + (p.totalReviews || 0), 0);
  const avgRating = totalPlaces > 0 ? (PLACES.reduce((sum, p) => sum + (p.rating || 0), 0) / totalPlaces).toFixed(1) : '0.0';

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
