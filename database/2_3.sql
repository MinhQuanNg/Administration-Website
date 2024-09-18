INSERT INTO public.criteria(
	name, "requirementLevel", method, "createdAt", "updatedAt")
VALUES 
-- 2.3.1 Chất bột chữa cháy
('Thử khả năng dập cháy', 
 '6.2 TCVN 6102:2020 Loại A, 6.3 TCVN 6102:2020 Loại B, 6.4 TCVN 6102:2020 Loại C', 
 '13.3.1 TCVN 6102:2020, 13.3.2 TCVN 6102:2020, Bất cứ loại bột nào đáp ứng được các điều kiện của mục 6.3 TCVN 6102:2020 cũng được xem như có đủ khả năng dập tắt đám cháy loại C',
 NOW(), 
 NOW()
),
('Kiểm tra tính chảy', 
 '7 TCVN 6102:2020', 
 '13.4 TCVN 6102:2020',
 NOW(), 
 NOW()
),
('Chống đóng bánh và vón cục', 
 '8 TCVN 6102:2020', 
 '13.5 TCVN 6102:2020',
 NOW(), 
 NOW()
),
('Khả năng chống thấm nước', 
 '9 TCVN 6102:2020', 
 '13.6 TCVN 6102:2020',
 NOW(), 
 NOW()
),
('Độ ẩm', 
 '10 TCVN 6102:2020', 
 '13.7 TCVN 6102:2020',
 NOW(), 
 NOW()
),

-- 2.3.2 Chất tạo bọt chữa chảy
('Nhiệt độ đông đặc', 
 '5 - TCVN 7278-1:2003; Điều 5 - TCVN 7278-2:2003', 
 'Phụ lục A.2, Phụ lục B - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục B - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Tỷ lệ cặn', 
 '6 - TCVN 7278-1:2003; 6 - TCVN 7278-2:2003', 
 'Phụ lục A.1, phụ lục C - TCVN 7278-1:2003; Phụ lục A.1, phụ lục C - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Độ pH', 
 '8 - TCVN 7278-1:2003; Điều 8 - TCVN 7278-2:2003', 
 '6 < pH < 9,5 ở (20±2)°C, Phụ lục A.2 - TCVN 7278-1:2003; 6 < pH < 9,5 ở (20±2)°C, Phụ lục A.2 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Sức căng bề mặt', 
 '9 - TCVN 7278-1:2003; 9 - TCVN 7278-2:2003', 
 'Phụ lục A.2, Phụ lục E.2 - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục E.2 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Sức căng bề mặt phân giới giữa dung dịch tạo bọt và xyclohexan', 
 '10 - TCVN 7278-1:2003; 10 - TCVN 7278-2:2003', 
 'Phụ lục A.2, Phụ lục E.3 - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục E.3 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Hệ số lan truyền của dung dịch tạo bọt trên xyclohexan', 
 '11 - TCVN 7278-1:2003; 11 - TCVN 7278-2:2003', 
 'Phụ lục A.2, Phụ lục E.4 - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục E.4 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Độ nở', 
 '12.1 - TCVN 7278-1:2003; 12.1 - TCVN 7278-2:2003; 12.2 - TCVN 7278-2:2003', 
 'Phụ lục A.2, Phụ lục G.1.4; Phụ lục F - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục G.1.4; Phụ lục F1 - TCVN 7278-2:2003; Phụ lục A.2, Phụ lục G.1.4; Phụ lục F2 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Độ tiết nước', 
 '12.2 - TCVN 7278-1:2003', 
 'Phụ lục A.2, Phụ lục G.1.4; Phụ lục F - TCVN 7278-1:2003',
 NOW(), 
 NOW()
),
('Hiệu quả dập cháy, phun nhẹ', 
 '13 - TCVN 7278-1:2003; 13.1 - TCVN 7278-2:2003', 
 'Theo Bảng 1, Phụ lục G1 và Phụ lục G2 - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục G.1.4, Bảng 1, Phụ lục G1 và G2 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
),
('Hiệu quả dập cháy, phun mạnh', 
 '13 - TCVN 7278-1:2003; 13.2 - TCVN 7278-2:2003', 
 'Bảng 1, Phụ lục G1 và Phụ lục G3 - TCVN 7278-1:2003; Phụ lục A.2, Phụ lục G.1.4, Bảng 1, Phụ lục G1 và G3 - TCVN 7278-2:2003',
 NOW(), 
 NOW()
 ),

-- 2.3.3 Chất phụ gia chữa cháy (chất chữa cháy gốc nước)
('Tính chất vật lý (Độ trộn lẫn; Độ pH; Độ nhớt)', 
 '4.1.1 TCVN 13457-1:2022', 
 '4.2 TCVN 13457-1:2022',
 NOW(), 
 NOW()
),
('Độ ổn định (*)', 
 '4.1.2 TCVN 13457-1:2022', 
 '4.3 TCVN 13457-1:2022',
 NOW(), 
 NOW()
),
('Yêu cầu khả năng dập tắt đám cháy loại A (đám cháy ván gỗ hoặc cũi gỗ)', 
 '5.1 TCVN 13457-1:2022; 5.2', 
 '5.3 TCVN 13457-1:2022',
 NOW(), 
 NOW()
),
('Yêu cầu khả năng dập tắt đám cháy loại B (đám cháy chảy tràn hoặc đám cháy trong bể chứa; trung hoà nhiên liệu)', 
 '6.1 TCVN 13457-1:2022; 6.2, 6.3, 6.7 TCVN 13457-1:2022', 
 '6.1 TCVN 13457-1:2022; 6.2, 6.3, 6.7 TCVN 13457-1:2022',
 NOW(), 
 NOW()
)
