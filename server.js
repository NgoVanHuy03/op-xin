const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Data
const brands = [
  { id: 'iphone', name: 'iPhone', icon: '🍎', models: ['iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15','iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14','iPhone 14 Plus','iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13','iPhone SE 3'] },
  { id: 'samsung', name: 'Samsung', icon: '📱', models: ['Galaxy S24 Ultra','Galaxy S24+','Galaxy S24','Galaxy S23 Ultra','Galaxy S23','Galaxy Z Fold 5','Galaxy Z Flip 5','Galaxy A54','Galaxy A34'] },
  { id: 'xiaomi', name: 'Xiaomi', icon: '🚀', models: ['Xiaomi 14 Ultra','Xiaomi 14','Xiaomi 13 Ultra','Redmi Note 13 Pro+','Redmi Note 13','POCO X6 Pro','POCO F6'] },
  { id: 'oppo', name: 'OPPO', icon: '💎', models: ['Find X7 Ultra','Reno 11 Pro','Reno 11','A79 5G','A59'] },
  { id: 'vivo', name: 'Vivo', icon: '✨', models: ['X100 Pro','X100','V30 Pro','V30','Y200','Y36'] },
  { id: 'realme', name: 'Realme', icon: '⚡', models: ['GT5 Pro','GT Neo6','12 Pro+','12','C67','C55'] },
  { id: 'oneplus', name: 'OnePlus', icon: '🔥', models: ['12','12R','Nord CE4','Nord 3','Open'] },
  { id: 'google', name: 'Google Pixel', icon: '🎯', models: ['Pixel 8 Pro','Pixel 8','Pixel 8a','Pixel 7a','Pixel Fold'] },
  { id: 'nothing', name: 'Nothing', icon: '🔘', models: ['Phone (2)','Phone (2a)','Phone (1)'] },
  { id: 'sony', name: 'Sony', icon: '🎮', models: ['Xperia 1 VI','Xperia 5 V','Xperia 10 V'] },
  { id: 'huawei', name: 'Huawei', icon: '🔴', models: ['Pura 70 Ultra','Pura 70 Pro','Mate 60 Pro','Nova 12','Enjoy 70'] },
  { id: 'tecno', name: 'Tecno', icon: '🌟', models: ['Phantom V Fold 2','Phantom V Flip 2','Camon 30 Pro','Spark 20 Pro'] },
];

const caseTypes = [
  { id: 'clear', name: 'Trong Suốt', icon: '🫧', desc: 'Minh bạch, khoe vẻ máy', color: '#e0f7fa' },
  { id: 'matte', name: 'Nhám Cao Cấp', icon: '🖤', desc: 'Sang trọng, chống bám vân tay', color: '#263238' },
  { id: 'silicone', name: 'Silicone Mềm', icon: '🫠', desc: 'Nhẹ nhàng, bảo vệ toàn diện', color: '#f48fb1' },
  { id: 'leather', name: 'Da Thật', icon: '👜', desc: 'Đẳng cấp, sang trọng', color: '#8d6e63' },
  { id: 'magsafe', name: 'MagSafe', icon: '🧲', desc: 'Sạc không dây, tiện lợi', color: '#7c4dff' },
  { id: 'armor', name: 'Giáp Bảo Vệ', icon: '🛡️', desc: 'Chống sốc, chống rơi', color: '#ff6f00' },
  { id: 'printed', name: 'In Hình', icon: '🎨', desc: 'Cá nhân hóa, độc đáo', color: '#e91e63' },
  { id: 'carbon', name: 'Carbon Fiber', icon: '🏁', desc: 'Nhẹ, cứng, thể thao', color: '#37474f' },
  { id: 'wood', name: 'Gỗ Tự Nhiên', icon: '🪵', desc: 'Ấm áp, mộc mạc', color: '#a1887f' },
  { id: 'glitter', name: 'Glitter Kim Tuyến', icon: '✨', desc: 'Lấp lánh, quyến rũ', color: '#ffd54f' },
];

const reviews = [
  { name: 'Minh Anh', phone: 'iPhone 15 Pro', type: 'Nhám Cao Cấp', rating: 5, text: 'Ốp xịn thật! Cầm rất êm tay, không bám vân tay. Màu nhám xịn hơn ảnh.', date: '2026-04-28' },
  { name: 'Hoàng Nam', phone: 'Galaxy S24 Ultra', type: 'Giáp Bảo Vệ', rating: 5, text: 'Rơi từ bàn xuống sàn mà máy không xước. Giáp thật sự!', date: '2026-04-25' },
  { name: 'Thu Hà', phone: 'iPhone 14', type: 'In Hình', rating: 4, text: 'In hình rất nét, màu không bị phai sau 3 tháng dùng.', date: '2026-04-20' },
  { name: 'Đức Anh', phone: 'Xiaomi 14', type: 'Carbon Fiber', rating: 5, text: 'Nhẹ hơn expected, cứng cáp, trông thể thao cực. Recommend!', date: '2026-04-18' },
  { name: 'Ngọc Trâm', phone: 'OPPO Reno 11', type: 'Glitter Kim Tuyến', rating: 5, text: 'Lấp lánh dưới nắng quá đẹp! Bạn bè ai cũng hỏi mua ở đâu 😍', date: '2026-04-15' },
  { name: 'Văn Hùng', phone: 'OnePlus 12', type: 'Da Thật', rating: 4, text: 'Da mềm, khâu tỉ mỉ. Cầm sang trọng hơn hẳn ốp nhựa.', date: '2026-04-12' },
  { name: 'Thùy Linh', phone: 'iPhone 15 Pro Max', type: 'MagSafe', rating: 5, text: 'Sạc MagSafe dính chặt, ốp mỏng nhẹ mà vẫn bảo vệ tốt.', date: '2026-04-10' },
  { name: 'Quốc Bảo', phone: 'Pixel 8 Pro', type: 'Trong Suốt', icon: '🫧', rating: 4, text: 'Nhìn thấy lưng máy mà vẫn bảo vệ. Không ố vàng sau 2 tháng.', date: '2026-04-08' },
  { name: 'Hải Đăng', phone: 'Galaxy Z Flip 5', type: 'Silicone Mềm', rating: 4, text: 'Vừa vặn, không cộm. Gập mở vẫn thoải mái.', date: '2026-04-05' },
  { name: 'Phương Vy', phone: 'Nothing Phone 2', type: 'Trong Suốt', rating: 5, text: 'Ốp trong suốt + đèn Glyph = đẹp xuất sắc!', date: '2026-04-02' },
  { name: 'Thanh Tùng', phone: 'Vivo X100 Pro', type: 'Nhám Cao Cấp', rating: 4, text: 'Chất lượng tốt, giá hợp lý. Giao hàng nhanh.', date: '2026-03-28' },
  { name: 'Mai Linh', phone: 'Realme GT5 Pro', type: 'Giáp Bảo Vệ', rating: 5, text: 'Ốp giáp nhưng không quá cồng kềnh. Bảo vệ camera tốt.', date: '2026-03-25' },
];

// Generate products
const products = [];
let pid = 1;
brands.forEach(brand => {
  brand.models.forEach(model => {
    caseTypes.forEach(ct => {
      const basePrice = ct.id === 'leather' ? 350000 : ct.id === 'carbon' ? 300000 : ct.id === 'armor' ? 250000 : ct.id === 'magsafe' ? 280000 : ct.id === 'wood' ? 320000 : ct.id === 'glitter' ? 200000 : ct.id === 'printed' ? 180000 : ct.id === 'matte' ? 220000 : ct.id === 'silicone' ? 120000 : 150000;
      const brandMultiplier = brand.id === 'iphone' ? 1.3 : brand.id === 'samsung' ? 1.1 : brand.id === 'google' ? 1.15 : brand.id === 'oneplus' ? 1.05 : 1;
      const price = Math.round(basePrice * brandMultiplier / 1000) * 1000;
      products.push({
        id: pid++,
        brand: brand.id,
        brandName: brand.name,
        model,
        typeId: ct.id,
        typeName: ct.name,
        typeIcon: ct.icon,
        price,
        rating: (4 + Math.random()).toFixed(1),
        sold: Math.floor(Math.random() * 500) + 10,
        image: `case-${ct.id}`
      });
    });
  });
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/brands', (req, res) => res.json(brands));
app.get('/api/types', (req, res) => res.json(caseTypes));
app.get('/api/reviews', (req, res) => res.json(reviews));

app.get('/api/products', (req, res) => {
  let result = [...products];
  const { brand, type, search, sort, minPrice, maxPrice } = req.query;
  if (brand) result = result.filter(p => p.brand === brand);
  if (type) result = result.filter(p => p.typeId === type);
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(p => p.model.toLowerCase().includes(s) || p.brandName.toLowerCase().includes(s) || p.typeName.toLowerCase().includes(s));
  }
  if (minPrice) result = result.filter(p => p.price >= +minPrice);
  if (maxPrice) result = result.filter(p => p.price <= +maxPrice);
  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') result.sort((a,b) => b.rating - a.rating);
  else if (sort === 'popular') result.sort((a,b) => b.sold - a.sold);
  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 20;
  const total = result.length;
  result = result.slice((page-1)*limit, page*limit);
  res.json({ products: result, total, page, totalPages: Math.ceil(total/limit) });
});

app.get('/api/products/:id', (req, res) => {
  const p = products.find(p => p.id === +req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  const related = products.filter(r => r.brand === p.brand && r.typeId === p.typeId && r.id !== p.id).slice(0, 4);
  const productReviews = reviews.filter(r => r.phone.includes(p.model.split(' ').slice(0,2).join(' ')) || r.type === p.typeName);
  res.json({ ...p, related, reviews: productReviews });
});

// SPA fallback
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`🛡️ Ốp Xịn | http://0.0.0.0:${PORT}`));