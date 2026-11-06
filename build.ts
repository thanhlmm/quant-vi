// Ghép shell.html + parts/NN.html thành index.html, kèm bản đồ khoá học ở trang chủ.
const dir = import.meta.dir;
type Lesson = { n: string; title: string; desc: string; dur: number; app: string };
type Part = { tag: string; short: string; title: string; desc: string; lessons: Lesson[] };
const L = (n: string, title: string, dur: number, app: string, desc: string): Lesson => ({ n, title, dur, app, desc });
const parts: Part[] = [
  { tag: "Phần 1", short: "Xác suất", title: "Xác suất", desc: "Xác suất có điều kiện, kỳ vọng, phương sai, các phân phối kinh điển và mối liên hệ giữa hai biến ngẫu nhiên.", lessons: [
    L("01", "Xác suất có điều kiện và định lý Bayes", 12, "Cập nhật giá trị hợp lý khi lệnh của mình bị khớp", "Cập nhật niềm tin khi có bằng chứng mới, và vì sao tỉ lệ nền thấp có thể lấn át một lời khai rất thuyết phục."),
    L("02", "Kỳ vọng và tính tuyến tính", 12, "Định giá mọi khoản chi trả: quyền chọn, cược, trò chơi", "Trung bình có trọng số dùng để định giá mọi trò chơi, và tính tuyến tính giúp giải nhanh rất nhiều câu hỏi phỏng vấn."),
    L("03", "Phương sai và cơ sở của đa dạng hoá", 10, "Rủi ro danh mục và đa dạng hoá", "Độ phân tán cộng dồn ra sao, quy tắc √n cho trung bình mẫu, và độ lệch chuẩn dưới dạng vectơ."),
    L("04", "Bảy phân phối cần nắm vững", 14, "Dòng lệnh đến, vỡ nợ, lợi suất, thời gian chờ", "Bernoulli, nhị thức, Poisson, hình học, đều, chuẩn và mũ: hình dạng, kỳ vọng, phương sai và bối cảnh ứng dụng."),
    L("05", "Phân phối đồng thời, hiệp phương sai và hệ số tương quan", 12, "Phòng ngừa rủi ro, giao dịch cặp, mô hình rủi ro", "Hai biến ngẫu nhiên biến thiên cùng nhau, điều hệ số tương quan không thấy được, và bài toán ba hệ số tương quan."),
  ]},
  { tag: "Phần 2", short: "Thống kê", title: "Thống kê", desc: "Vì sao trung bình mẫu ổn định dần, vì sao nó có dạng chuẩn, và một ước lượng đáng tin đến đâu.", lessons: [
    L("06", "Luật số lớn và định lý giới hạn trung tâm", 12, "Đánh giá độ tin cậy của backtest; xác định cỡ mẫu", "Trung bình mẫu hội tụ về giá trị thật, và sai số của nó xấp xỉ chuẩn bất kể phân phối ban đầu."),
    L("07", "Khoảng tin cậy", 10, "Thanh sai số cho hệ số Sharpe và độ mạnh của tín hiệu", "Ý nghĩa thực sự của mức tin cậy 95%, kiểm chứng qua một trăm lần lặp lại thí nghiệm."),
  ]},
  { tag: "Phần 3", short: "Khoa học dữ liệu", title: "Nghiên cứu định lượng: khoa học dữ liệu", desc: "Bình phương tối thiểu, láng giềng gần nhất, độ chệch – phương sai, suy diễn hồi quy, ridge, lasso, PCA và nhân quả.", lessons: [
    L("08", "Bình phương tối thiểu và láng giềng gần nhất", 12, "Mô hình cơ sở cho mọi bài toán dự báo", "Hai bộ dự báo đơn giản nhất, một cứng nhắc và một linh hoạt, cùng biên quyết định mà mỗi phương pháp tạo ra."),
    L("09", "Đánh đổi độ chệch – phương sai và lời nguyền số chiều", 12, "Tránh quá khớp tín hiệu alpha", "Mô hình khớp hoàn hảo quá khứ thường dự báo kém, và trong không gian nhiều chiều dữ liệu trở nên thưa thớt."),
    L("10", "Hồi quy tuyến tính: β, ma trận chiếu, kiểm định t và F", 16, "Mô hình nhân tố, tỉ lệ phòng ngừa, hệ số beta", "Công thức ước lượng cần thuộc lòng, ý nghĩa của tổng bình phương phần dư, và cách phân biệt hệ số thật với nhiễu."),
    L("11", "Ridge, lasso và elastic net", 14, "Kết hợp hàng trăm tín hiệu nhiễu", "Chủ động co hệ số, và cơ sở hình học khiến lasso đưa một số hệ số về đúng bằng 0."),
    L("12", "Thành phần chính (PCA)", 10, "Nhân tố đường cong lợi suất, phần dư trong chênh lệch thống kê", "Xoay hệ toạ độ theo các hướng dữ liệu biến thiên nhiều nhất, rồi giữ lại các thành phần quan trọng."),
    L("13", "Nhân quả: thiên lệch chọn mẫu, ngẫu nhiên hoá và biến bị bỏ sót", 14, "Phân biệt hiệu ứng thật với biến gây nhiễu", "Tương quan không phải nhân quả, ngẫu nhiên hoá khắc phục điều đó, và cách ước lượng thiên lệch còn sót lại."),
  ]},
  { tag: "Phần 4", short: "Nghiên cứu tình huống", title: "Nghiên cứu định lượng: nghiên cứu tình huống", desc: "Ba bài toán mô hình hoá mở theo phong cách phỏng vấn Two Sigma và QuantCo, giải trọn vẹn từ đầu đến cuối.", lessons: [
    L("14", "Tình huống: dự báo giá nhà ở New York", 10, "Xây dựng đặc trưng trên dữ liệu lệch", "Mã hoá, chuẩn hoá, biến đổi logarit và hồi quy, rồi xử lý các biến đầu vào tương quan."),
    L("15", "Tình huống: định giá ghế tại nhà hát opera", 10, "Định giá động và mô hình không gian", "Láng giềng gần nhất trên sơ đồ ghế, thời gian còn lại trước buổi diễn và mức độ khan hiếm."),
    L("16", "Tình huống: dự báo nhu cầu CitiBike", 10, "Tính mùa vụ của khối lượng và độ biến động", "Đề xuất biến đầu vào, mã hoá thời gian theo vòng tròn, và xử lý các biến thời tiết tương quan."),
  ]},
  { tag: "Phần 5", short: "Tạo lập thị trường", title: "Giao dịch định lượng: tạo lập thị trường", desc: "Yết giá mua và bán, phản ứng trước giao dịch khớp, theo dõi vị thế và lãi/lỗ, xác định quy mô cược.", lessons: [
    L("17", "Vai trò của nhà tạo lập thị trường", 12, "Công việc hằng ngày tại Jane Street, Optiver, SIG, IMC", "Giá mua, giá bán, chênh lệch và lợi thế; ba yếu tố sau mỗi mức yết giá: giá trị, giao dịch gần nhất và vị thế."),
    L("18", "Các tình huống tạo lập thị trường, từng giao dịch một", 14, "Vòng phỏng vấn giao dịch", "Phát lại các trò Red Sox, Tanzania và “giao dịch hay thu hẹp chênh lệch”, ghi nhận vị thế và PnL."),
    L("19", "Thực hành: tạo lập thị trường trên năm viên xúc xắc", 10, "Luyện tập cho vòng tạo lập thị trường trực tiếp", "Yết giá trong khi xúc xắc lần lượt được lật mở, đối đầu một nhà giao dịch biết nhiều hơn mình."),
    L("20", "Xác định quy mô cược: tiêu chí Kelly", 10, "Xác định quy mô vị thế và hạn mức rủi ro", "Nên đặt bao nhiêu phần vốn khi có lợi thế, và vì sao cược gấp đôi Kelly không đem lại tăng trưởng."),
    L("21", "Bên trong giao dịch tần suất cao (HFT)", 14, "Hoạt động kinh doanh cốt lõi của nhà tạo lập thị trường điện tử", "Sổ lệnh giới hạn, ưu tiên hàng chờ, kinh tế học của nhà tạo lập thị trường, và vai trò của micro giây."),
  ]},
];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
let shell = await Bun.file(`${dir}/shell.html`).text();

// Bản đồ khoá học
let map = `<section id="map" class="map">`;
for (const p of parts) {
  const total = p.lessons.reduce((a, l) => a + l.dur, 0);
  map += `<div class="map-part"><div class="map-head"><div class="tag">${p.tag}</div><h2>${p.title}</h2><p>${p.desc}</p><p class="map-sum">${p.lessons.length} bài · ${total} phút</p></div><div class="cards">`;
  for (const l of p.lessons) map += `<a class="card" href="#bai-${l.n}" data-n="${l.n}"><span class="num">${l.n}</span><span class="ct"><b>${esc(l.title)}</b><span class="cd">${esc(l.desc)}</span><span class="cm">${l.dur} phút · Ứng dụng: ${esc(l.app)}</span></span><span class="done-mark" aria-hidden="true">✓</span></a>`;
  map += `</div></div>`;
}
map += `<div class="map-part"><div class="map-head"><div class="tag">Phần 6</div><h2>Chuẩn bị phỏng vấn</h2><p>Câu hỏi được ghi nhận từ Jane Street, Citadel, Two Sigma, HRT, Optiver, SIG và nhiều công ty khác. Mỗi bài đã có mục câu hỏi phỏng vấn kèm lời giải; ngân hàng 50 câu hỏi đầy đủ, danh sách công ty, khoá học MIT và sách nên đọc có trên <a href="https://hft.md/">trang gốc</a>.</p></div></div>`;
map += `</section>`;

// Nội dung bài
let body = "";
const missing: string[] = [];
const order: string[] = [];
for (const p of parts) {
  body += `<section class="part" data-short="${p.short}"><div class="tag">${p.tag}</div><h2>${p.title}</h2><p>${p.desc}</p></section>\n`;
  for (const l of p.lessons) {
    order.push(l.n);
    const f = Bun.file(`${dir}/parts/${l.n}.html`);
    if (await f.exists()) body += (await f.text()) + "\n";
    else { missing.push(l.n); body += `<section class="lesson" id="bai-${l.n}" data-short="(đang soạn)"><header><span class="num">${l.n}</span><h3>Đang soạn</h3></header></section>\n`; }
  }
}
const meta = Object.fromEntries(parts.flatMap(p => p.lessons.map(l => [l.n, { t: l.title, part: p.tag + " · " + p.short }])));
shell = shell.replace("<!--MAP-->", map).replace("<!--CONTENT-->", body)
  .replace("/*LESSON_META*/null", JSON.stringify({ order, meta }));
await Bun.write(`${dir}/index.html`, shell);
console.log(`index.html: ${shell.length} bytes; missing: ${missing.join(",") || "none"}`);
