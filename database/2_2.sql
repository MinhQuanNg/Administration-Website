INSERT INTO public.criteria(
	name, "requirementLevel", method, "createdAt", "updatedAt")
VALUES 
-- 2.2.1 Vòi chữa cháy
    ('Chiều dài', '5.1 TCVN 5740:2023', '6.3 TCVN 5740:2023', '2024-01-01 10:00:00', '2024-01-02 10:00:00'),
    ('Đường kính trong', '5.2 TCVN 5740:2023', '6.4 TCVN 5740:2023', '2024-02-01 11:00:00', '2024-02-02 11:00:00'),
    ('Khối lượng', '5.3 TCVN 5740:2023', '6.5 TCVN 5740:2023', '2024-03-01 12:00:00', '2024-03-02 12:00:00'),
    ('Áp suất phá huỷ', '5.7 TCVN 5740:2023', '6.10 TCVN 5740:2023', '2024-04-01 13:00:00', '2024-04-02 13:00:00'),
    ('Độ dày lớp chống thấm', '5.4 TCVN 5740:2023', '6.6 TCVN 5740:2023', '2024-05-01 14:00:00', '2024-05-02 14:00:00'),
    ('Độ bền liên kết của lớp chống thấm bên trong với lớp định hình', '5.8 TCVN 5740:2023', '6.11 TCVN 5740:2023', '2024-06-01 15:00:00', '2024-06-02 15:00:00'),
    ('Kiểm tra độ kín', '6.8 TCVN 5740:2023', '6.8 TCVN 5740:2023', '2024-07-01 16:00:00', '2024-07-02 16:00:00'),
    ('Kiểm tra mức độ tổn thất nước để tạo ẩm c    ủa vòi đẩy chữa cháy bền nhiệt', '5.6 TCVN 5740:2023', '6.9 TCVN 5740:2023', '2024-08-01 17:00:00', '2024-08-02 17:00:00'),
    ('Đầu nối', 'TCVN 5739:2023', 'TCVN 5739:2023', '2024-09-01 18:00:00', '2024-09-02 18:00:00'),

-- 2.2.2 Lăng chữa cháy phun nước cầm tay
('Độ bền chống biến dạng và độ kín', 
 '5.1.6. TCVN 13261:2021', 
 '6.1 TCVN 13261:2021',
 NOW(), 
 NOW()
),
('Phổ phun', 
 '5.1.3 và 5.1.4 TCVN 13261:2021', 
 '6.2 và 6.3 TCVN 13261:2021',
 NOW(), 
 NOW()
),
('Lưu lượng', 
 '5.2.1.3 và 5.2.2.3 TCVN 13261:2021', 
 '6.2 và 6.3 TCVN 13261:2021',
 NOW(), 
 NOW()
),
('Độ bền chịu va đập', 
 '5.1.5 TCVN 13261:2021', 
 '6.4 TCVN 13261:2021',
 NOW(), 
 NOW()
),
('Khả năng chống ăn mòn', 
 '5.1.5 TCVN 13261:2021', 
 '6.5 TCVN 13261:2021; TCVN 8792:2011',
 NOW(), 
 NOW()
),

-- 2.2.3 Lăng phun bọt chữa cháy cầm tay
('Kiểm tra bên ngoài', 
 '5.1, 5.3 TCVN 13418:2022', 
 'Kiểm tra trực quan',
 NOW(), 
 NOW()
),
('Thử nghiệm độ võng của lưới', 
 '5.2 TCVN 13418:2022', 
 '6.2 TCVN 13418:2022',
 NOW(), 
 NOW()
),
('Thử nghiệm độ kín của khóa', 
 '5.3 TCVN 13418:2022', 
 '6.3 TCVN 13418:2022',
 NOW(), 
 NOW()
),
('Thử nghiệm thông số và chất lượng dòng bọt được tạo thành', 
 '5.1.2 TCVN 13418:2022', 
 '6.4 TCVN 13418:2022',
 NOW(), 
 NOW()
),
('Độ bền', 
 '5.6 TCVN 13418:2022', 
 '6.5 TCVN 13418:2022',
 NOW(), 
 NOW()
),

-- 2.2.4 Trụ nước chữa cháy
('Hệ số tổn hao áp suất trong trụ nước', 
 '4.1 TCVN 6379:1998', 
 '6.8 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Khả năng chịu áp suất', 
 '5.2 TCVN 6379:1998', 
 '6.10 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Độ kín của trụ nước', 
 '5.3 TCVN 6379:1998', 
 '6.11 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Momen xoay mở và đóng van trụ nước', 
 '5.3 TCVN 6379:1998', 
 '6.12 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Lượng nước đọng lại trong trụ', 
 '5.5 TCVN 6379:1998', 
 '6.14 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Thông số và kích thước hình học lỗ xả nước đọng', 
 '5.6 TCVN 6379:1998', 
 '6.15 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Ren ngoài của khớp nối với cột lấy nước của trụ ngầm', 
 '5.7 TCVN 6379:1998', 
 'TCVN 1917:1993',
 NOW(), 
 NOW()
),
('Sự phù hợp của họng chờ của trụ nổi với đầu nối', 
 '5.8 TCVN 6379:1998', 
 '6.7 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Ren trục van', 
 '5.9 TCVN 6379:1998', 
 '6.7 TCVN 6379:1998',
 NOW(), 
 NOW()
),
('Mối ghép ren giữa phần cánh van và thân van', 
 '5.10 TCVN 6379:1998', 
 'TCVN 1917:1993',
 NOW(), 
 NOW()
),
('Lớp sơn trụ nước', 
 '5.17 TCVN 6379:1998', 
 'Kiểm tra trực quan',
 NOW(), 
 NOW()
),
('Sự định vị của nắp trụ nước', 
 '5.19 TCVN 6379:1998', 
 '6.7 TCVN 6379:1998',
 NOW(), 
 NOW()
),

-- 2.2.5 Đầu nối chữa cháy
('Cấu tạo và kích thước cơ bản', 
 'Đầu nổi kiểu ngàm: 6.1 TCVN 5739:2023; Đầu nối kiểu cắm rút: 6.2 TCVN 5739:2023', 
 'Quan sát, đo đạc',
 NOW(), 
 NOW()
),
('Kiểm tra vòng đệm', 
 '6.3 TCVN 5739:2023', 
 '7.3 TCVN 5739:2023',
 NOW(), 
 NOW()
),
('Độ bền, độ kín', 
 '5.9 TCVN 5739:2023', 
 '7.2.1 TCVN 5739:2023',
 NOW(), 
 NOW()
),
('Độ bền va đập', 
 '5.3 TCVN 5739:2023', 
 '7.2.2 TCVN 5739:2023',
 NOW(), 
 NOW()
),
('Khả năng chịu ăn mòn', 
 '5.4 TCVN 5739:2023', 
 '7.2.3 TCVN 5739:2023',
 NOW(), 
 NOW()
),

-- 2.2.6 Bình chữa cháy xách tay (**)
('Yêu cầu kỹ thuật của chất chữa cháy', 
 'Phù hợp với 2.3 tại Quy chuẩn này (đối với bình chữa cháy sử dụng chất bột), trừ yêu cầu về khả năng dập cháy; Phù hợp với 2.3 tại Quy chuẩn này', 
 'N/A',
 NOW(), 
 NOW()
),
('Khả năng chịu áp suất đối với các bình chữa cháy áp suất thấp', 
 '6.1 TCVN 7026:2013', 
 '9.7.1 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Thời gian phun nhỏ nhất có hiệu quả và tầm phun xa', 
 '7.2.1.1, 7.2.2.1, 7.2.3.1 TCVN 7026:2013', 
 '7.2.1.2, 7.2.2.2, 7.2.3.2 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Độ bền đối với thay đổi nhiệt độ', 
 '7.3.1 TCVN 7026:2013', 
 '7.3.2 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Độ bền chịu va đập', 
 '7.5.1.1 TCVN 7026:2013', 
 '7.5.1.2 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Độ bền chịu rung động', 
 '7.5.2.1, 7.5.2.2 TCVN 7026:2013', 
 '7.5.2.1, 7.5.2.2 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Độ bền chịu ăn mòn', 
 '7.6.1, 7.6.2 TCVN 7026:2013', 
 '7.6.1, 7.6.2 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Tính năng đối với đám cháy thử', 
 '8.1 TCVN 7026:2013', 
 '8.2 đến 8.8 TCVN 7026:2013',
 NOW(), 
 NOW()
),

-- 2.2.7 Bình chữa cháy có bánh xe
('Yêu cầu kỹ thuật của chất chữa cháy', 
 'Phù hợp với 2.3 tại Quy chuẩn này (đối với bình chữa cháy sử dụng chất bột), trừ yêu cầu về khả năng dập cháy', 
 '2.3 Quy chuẩn này',
 NOW(), 
 NOW()
),
('Khả năng chịu áp suất đối với các bình chữa cháy áp suất thấp', 
 '3.2 TCVN 7027:2013', 
 '8.3.1.2 TCVN 7027:2013',
 NOW(), 
 NOW()
),
('Thời gian phun nhỏ nhất có hiệu quả và tầm phun xa', 
 '6.2.1.1, 6.2.1.2, 6.2.1.3 TCVN 7027:2013', 
 '6.2.2.2 TCVN 7027:2013',
 NOW(), 
 NOW()
),
('Độ bền đối với thay đổi nhiệt độ', 
 '6.3.1 TCVN 7027:2013', 
 '6.3.2 TCVN 7027:2013',
 NOW(), 
 NOW()
),
('Độ bền chống ăn mòn', 
 '6.6.1, 6.6.2 TCVN 7027:2013', 
 '6.6.1, 6.6.2 TCVN 7027:2013',
 NOW(), 
 NOW()
),
('Tính năng đối với đám cháy thử', 
 '7.1 TCVN 7027:2013', 
 '7.2 TCVN 7027:2013',
 NOW(), 
 NOW()
),

-- 2.2.8 Bình chữa cháy tự động kích hoạt - Bình bột loại treo (*'*)
('Yêu cầu kỹ thuật của chất chữa cháy', 
 'Phù hợp với 2.3.1 tại Quy chuẩn này, trừ yêu cầu về khả năng dập cháy', 
 'Phù hợp với 2.3 tại Quy chuẩn này',
 NOW(), 
 NOW()
),
('Nhiệt độ làm việc của bộ phận cảm biến nhiệt', 
 '6.3 TCVN 6305-1', 
 '7.7 TCVN 6305-1',
 NOW(), 
 NOW()
),
('Hiệu quả phun và thời gian phun', 
 '4.1.8 TCVN 12314-1:2018', 
 '5.4 TCVN 12314-1:2018',
 NOW(), 
 NOW()
),
('Hiệu quả dập tắt đám cháy', 
 '4.1.9 TCVN 12314-1:2018', 
 '5.5 TCVN 12314-1:2018',
 NOW(), 
 NOW()
),
('Loa phun và vòi phun', 
 '4.4 TCVN 12314-1:2018', 
 'Kiểm tra bằng trực quan',
 NOW(), 
 NOW()
),
('Nắp, van an toàn và áp kế hiển thị', 
 '4.5 TCVN 12314-1:2018', 
 'Nắp, van an toàn: Kiểm tra trực quan. Áp kế hiển thị theo 9.12 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Độ bền chịu ăn mòn', 
 '5.2.1, 5.5.2 TCVN 12314-1:2018', 
 '7.6.1 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Thử áp suất thủy tĩnh', 
 '5.3 TCVN 12314-1:2018', 
 '9.2.2 TCVN 7026:2013',
 NOW(), 
 NOW()
),
('Độ kín bình chữa cháy', 
 '5.6 TCVN 12314-1:2018', 
 '5.6 TCVN 12314-1:2018',
 NOW(), 
 NOW()
),

-- 2.2.9 Bình chữa cháy bằng khí tự động kích hoạt
('Yêu cầu kỹ thuật của chất khí chữa cháy', 
 '4.3.1; 4.3.2; 4.3.3 TCVN 12314-2:2022', 
 'Khí chữa cháy phải tuân theo các quy định nêu trong các phần tương ứng của TCVN 7161',
 NOW(), 
 NOW()
),
('Cụm van', 
 '4.4 TCVN 12314-2:2022', 
 '6.3.1; 6.3.2 TCVN 12314-2:2022',
 NOW(), 
 NOW()
),
('Bình chứa khí', 
 '4.2 TCVN 12314-2:2022', 
 '6.1; 6.2 TCVN 12314-2:2022',
 NOW(), 
 NOW()
),
('Bộ phận cảm biến nhiệt', 
 '4.5.2 TCVN 12314-2:2022', 
 '6.4 TCVN 12314-2:2022',
 NOW(), 
 NOW()
),
('Diện tích bảo vệ tối đa', 
 '4.1.1.3 TCVN 12314-2:2022', 
 'Phụ lục B, TCVN 12314-2:2022',
 NOW(), 
 NOW()
),
('Khả năng hoạt động tự động', 
 '4.1.2 TCVN 12314-2:2022', 
 'Phụ lục C, TCVN 12314-2:2022',
 NOW(), 
 NOW()
),
('Thời gian xả khí', 
 '4.1.1.1 TCVN 12314-2:2022', 
 'Dùng đồng hồ bấm giờ đo thời gian xả khí thực tế của bình chứa khí từ khi kích hoạt đến khi xả hết khí chữa cháy',
 NOW(), 
 NOW()
),
('Hiệu suất phun xả', 
 '4.1.1.2 TCVN 12314-2:2022', 
 'Ghi nhận khối lượng ban đầu của bình khí. Sau khi kích hoạt xả khí, cân lại, sau đó tính toán lượng khí còn lại so với lượng khí chứa ban đầu',
 NOW(), 
 NOW()
),
('Khả năng kết nối nhiều bình với nhau (yêu cầu đổi với bình khí có khả năng kết nối thành cụm bình)', 
 '4.1.4 TCVN 12314-2:2022', 
 '4.1.1.1 TCVN 12314-2:2022',
 NOW(), 
 NOW()
)