// Ghép shell.html + parts/NN.html thành index.html (tự chứa, không phụ thuộc bên ngoài).
const dir = import.meta.dir;
const parts = [
  { tag: "Phần 1", short: "Xác suất", title: "Xác suất", desc: "Xác suất có điều kiện, kỳ vọng, phương sai, các phân phối kinh điển và mối liên hệ giữa hai biến ngẫu nhiên. 5 bài · 60 phút.", lessons: ["01","02","03","04","05"] },
  { tag: "Phần 2", short: "Thống kê", title: "Thống kê", desc: "Vì sao trung bình mẫu ổn định dần, vì sao nó có dạng chuẩn, và một ước lượng đáng tin đến đâu. 2 bài · 22 phút.", lessons: ["06","07"] },
  { tag: "Phần 3", short: "Khoa học dữ liệu", title: "Nghiên cứu định lượng: khoa học dữ liệu", desc: "Bình phương tối thiểu, láng giềng gần nhất, độ chệch – phương sai, suy diễn hồi quy, ridge, lasso, PCA và nhân quả. 6 bài · 78 phút.", lessons: ["08","09","10","11","12","13"] },
  { tag: "Phần 4", short: "Nghiên cứu tình huống", title: "Nghiên cứu định lượng: nghiên cứu tình huống", desc: "Ba bài toán mô hình hoá mở theo phong cách phỏng vấn Two Sigma và QuantCo. 3 bài · 30 phút.", lessons: ["14","15","16"] },
  { tag: "Phần 5", short: "Tạo lập thị trường", title: "Giao dịch định lượng: tạo lập thị trường", desc: "Yết giá mua và bán, phản ứng trước giao dịch khớp, theo dõi vị thế và lãi/lỗ, xác định quy mô cược. 5 bài · 60 phút.", lessons: ["17","18","19","20","21"] },
];
let shell = await Bun.file(`${dir}/shell.html`).text();
let body = "";
const missing: string[] = [];
for (const p of parts) {
  body += `<section class="part" data-short="${p.short}"><div class="tag">${p.tag}</div><h2>${p.title}</h2><p>${p.desc}</p></section>\n`;
  for (const n of p.lessons) {
    const f = Bun.file(`${dir}/parts/${n}.html`);
    if (await f.exists()) body += (await f.text()) + "\n";
    else { missing.push(n); body += `<section class="lesson" id="bai-${n}" data-short="(đang soạn)"><header><span class="num">${n}</span><h3>Đang soạn</h3></header></section>\n`; }
  }
}
body += `<section class="part" data-short="Phỏng vấn"><div class="tag">Phần 6</div><h2>Chuẩn bị phỏng vấn</h2><p>Câu hỏi được ghi nhận từ Jane Street, Citadel, Two Sigma, HRT, Optiver, SIG và nhiều công ty khác: <a href="https://hft.md/">ngân hàng 50 câu hỏi</a> có gợi ý, lời giải đã kiểm chứng và mô phỏng; cùng danh sách công ty nên ứng tuyển, khoá học MIT nên theo và sách nên đọc tiếp (trên trang gốc).</p></section>\n`;
shell = shell.replace("<!--CONTENT-->", body);
await Bun.write(`${dir}/index.html`, shell);
console.log(`index.html: ${shell.length} bytes; missing: ${missing.join(",") || "none"}`);
