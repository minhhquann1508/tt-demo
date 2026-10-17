# T&T Home: bản mock UI thương mại điện tử (mobile-first)

Bản prototype HTML gói gọn trong 1 file, mô phỏng trọn luồng mua hàng: từ đăng ký đến huỷ đơn và hoàn tiền. Hỗ trợ 2 ngôn ngữ: tiếng Việt và tiếng Anh.

## Cách mở

Mở trực tiếp `index.html` bằng Chrome hoặc Safari. Không cần build và không cần cài thêm gì.

### Deploy lên Vercel

Đây là site tĩnh, không cần build.

1. Vào [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → chọn repo `tt-demo`.
2. Framework Preset để **Other**. Build Command và Output Directory để trống.
3. Bấm **Deploy**.

### 2 chế độ hiển thị

- **Mặc định (bản deploy):** chạy như web app thật. Trên điện thoại app chiếm toàn màn hình; trên desktop app hiển thị thành một cột giữa màn hình. Không có khung điện thoại, không có checklist. Nút **▶** nhỏ ở mép phải dùng để mở phần **Tự chạy demo**, kèm bảng dữ liệu test để tự thao tác tay.
- **Thêm `?panel` vào URL** (ví dụ `https://…vercel.app/?panel`): hiện khung điện thoại và checklist 28 bước, dùng khi demo nội bộ.

### Tự chạy demo

Bấm **▶**, chọn tốc độ Chậm / Vừa / Nhanh, rồi bấm **Bắt đầu tự chạy**. App sẽ đặt lại dữ liệu rồi tự đi qua 22 bước, mất khoảng 3–4 phút ở tốc độ Vừa:

1. Đổi ngôn ngữ
2. Đăng ký, nhập OTP
3. Lọc danh mục, tìm kiếm và lọc giá
4. Xem sản phẩm, chọn biến thể, xem đánh giá
5. Thêm vào giỏ, áp mã giảm giá
6. Trượt để thanh toán
7. Nhập địa chỉ, chọn giao nhanh
8. Thử thẻ bị từ chối, rồi thanh toán bằng thẻ 4242 qua 3DS
9. Xem tracking, huỷ đơn và xem hoàn tiền
10. Hỏi T&T Assist
11. AI Thử tại nhà: đặt đèn vào phòng mẫu, đổi phong cách, dùng ảnh phòng
12. AI thử áo dài: người mẫu thật, đổi màu, gợi ý size
13. Tìm bằng hình ảnh, đọc AI tóm tắt đánh giá
14. Đăng xuất, đăng nhập lại

Thanh điều khiển ở đầu màn hình có nút **Dừng / Tiếp / Thoát**. Mỗi lần chạm được đánh dấu bằng vòng tròn để người xem dễ theo dõi.

- **Trên desktop:** app hiển thị trong khung điện thoại, bên phải là panel **Kịch bản demo**.
- **Trên mobile hoặc cửa sổ hẹp hơn 900px:** app chiếm toàn màn hình. Mở panel demo bằng tab nhỏ ở mép phải.
- **Cần có internet** để tải font (Google Fonts) và ảnh sản phẩm (Unsplash). Ảnh nào tải lỗi sẽ tự hiện placeholder xám, layout không bị vỡ.
- **Dữ liệu lưu trong `localStorage`:** tài khoản, giỏ hàng, đơn hàng, địa chỉ. Nút **Reset demo** trong panel sẽ xoá toàn bộ để chạy lại từ đầu.

## Dữ liệu test

| Mục | Giá trị |
|---|---|
| Tài khoản demo | `demo@tt.shop` / `Demo1234` (có sẵn trong gợi ý "Tài khoản đã lưu" ở màn Đăng nhập) |
| OTP khi đăng ký | `123456` |
| Mã giảm giá | `WELCOME10` (giảm 10%), `FREESHIP` (miễn phí giao hàng) |
| Thẻ thanh toán thành công (có bước 3DS) | `4242 4242 4242 4242`, mã 3DS `123456` |
| Thẻ bị từ chối | `4000 0000 0000 0002` |
| Thẻ không đủ số dư | `4000 0000 0000 9995` |
| Ngày hết hạn / CVC | Ngày bất kỳ trong tương lai / 3 số bất kỳ |

Tài khoản demo có sẵn 4 đơn mẫu để demo đủ mọi trạng thái: đang đóng gói, đang vận chuyển, đã giao, đã huỷ.

## Luồng màn hình (18 màn + T&T Assist + 2 màn AI)

```
01 Welcome → 02 Đăng ký → 03 OTP → 04 Đăng nhập (+ Quên mật khẩu)
→ 05 Trang chủ → 06 Tìm kiếm / Lọc → 07 Chi tiết sản phẩm → 08 Đánh giá
→ 09 Giỏ hàng → 10 Checkout (Địa chỉ → Giao hàng) → 11 Thanh toán kiểu Stripe → 12 3DS → 13 Đặt hàng thành công
→ 14 Đơn hàng → 15 Tracking → 16 Huỷ đơn → 17 Đã huỷ / Hoàn tiền
→ 18 Tài khoản (yêu thích, sổ địa chỉ, phương thức thanh toán, ngôn ngữ, đăng xuất)

AI: Chi tiết sản phẩm → Thử tại nhà bằng AI (#/tryon/<id>) · Biểu tượng 📷 → Tìm bằng ảnh (#/vsearch/<ảnh>)
```

## Checklist demo

Checklist này cũng có trong panel demo của app. Bấm vào một bước sẽ nhảy tới màn tương ứng, và bước tự được đánh dấu xong khi làm đúng thao tác.

**Luồng chính**
1. Mở Welcome, đổi VI ↔ EN và thấy giá đổi giữa ₫ và $
2. Đăng ký tài khoản và nhập OTP
3. Vào trang chủ, lọc danh mục "Đèn"
4. Tìm "mug" và chọn khoảng giá trong bottom sheet lọc
5. Mở chi tiết sản phẩm, chọn biến thể
6. Xem đánh giá, lọc review 5★
7. Thêm vào giỏ (hoặc Mua ngay)
8. Tăng số lượng, áp mã WELCOME10
9. Checkout: nhập địa chỉ, chọn Giao nhanh
10. Thanh toán trên trang kiểu Stripe bằng thẻ 4242…
11. Xác thực 3DS và tới màn Thành công
12. Mở Đơn hàng, xem timeline tracking
13. Huỷ đơn: chọn lý do, xác nhận, xem trạng thái hoàn tiền
14. Đăng xuất, đăng nhập lại, đơn hàng vẫn còn

**Nhánh lỗi**

15. Đăng nhập sai mật khẩu, lỗi hiện ngay dưới ô nhập. Sai 3 lần thì app gợi ý đặt lại mật khẩu.
16. Quên mật khẩu: gửi link đặt lại
17. Thẻ bị từ chối, rồi thanh toán lại thành công
18. Nhập mã giảm giá không hợp lệ
19. Giỏ hàng trống
20. Đơn đã giao thì không huỷ được, chỉ còn Trả hàng hoặc Mua lại

**T&T Assist**

21. Mở T&T Assist từ trang sản phẩm, xem xếp hạng theo thói quen
22. Thêm vào giỏ từ người bán được đề xuất

**AI mới: thử tại nhà, tìm bằng ảnh**

23. Thử tại nhà: đổi phong cách phòng, kéo sản phẩm sang chỗ khác
24. Thử trong phòng của bạn: tải ảnh hoặc dùng ảnh phòng mẫu
25. Tìm bằng hình ảnh từ ô tìm kiếm, xem độ giống %
26. Đọc AI tóm tắt đánh giá, bấm “Hữu ích”

**Trang phục Việt**

27. Thử áo dài: xem người mẫu thật, đổi màu, gợi ý size
28. Tải ảnh của bạn và mặc thử áo dài

## T&T Assist: trợ lý so sánh giá (tính năng mới)

- **Cách mở:** bong bóng ✨ ở góc phải màn Trang chủ / Tìm kiếm / Sản phẩm / Đánh giá, hoặc nút **"So sánh giá từ N người bán"** trên trang chi tiết sản phẩm.
- **Tìm kiếm:** tìm cùng một sản phẩm (cùng mã SKU) từ 4 người bán trên sàn T&T, rồi so sánh giá, đánh giá (có tính thêm số lượt review), thời gian giao, chính sách đổi trả và độ uy tín.
- **Điểm phù hợp 0–100:** tính theo trọng số **học từ thói quen của khách**:

| Hành vi của khách | Ưu tiên được tăng |
|---|---|
| Chọn giao nhanh khi đặt hàng | Tốc độ giao |
| Lọc hoặc sắp xếp theo đánh giá 5★ | Đánh giá |
| Dùng mã giảm giá, lọc giá thấp | Giá |
| Bấm Mua ngay | Tốc độ giao |
| Chọn người bán nào trong trợ lý | Tiêu chí nổi trội của người bán đó |

- **Minh bạch:** thẻ "Thói quen mua sắm của bạn" ghi rõ dữ liệu đã học kèm bằng chứng. Khách có thể chuyển sang xếp hạng cân bằng bất cứ lúc nào.
- **Huy hiệu:** Phù hợp nhất / Rẻ nhất / Nhanh nhất / Đánh giá cao nhất. Mỗi dòng có "Vì sao?" phân tích điểm theo từng tiêu chí.
- **Hỏi tiếp:** gõ tự do (ví dụ "đèn", "dưới 1tr", "ai giao nhanh nhất") hoặc bấm chip gợi ý.
- **Thêm vào giỏ từ người bán bất kỳ:** giỏ hàng ghi "Bán bởi …" kèm đúng giá của người bán đó.
- **Chạy offline:** thuật toán mô phỏng ngay trong file, không gọi API bên ngoài.

## Tính năng AI mới trong app mua hàng

Lấy từ tài liệu `Ý tưởng AI siêu đột phá.docx` (mã ý tưởng ghi trong ngoặc). Shop bán đồ gia dụng nên “thử đồ” (B5) được làm thành **thử sản phẩm trong phòng**. Không có key Gemini thì mọi tính năng vẫn chạy bằng dữ liệu mô phỏng ngay trong file.

Mở nhanh: bấm **▶** (hoặc ☰ khi có `?panel`) → mục **Tính năng AI để thử**. Mỗi nút tự đăng nhập tài khoản demo và nhảy thẳng tới tính năng.

### 1. Thử tại nhà bằng AI (B5 + B9)

Mở: trang chi tiết sản phẩm → thẻ **Thử tại nhà bằng AI** (ngay dưới “So sánh giá”).

1. **Phòng mẫu AI:** chọn 1 trong 4 phong cách, mỗi phong cách gắn với một nhóm khách: Tối giản (dân văn phòng), Hàn Quốc (Gen Z), Bắc Âu (gia đình trẻ), Indochine (yêu nét Á Đông).
2. Chờ khoảng 2 giây để AI “quét” mặt phẳng, ánh sáng, tỷ lệ. Sản phẩm được đặt sẵn ở vị trí gợi ý, có nhãn kích thước thật (≈ cm).
3. **Kéo** sản phẩm để đổi chỗ, hoặc bấm **Vị trí gợi ý khác**. Kéo thanh **Kích thước hiển thị**; **Về đúng tỷ lệ** để quay lại kích thước thật.
4. **Khớp ánh sáng** bật/tắt chỉnh màu theo phòng. **Xem ảnh gốc** để so trước và sau. Đổi màu ngay bên dưới.
5. **Phòng của bạn:** bấm **Chụp / tải ảnh** để dùng ảnh phòng thật (ảnh chỉ xử lý trên máy), hoặc **Dùng ảnh phòng mẫu**.
6. Có Gemini: bấm **Tạo ảnh bằng Gemini** để ghép sản phẩm vào đúng ảnh phòng, có ánh sáng và bóng đổ thật. Thẻ nhận xét được Gemini viết theo ảnh. **Lưu ảnh** tải ảnh Gemini về máy.
7. **Thêm vào giỏ** ngay trong màn này.

### 2. Thử đồ bằng AI: Trang phục Việt (B5 + B9)

Danh mục mới **Trang phục Việt** trên Trang chủ: áo dài lụa truyền thống, áo dài cách tân organza, áo dài vẽ hoạ tiết, áo tứ thân, áo nhật bình cung đình Huế, nón lá. Ảnh là ảnh chụp thật từ Unsplash (miễn phí bản quyền).

Mở: trang sản phẩm → thẻ **Thử đồ bằng AI**.

1. **Người mẫu thật:** xem ảnh người mẫu mặc đúng màu đang chọn, kèm chiều cao và size họ mặc. Bấm ảnh nhỏ để xem dáng khác, đổi màu ở dưới.
2. **Gợi ý size:** nhập chiều cao, cân nặng → AI gợi ý S/M/L/XL, so với người mẫu, bấm **Chọn size này**. Nút giỏ hàng tự dùng size đó.
3. **Ảnh của bạn:** tải ảnh toàn thân (nón lá: ảnh chân dung). Không có Gemini: hiện ảnh bạn cạnh ảnh người mẫu để so sánh.
4. Có Gemini (key miễn phí): **Nhận xét phối đồ bằng Gemini**, gồm màu có hợp tông da không, size, phụ kiện. Bật model tạo ảnh (cần billing): **Mặc thử bằng Gemini** để mặc trang phục lên chính ảnh của bạn, giữ nguyên khuôn mặt, dáng và nền; **Lưu ảnh** tải ảnh về máy.

### 3. Tìm bằng hình ảnh (A1, phía người mua)

Mở: biểu tượng 📷 trên Trang chủ hoặc cạnh ô tìm kiếm.

1. Tải ảnh lên, hoặc chọn 1 trong 3 ảnh mẫu (Pinterest, quán cà phê, TikTok).
2. AI khoanh vùng vật thể, ghi loại và thuộc tính (chất liệu, màu, dáng).
3. Kết quả xếp theo **% giống**. Sản phẩm khớp nhất có **Xem sản phẩm**, **Thử tại nhà** và lối tắt **so sánh giá giữa các người bán**.
4. Có Gemini: ảnh được Gemini đọc thật và so với toàn bộ danh mục.

### 4. AI tóm tắt đánh giá

Mở: trang Đánh giá của bất kỳ sản phẩm nào. Thẻ tóm tắt có câu tổng quan, 3 điểm khen, điểm chê (kèm % lượt nhắc), lưu ý khi mua và nút **Hữu ích?**. Có Gemini: bấm **Tóm tắt bằng Gemini** để tóm tắt lại từ nội dung review.

## Ghi chú thiết kế

- **Design tokens** lấy từ `DESIGN-stripe.md`, đã giảm độ rực: màu chính là indigo dịu `#5b55c4`, các màu trạng thái cũng dùng tông dịu.
- **Font:** Montserrat cho tiêu đề, Nunito Sans cho nội dung. Cả hai đều hỗ trợ đầy đủ tiếng Việt.
- **Hình khối:** ô nhập và nút bo pill, thẻ (card) bo góc 12px.
- **Logo:** khối lập phương isometric 3D, mặt trên là hai chữ T đan nhau (file `favicon.svg`).
- **Component sheet:** mở từ panel demo, tổng hợp toàn bộ component của app.

---

# T&T Seller Center: trang quản lý người bán (desktop-first)

File `seller.html`, mở trực tiếp hoặc vào `https://…vercel.app/seller` sau khi deploy. Nhân vật demo là shop **Hanoi Ceramic House**. Giao diện dùng chung token, font và logo với app mua hàng, hỗ trợ VI/EN.

- **Desktop:** sidebar + Copilot dạng panel phải.
- **Tablet:** sidebar thu thành cột icon.
- **Mobile:** 5 tab dưới, bảng tự chuyển thành card.

## Đăng nhập demo

| Mục | Giá trị |
|---|---|
| Tài khoản | `hanoiceramic@tt.shop` / `Seller1234` (có sẵn trong "Tài khoản đã lưu" khi bấm vào ô Email) |
| Sai mật khẩu 3 lần | Tạm khoá, gợi ý đặt lại mật khẩu |

## 15 màn

S1 Đăng nhập · S2 Tổng quan · S3 Đơn hàng · S4 Chi tiết đơn · S5 Sản phẩm · S6 Thêm/sửa sản phẩm · S7 Đánh giá · S8 Báo cáo · S9 Khuyến mãi · S10 Tài chính · S11 Tin nhắn · S12 Cài đặt · **S13 AI Studio ảnh & video · S14 Nguồn hàng AI · S15 Radar giá & hàng nhái** (nhóm AI Lab trên sidebar). Ngoài ra còn có Component sheet (P0), bảng ⌘K và thông báo.

## AI trong Seller Center

| Tính năng | Ở đâu |
|---|---|
| ① Bản tin AI mỗi sáng | Tổng quan: 4 việc ưu tiên, nút hành động, "Hỏi thêm" mở Copilot |
| ④ Phân tích review | Đánh giá: gom nhóm chủ đề, AI soạn trả lời theo 3 giọng và theo ngôn ngữ của khách |
| ⑦ Hỏi đáp dữ liệu | Copilot (nút ✨ Hỏi AI) và ô "Hỏi dữ liệu" trong Báo cáo |
| Gợi ý nhỏ theo ngữ cảnh | Cảnh báo đơn COD rủi ro, dự báo tồn kho, gợi ý voucher, gợi ý trả lời chat, gợi ý chính sách đổi trả |
| Đăng từ 1 ảnh (B7) | Sản phẩm → Thêm sản phẩm: thẻ “Đăng nhanh từ 1 tấm ảnh” |
| Ảnh bối cảnh theo nhóm khách (B9), video từ ảnh (B3) | AI Lab → AI Studio ảnh & video |
| Radar xu hướng (A4), tìm nguồn bằng ảnh (A1), giá vốn về kho & mã HS (A6), xin báo giá hàng loạt (A2) | AI Lab → Nguồn hàng AI |
| Radar giá đa sàn (B1), phát hiện trộm ảnh / hàng nhái (B2) | AI Lab → Radar giá & hàng nhái |

Mọi nội dung AI đều có nhãn ✨. Người bán luôn là người bấm gửi hoặc áp dụng.

## AI Lab trong Seller Center (Phase 6)

Lối vào: nhóm **AI Lab** trên sidebar, hoặc thẻ **AI Lab: tính năng AI mới** trên Tổng quan. Kịch bản demo (☰) có tab **Duyệt P6** với 9 mục, mỗi mục có nút **Chỉ chỗ**.

### Đăng sản phẩm từ 1 ảnh (B7): Sản phẩm → Thêm sản phẩm
1. Bấm **Tạo từ ảnh mẫu**, hoặc **Tải ảnh của bạn**.
2. AI nhận diện sản phẩm, viết tên và mô tả VI/EN, chọn danh mục, phân loại, giá gợi ý, cân nặng.
3. Xem **Tiêu đề tối ưu cho từng sàn** (Shopee, TikTok Shop, Lazada), bấm nút copy.
4. Kiểm tra lại rồi bấm **Đăng sản phẩm**.

### AI Studio ảnh & video (B9, B3)
1. Chọn sản phẩm. Tab **Ảnh bối cảnh** → **Tạo 4 bối cảnh**: dân văn phòng, mẹ bỉm sữa, Gen Z, mua làm quà. Mỗi ảnh ghi nhóm quảng cáo nên dùng.
2. **Duyệt độ trung thực**: tick đủ 5 mục (màu, men, logo, tỷ lệ, chất liệu) thì nút **Đăng** mới mở. Nhãn “Ảnh minh hoạ AI” bật sẵn.
3. Tab **Video bán hàng**: chọn giọng (giọng chủ shop cần đồng ý), **Tạo video** 15 giây khổ 9:16 có phụ đề chạy, rồi **Tạo 3 phiên bản** A/B và **Đăng nháp**.

### Nguồn hàng AI (A4 → A1 → A6 → A2)
1. **Radar xu hướng**: bấm **Tìm nguồn** ở sản phẩm đang tăng, hoặc thả ảnh / chọn ảnh mẫu.
2. Bảng nhà cung cấp trên 1688, Alibaba, Yiwugo, Made-in-China: giá sỉ theo bậc, MOQ, khu vực gửi hàng, xưởng hay thương mại, xác thực, số năm, bán/tháng, tỷ lệ mua lại, % giống, điểm xếp hạng. Nhãn **Nguồn gốc** đánh dấu xưởng rẻ nhất.
3. Bấm một nhà cung cấp → **Giá vốn về kho**: chọn số lượng 300/500/1.000, xem mã HS do AI đề xuất, thuế, VAT, vận chuyển, giá bán tối thiểu và lãi gộp.
4. **Soạn & gửi yêu cầu báo giá**: AI viết tin tiếng Trung kèm bản dịch, gửi 3 xưởng điểm cao nhất.

### Radar giá & hàng nhái (B1, B2)
1. Chọn ngưỡng cảnh báo 5/10/15%. Dòng tô vàng là sản phẩm có đối thủ rẻ hơn ngưỡng.
2. AI đề xuất giá không thấp hơn giá sàn (vốn + lãi tối thiểu 25%, đã gồm phí sàn). **Áp dụng** đổi giá thật trong danh sách sản phẩm, hoặc **Giữ giá**.
3. Mục **Shop dùng trộm ảnh, bán hàng nhái**: AI phân loại đại lý chính thức / dùng trộm ảnh / nghi hàng nhái. **Tạo hồ sơ khiếu nại** để xem bằng chứng và gửi.

## Kịch bản demo và tự chạy

- **Nút ☰ Kịch bản demo:** checklist theo từng phase (P0–P5, tự tick khi làm đúng), 11 bước kịch bản, danh sách 12 màn. Nút "Chỉ chỗ" đưa người xem tới đúng vị trí.
- **Nút ▶ Chạy demo** (trên topbar, màn đăng nhập hoặc trong panel Kịch bản):
  - Đặt lại dữ liệu rồi tự đi qua **20 bước** "buổi sáng của chủ shop": đăng nhập → bản tin AI → xử lý đơn hàng loạt → đơn COD rủi ro → in và bàn giao vận đơn → duyệt huỷ → nhập hàng → tạo sản phẩm → review → tin nhắn → báo cáo → voucher → rút tiền → đổi trả 14 ngày → đăng từ 1 ảnh → AI Studio → nguồn hàng & báo giá → radar giá & khiếu nại.
  - Tốc độ Chậm / Vừa / Nhanh; có Dừng / Tiếp / Thoát (phím Space / Esc).
  - Khoảng 90 giây ở Nhanh, 4 phút ở Vừa. Chạy được trên cả desktop và mobile.
- **Đặt lại dữ liệu:** nút "Đặt lại dữ liệu demo" ở cuối tab Duyệt trong panel Kịch bản.

---

# Kết nối AI thật: Gemini hoặc OpenRouter (tuỳ chọn)

Mặc định cả hai app chạy **bản mô phỏng**, không gọi AI. Khi có API key, các tính năng dưới đây gọi model thật. Huy hiệu cạnh mỗi tính năng cho biết đang chạy chế độ nào (**Gemini**, **OpenRouter** hoặc **Mô phỏng**); bấm vào huy hiệu để mở cài đặt.

| App | Tính năng | Loại model |
|---|---|---|
| Mua hàng | Thử tại nhà: ghép sản phẩm vào ảnh phòng thật | tạo ảnh (tính phí) |
| Mua hàng | Thử tại nhà: nhận xét màu, kích thước, chỗ đặt | văn bản, đọc ảnh |
| Mua hàng | Thử đồ: mặc trang phục lên ảnh của bạn | tạo ảnh (tính phí) |
| Mua hàng | Thử đồ: nhận xét màu hợp tông da, size, phụ kiện | văn bản, đọc ảnh |
| Mua hàng | Tìm bằng ảnh: nhận diện và xếp hạng sản phẩm giống | văn bản, đọc ảnh |
| Mua hàng | Tóm tắt khen, chê từ nội dung review | văn bản |
| Seller | Đăng từ 1 ảnh: tên, mô tả, danh mục, giá, tiêu đề từng sàn | văn bản, đọc ảnh |
| Seller | AI Studio: 4 ảnh bối cảnh thật | tạo ảnh (4 ảnh mỗi lần, tính phí) |
| Seller | AI Studio: kịch bản video và 3 câu mở đầu A/B | văn bản |
| Seller | Nguồn hàng: soạn yêu cầu báo giá tiếng Trung + bản dịch | văn bản |
| Seller | Hỏi AI: câu hỏi tự do (không khớp câu mẫu) trả lời từ số liệu shop | văn bản |

**Chỉ tạo ảnh là tính phí**; mọi tính năng chữ và đọc ảnh chỉ dùng model miễn phí. **Tạo ảnh bật sẵn** bằng model rẻ nhất. Chỉ bị tính phí khi bạn bấm nút tạo ảnh / mặc thử; autoplay luôn dùng mô phỏng. Muốn tắt: chọn “Tắt tạo ảnh” trong cài đặt. Gặp lỗi (sai key, hết lượt, hết credit, mạng) thì app báo lỗi bằng tiếng Việt và quay về kết quả mô phỏng.

## Chọn nhà cung cấp

| | Google Gemini | OpenRouter |
|---|---|---|
| Lấy key | [Google AI Studio](https://aistudio.google.com/apikey) | [openrouter.ai/keys](https://openrouter.ai/keys) |
| Văn bản, đọc ảnh (miễn phí) | `gemini-3.5-flash-lite` (dùng lượt free của key) | chỉ model miễn phí: `google/gemma-4-31b-it:free`, bận thì thử `gemma-4-26b-a4b-it:free` rồi `openrouter/free`; hết lượt free thì quay về mô phỏng, không chuyển sang model tốn phí |
| Tạo ảnh | `gemini-3.1-flash-lite-image`: key free gần như không có lượt, cần bật billing | `google/gemini-3.1-flash-lite-image`: khoảng **$0,034 một ảnh**, trừ vào credit OpenRouter (không có model ảnh miễn phí) |

Đã thử thật qua OpenRouter: mặc thử áo dài lên ảnh người mất khoảng 8–12 giây, giữ nguyên khuôn mặt, dáng và nền.

## Cách 1: tự nhập key (dùng khi demo trên máy mình)

1. App mua hàng: bấm **▶** → **Kết nối AI** (hoặc nút **Kết nối AI** cuối panel khi có `?panel`). Seller Center: thẻ **AI Lab** trên Tổng quan → **Kết nối AI**.
2. Chọn **Google Gemini** hoặc **OpenRouter**, dán key → **Kiểm tra kết nối** → **Lưu**. Hai app dùng chung cài đặt khi mở cùng domain.

Key chỉ lưu trong `localStorage` của trình duyệt đó và được gửi thẳng tới nhà cung cấp. Không nhập key trên máy dùng chung, không đưa key vào code. Lỡ để lộ key (gửi qua chat, commit lên git) thì xoá key đó và tạo key mới.

## Cách 2: đặt key trên Vercel (cho bản deploy công khai)

Repo có 2 serverless function giữ key ở phía máy chủ: `api/gemini.js` và `api/openrouter.js`.

1. Vercel → Project → **Settings → Environment Variables** → thêm `GEMINI_API_KEY` và/hoặc `OPENROUTER_API_KEY`.
2. **Redeploy**.
3. Mở web, chọn nhà cung cấp trong cài đặt: huy hiệu hiện **· server**. Người xem không cần nhập key và không thấy key.

Hai function chỉ nhận đúng định dạng model, chặn request từ domain khác và giới hạn 4 MB. Ai mở được trang demo cũng dùng được credit của bạn, nên đặt hạn mức chi tiêu cho key (OpenRouter: Settings → Keys → Credit limit; Google: budget alert).

Nội dung AI tạo chỉ là bản nháp: mã HS, giá, ảnh bối cảnh, ảnh mặc thử luôn cần người duyệt.
