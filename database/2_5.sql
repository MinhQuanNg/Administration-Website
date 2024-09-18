INSERT INTO public.criteria(
	name, "requirementLevel", method, "createdAt", "updatedAt")
VALUES 
-- 2.5.1 Tủ điều khiển hệ thống chữa cháy tự động bằng khí
('Thiết bị cấp nguồn', ' Nguồn năng lượng điện phải độc lập đối với nguồn điện cung cấp cho vùng có sự cố cháy và phải bao gồm một nguồn điện dự phòng khẩn cấp với bộ chuyển đổi tự động trong trường hợp nguồn điện chính bị hư hỏng.', '6.4.3, 8.2.9 TCVN 7161-1:2022', NOW(), NOW()),
('Biến đổi của các thông số cung cấp', 'a) Cung cấp điện áp vào lớn nhất theo qui định của nhà sản xuất; b) Cung cấp điện áp vào nhỏ nhất theo quy định của nhà sản xuất', '16.9 TCVN 7568-2:2013', NOW(), NOW()),
('Khả năng hoạt động', 'Kiểm tra sự tuân thủ của mẫu thử với từng yêu cầu trong tiêu chuẩn EN-12094-1-2003 và để chứng minh sự hoạt động của mẫu thử trước, trong và / hoặc sau môi trường ổn định hóa (9.2 EN-12094-1-2003).', '9.2 EN-12094-1-2003', NOW(), NOW()),
('Nóng ẩm, trạng thái ổn định (vận hành)', 'Trong thử nghiệm, mẫu thử không thay đổi trạng thái trừ khi sự thay đổi này là do kiểm tra chức năng. Khi thử nghiệm chức năng, mẫu thử phải hoạt động chính xác. (9.4.3 EN-12094-1-2003)', '9.4.2 EN-12094-1-2003', NOW(), NOW()),
('Rung hình sin (vận hành)', 'Cho mẫu thử chịu thử rung lần lượt theo mỗi một trong ba trục vuông góc với nhau, một trong các trục vuông góc với mặt phẳng lắp đặt mẫu thử. Áp dụng mức độ khắc nghiệt của ổn định hóa sau: - Phạm vi tần số: 10 Hz đến 150 Hz; Biên độ gia tốc: 0,981 m.s2 (0,1 Gn); • Số lượng trục: ba. • Số lượng các chu kỳ quét trên một trục: một cho mỗi điều kiện chức năng.', '16.7 TCVN 7568-2:2013, 9.3 f EN 12904-1-2003', NOW(), NOW()),
('Rung hình sin (độ bền lâu)', 'Cho mẫu thử chịu thử rung lần lượt theo mỗi một trong ba trục vuông góc với nhau, một trong các trục vuông góc với mặt phẳng lắp đặt mẫu thử. Áp dụng mức độ khắc nghiệt của ổn định hóa sau: • Phạm vi tần số: 10 Hz đến 150 Hz; Biên độ gia tốc: 4,905 m.s2 (051 Gn); • Số lượng trục: ba. • Số lượng các chu kỳ quét trên một trục: 20 trên một trục.' , '16.11 TCVN 7568-2:2013, 9.3 g EN 12904-1-2003', NOW(), NOW()),

-- 2.5.2 Chai chứa khí chữa cháy HFC- 227ea
('Đặc tính kỹ thuật của khí HFC-227ea', 'Bảng 1 TCVN 7161-9:2009 ', ' ISO 3427, ISO 3363, ASTM 6064-11', NOW(), NOW()),
('Lượng khí nạp', '- Lượng khí nạp không được thấp hơn quá 5% so với thông số ghi trên nhãn - Theo 9.2.1.3 TCVN 7161-1:2022 ', 'Cân kiểm tra trọng lượng chai cỏ chứa khí, trừ đi trọng lượng vỏ chai.', NOW(), NOW()),
('Áp suất nạp', '• Áp suất nạp không được thấp hơn 10% so với thông số ghi trên nhãn • Theo 9.2.1.3 TCVN 7161-1:2022 ', 'Sử dụng đồng hồ đo áp lực đã được hiệu chuẩn kết nối với chai chứa khí để đo áp suất.', NOW(), NOW()),
('Mật độ nạp', '<1150 kg/m3 6.1 TCVN 7161-9:2009', '6.1 TCVN 7161-9:2009 Kiểm tra trọng lượng khí nạp /thể tích chai chứa khí
', NOW(), NOW()),

-- 2.5.3 Chai chứa khí chữa cháy FK- 5-1-12
('Đặc tính kỹ thuật của khí', 
 'FK-5-1-12 Bảng 1 TCVN 7161-5:2021',
 'Sử dụng máy phân tích hàm lượng để xác định các thành phần đảm bảo theo quy định trong Bảng 1, TCVN 7161-5:2021',
 NOW(),
 NOW()),
 
('Lượng khí nạp',
 '- Lượng khí nạp không được thấp hơn quá 5% so với thông số ghi trên nhãn <br> 9.2.1.3, TCVN 7161-1:2022',
 'Cân kiểm tra trọng lượng chai có chứa khí, trừ đi trọng lượng vỏ chai.',
 NOW(),
 NOW()),
 
('Áp suất nạp',
 '- Áp suất nạp không được thấp hơn 10% so với thông số ghi trên nhãn <br> 9.2.1.3, TCVN 7161-1:2022',
 'Sử dụng đồng hồ đo áp lực đã được hiệu chuẩn kết nối với chai chứa khí để đo áp suất.',
 NOW(),
 NOW()),
 
('Mật độ nạp',
 '6.1, TCVN 7161-5:2021',
 '6.1, TCVN 7161-5:2021 Kiểm tra trọng lượng khí nạp/thể tích chai chứa khí',
 NOW(),
 NOW()),

-- 2.5.4 Chai chứa khí chữa cháy IG- 100
('Đặc tính kỹ thuật của khí IG-ÍOO', 
 'Theo Bảng 1, TCVN 7161-13:2009',
 'Sử dụng máy phân tích hàm lượng để xác định các thành phần đảm bảo theo quy định trong Bảng 1, TCVN 7161-13:2009',
 NOW(),
 NOW()),
 
('Lượng khí nạp',
 '- Lượng khí nạp không được thấp hơn quá 5% so với thông số ghi trên nhãn <br> 9.2.1.3, TCVN 7161-1:2022',
 'Cân kiểm tra trọng lượng chai có chứa khí, trừ đi trọng lượng vỏ chai.',
 NOW(),
 NOW()),
 
('Áp suất nạp',
 '- Áp suất nạp không được thấp hơn 10% so với thông số ghi trên nhãn <br> 9.2.1.3, TCVN 7161-1:2022',
 'Sử dụng đồng hồ đo áp lực đã được hiệu chuẩn kết nối với chai chứa khí để đo áp suất.',
 NOW(),
 NOW()),

-- 2.5.5 Van chọn vùng
('Khả năng chịu áp của vỏ van', 
 '4.6 Tiêu chuẩn ISO 16003:2008',
 '5.6.2 ISO 16003:2008',
 NOW(),
 NOW()),

('Độ kín của van',
 '4.7.3 Tiêu chuẩn ISO 16003:2008',
 '5.7.3 ISO 16003:2008',
 NOW(),
 NOW()),

('Khả năng chịu áp bên trong và chống rò rỉ',
 '4.9 Tiêu chuẩn ISO 16003:2008: Các bộ phận không được rò rỉ hoặc chịu bất kỳ biến dạng vĩnh viễn nào khi được thử theo 5.5 ISO 16003:2008',
 '5.5.3 ISO 16003:2008',
 NOW(),
 NOW()),


-- 2.5.6 Đầu phun xả khí
('Thiết kế đầu phun', 
 'Bảo đảm các thông số theo thiết kế của nhà sản xuất',
 '- Kiểm tra hồ sơ đầu phun',
 NOW(),
 NOW()),

('Kích thước, trọng lượng',
 'Theo thông số NSX công bố.',
 'Kiểm tra bằng cân điện tử, thước đo.',
 NOW(),
 NOW()),

('Bộ lọc',
 '6.3.6.4 TCVN7161-1:2022',
 '6.3.6.4 TCVN7161-1:2022',
 NOW(),
 NOW()),

('Khả năng chịu nhiệt và chịu áp suất cao',
 '4.12 ISO 16003:2008',
 '5.12.2 ISO 16003:2008',
 NOW(),
 NOW())