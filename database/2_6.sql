INSERT INTO public.criteria(
	name, "requirementLevel", method, "createdAt", "updatedAt")
VALUES 
-- 2.6.1 Đầu phun kín (Sprinkler)
('Kiểm tra sơ bộ', '5 TCVN 6305-1:2007', '7.2 TCVN 6305-1:2007', NOW(), NOW()),
('Đo kích thước', '6.1 TCVN 6305-1:2007', '7.3 TCVN 6305-1:2007', NOW(), NOW()),
('Thử tải trọng làm việc và độ bền của thân', '6.6.1 TCVN 6305-1:2007', '7.4 TCVN 6305-1:2007', NOW(), NOW()),
('Khả năng chống rò rỉ và độ bền thủy tĩnh', '5, 6.8 TCVN 6305-1:2007', '7.5 TCVN 6305-1:2007', NOW(), NOW()),
('Chức năng', '6.5.1 TCVN 6305-1:2007', '7.6 TCVN 6305-1:2007', NOW(), NOW()),
('Nhiệt độ làm việc', '6.3 TCVN 6305-1:2007', '7.7 TCVN 6305-1:2007', NOW(), NOW()),
('Sự tàng nhiệt động lực học và hệ số dẫn (*)', '6.14 TCVN 6305-1:2007', '7.7.2 TCVN 6305-1:2007', NOW(), NOW()),
('Khả năng chịu nhiệt', '6.9 TCVN 6305-1:2007', '7.8.1 TCVN 6305-1:2007', NOW(), NOW()),
('Thay đổi nhiệt độ đột ngột (sốc nhiệt)', '6.10 TCVN 6305-1:2007', '7.9 TCVN 6305-1:2007', NOW(), NOW()),
('Lưu lượng nước', '6.4.1 TCVN 6305-1:2007', '7.11 TCVN 6305-1:2007', NOW(), NOW()),
('Phân bố nước', '6.4.2 TCVN 6305-1:2007', '7.12 TCVN 6305-1:2007', NOW(), NOW()),
('Ăn mòn do sương muối (*)', '6.11.3 TCVN 6305-1:2007', '7.13.3 TCVN 6305-1:2007', NOW(), NOW()),
('Thử ăn mòn do sunfua đioxit (*)', '6.11.2 TCVN 6305-1:2007', '7.13.2 TCVN 6305-1:2007', NOW(), NOW()),
('Độ bền chịu nhiệt (đối với Sprinkler mở nhanh) (*)', '6.15 TCVN 6305-1:2007', '7.15 TCVN 6305-1:2007', NOW(), NOW()),
('Va đập thủy lực', '6.13 TCVN 6305-1:2007', '7.16 TCVN 6305-1:2007', NOW(), NOW()),
('Thử rung', '6.16 TCVN 6305-1:2007', '7.17 TCVN 6305-1:2007', NOW(), NOW()),
('Va đập', '6.17 TCVN 6305-1:2007', '7.18 TCVN 6305-1:2007', NOW(), NOW()),
('Thử phản ứng nhiệt độ đối với sprinkler lắp chìm có nắp đậy, sprinkler trần và sprinkler lắp chìm (*)', '6.24 TCVN 6305-1:2007', '7.25 TCVN 6305-1:2007', NOW(), NOW()),

-- 2.6.2 Đầu phun hở (Drencher)
('Kiểm tra sơ bộ', '4.5 TCVN 6305-1:2007', '7.2 TCVN 6305-1:2007', NOW(), NOW()),
('Đo kích thước', '7.3 TCVN 6305-1:2007', '7.3 TCVN 6305-1:2007', NOW(), NOW()),
('Lưu lượng nước', '6.4.1 TCVN 6305-1:2007', '7.11 TCVN 6305-1:2007', NOW(), NOW()),
('Phân bố nước', '6.4.2 TCVN 6305-1:2007', '7.12 TCVN 6305-1:2007', NOW(), NOW()),
('Ăn mòn do sương muối (*)', '6.11.3 TCVN 6305-1:2007', '7.13.3 TCVN 6305-1:2007', NOW(), NOW()),
('Thử ăn mòn do sunfua đioxit (*)', '6.11.2 TCVN 6305-1:2007', '7.13.2 TCVN 6305-1:2007', NOW(), NOW()),
('Độ bền chịu nhiệt', '6.15 TCVN 6305-1:2007', '7.15 TCVN 6305-1:2007', NOW(), NOW()),
('Thử rung', '6.16 TCVN 6305-1:2007', '7.17 TCVN 6305-1:2007', NOW(), NOW()),
('Thử va đập', '6.17 TCVN 6305-1:2007', '7.18 TCVN 6305-1:2007', NOW(), NOW()),

-- 2.6.3 Van báo động (Alarm Valve)
('Ngoại quan', 'Không tồn tại các điểm rạn, vỡ, nứt, gãy', 'Kiểm tra bằng trực quan', NOW(), NOW()),
('Lò xo và màng (*)', '4.7.6 TCVN 6305-2:2007', '6.2 TCVN 6305-2:2007', NOW(), NOW()),
('Sức chịu đựng', '4.13 TCVN 6305-2:2007', 'Sử dụng thiết bị thử mô tả trong 6.11.2.2 theo TCVN 6305-2:2007, điều chỉnh lưu lượng tới giá trị thích hợp cho trong Bảng 1 TCVN 6305-2:2007, với dung sai (+5%) cho dòng nước với lưu lượng được hiệu chỉnh chảy qua van trong thời gian 30 (+5) phút', NOW(), NOW()),
('Tổn thất thủy lực do ma sát (*)', '4.12 TCVN 6305-2:2007', '6.7 TCVN 6305-2:2007', NOW(), NOW()),
('Rò rỉ và biến dạng của van (*)', '4.8 TCVN 6305-2:2007', '6.8 TCVN 6305-2:2007', NOW(), NOW()),
('Độ bền của thân (*)', '4.5 TCVN 6305-2:2007', '6.9 TCVN 6305-2:2007', NOW(), NOW()),
('Khả năng chịu tác động của ngọn lửa (*)', '4.4.3 TCVN 6305-2:2007', '6.10 TCVN 6305-2:2007', NOW(), NOW()),
('Yêu cầu về vận hành', '4.7.7; 4.14.6; 4.16 TCVN 6305-2:2007; Các chi tiết bịt kín của van báo động kiểu ướt không bị rò rỉ, hư hỏng sau khi hoàn thành các phép thử. Đối với phép thử tỷ lệ, ngoài yêu cầu 4.16.1 TCVN 6305-2:2007, van phải tuân theo các yêu cầu trong 4.14.7 TCVN 6305-2:2007', '6.11 TCVN 6305-2:2007', NOW(), NOW()),
('Cấu tạo và độ nghe rõ của chuông nước (nếu có)', '4.18 TCVN 6305-2:2007', 'Kiểm tra cấu tạo bằng trực quan; Kiểm tra độ nghe rõ 6.12.2 TCVN 6305-2:2007, tiếng chuông phải nghe được rõ ở khoảng cách 3m, trong điều kiện cường độ âm thanh nền không vượt quá 60 dBA', NOW(), NOW()),

-- 2.6.4 Van tràn ngập (Deluge Valve)
('Ngoại quan', 
 'Không tồn tại các điểm rạn, vỡ, nứt, gãy', 
 'Kiểm tra bằng trực quan',
  NOW(), NOW()),

('Lò xo và màng chắn (*)', 
 '4.7.6 TCVN 6305-5:2009',
 '6.2 TCVN 6305-5:2009',
  NOW(), NOW()),

('Tổn thất thủy lực do ma sát (*)',
 '4.12 TCVN 6305-5:2009',
 '6.6 TCVN 6305-5:2009',
  NOW(), NOW()),

('Rò rỉ và biến dạng (*)',
 '4.8 TCVN 6305-5:2009',
 '6.7 TCVN 6305-5:2009',
  NOW(), NOW()),

('Độ bền của thân van (*)',
 '4.5.1 TCVN 6305-5:2009',
 '6.8 TCVN 6305-5:2009',
  NOW(), NOW()),

('Khả năng chịu tác động của ngọn lửa (*)',
 '4.4.3 TCVN 6305-5:2009',
 '6.9 TCVN 6305-5:2009',
  NOW(), NOW()),

('Yêu cầu về vận hành',
 '4.7.7; 4.10.4; 4.14:4.16 TCVN 6305-5:2009',
 '6.10 TCVN 6305-5:2009',
  NOW(), NOW()),

('Độ bền',
 '4.13 TCVN 6305-5:2009',
 '6.11 TCVN 6305-5:2009',
  NOW(), NOW()),

('Khả năng chống đóng lại (*)',
 '4.7.7 TCVN 6305-5:2009',
 '6.12 TCVN 6305-5:2009',
 NOW(), NOW()),

('Chống ăn mòn (*)',
 '4.11.7 TCVN 6305-5:2009',
 '6.13 TCVN 6305-5:2009';
 NOW(), NOW()),

-- 2.6.5 Ống mềm bằng kim loại kết nối đầu phun trong hệ thống chữa cháy bằng nước
('Cấu trúc, hình thức, kích thước', 
 '4 TCVN 13455:2022', 
 '• Kiểm tra bằng trực quan; <br> • Thước đo phù hợp 4,6.1 TCVN 13455:2022',
 NOW(), NOW()),

('Áp suất làm việc', 
 '5.1 TCVN 13455:2022', 
 'Tài liệu kỹ thuật',
 NOW(), NOW()),

('Vật liệu chế tạo (*)', 
 '5.2 TCVN 13455:2022', 
 '6.2 TCVN 13455:2022',
 NOW(), NOW()),

('Khả năng chịu áp suất thủy lực', 
 '5.3 TCVN 13455:2022', 
 '6.1, 6.3, 6.4 TCVN 13455:2022',
 NOW(), NOW()),

('Biến dạng theo chiều dài', 
 '5.4 TCVN 13455:2022', 
 '6.1, 6.5 TCVN 13455:2022',
 NOW(), NOW()),

('Khả năng chịu rung', 
 '5.5 TCVN 13455:2022', 
 '6.1, 6.6 TCVN 13455:2022',
 NOW(), NOW()),

('Độ linh hoạt', 
 '5.6 TCVN 13455:2022', 
 '6.1, 6.7 TCVN 13455:2022',
 NOW(), NOW()),

('Khả năng chịu va đập thủy lực', 
 '5.7 TCVN 13455:2022', 
 '6.1, 6.8 TCVN 13455:2022',
 NOW(), NOW()),

('Khả năng chịu nén bẹp', 
 '5.8 TCVN 13455:2022', 
 '6.1, 6.9 TCVN 13455:2022',
 NOW(), NOW()),

('Tổn thất áp suất', 
 '5.9 TCVN 13455:2022', 
 '6.1, 6.10 TCVN 13455:2022';
 NOW(), NOW()),

-- 2.6.6 ống phi kim loại sử dụng cho hệ thống cấp nước chữa cháy
('Kích thước, ngoại quan', 
 '5.2, 6.1, 6.2 TCVN 12653-1:2019 <br> 5.1.3 TCVN 12653-2:2019 <br> 6.2, 6.3, 6.4 TCVN 12653-1:2019', 
 '',
 NOW(), NOW()),

('Áp suất và nhiệt độ làm việc', 
 '7.1 TCVN 12653-1:2019', 
 'Tài liệu kỹ thuật',
NOW(), NOW()),

('Độ co chiều dài do nhiệt (*)', 
 '7.2 TCVN 12653-1:2019', 
 '7.2 TCVN 12653-1:2019',
NOW(), NOW()),

('Nhiệt độ mềm hóa Vicat', 
 '7.3 TCVN 12653-1:2019', 
 '5.1.5 TCVN 12653-2:2019',
NOW(), NOW()),

('Khối lượng riêng', 
 '7.4 TCVN 12653-1:2019', 
 '5.1.6 TCVN 12653-2:2019',
NOW(), NOW()),

('Tính cháy', 
 '7.5 TCVN 12653-1:2019', 
 '6 TCVN 12653-2:2019',
NOW(), NOW()),

('Tính chịu lửa', 
 '7.6 TCVN 12653-1:2019', 
 '7 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng chịu nhiệt theo chu kỳ (*)', 
 '7.7 TCVN 12653-1:2019', 
 '21 TCVN 12653-2:2019',
NOW(), NOW()),

('Hệ số ma sát ống (*)', 
 '7.8 TCVN 12653-1:2019', 
 '9 TCVN 12653-2:2019',
NOW(), NOW()),

('Chiều dài ống tương đương của phụ tùng (tổn thất áp suất của phụ kiện) (*)', 
 '7.9 TCVN 12653-1:2019', 
 '10 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng chịu ăn mòn đối với phần thép không gỉ (*)', 
 '7.10.1 TCVN 12653-1:2019', 
 '12 TCVN 12653-2:2019',
NOW(), NOW()),

('Độ bền của nhãn (*)', 
 '7.11 TCVN 12653-1:2019', 
 '24 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng chống rò rỉ và chịu áp suất thủy tĩnh ngắn hạn', 
 '8.1.1 TCVN 12653-1:2019', 
 '5.1.8, 8 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng chống rò rỉ và chịu áp suất thủy tĩnh theo điều kiện sau khi lắp đặt (*)', 
 '8.1.2 TCVN 12653-1:2019', 
 '19 TCVN 12653-2:2019',
NOW(), NOW()),

('Độ bền chịu uốn (*)', 
 '8.3 TCVN 12653-1:2019', 
 '13 TCVN 12653-2:2019',
NOW(), NOW()),

('Độ bền chịu va đập', 
 '8.4 TCVN 12653-1:2019', 
 '5.1.7, 14 TCVN 12653-2:2019',
NOW(), NOW()),

('Độ bền chịu nén bẹp (*)', 
 '8.5 TCVN 12653-1:2019', 
 '15 TCVN 12653-2:2019',
NOW(), NOW()),

('Cường độ chịu kéo (*)', 
 '8.6 TCVN 12653-1:2019', 
 '8.6 TCVN 12653-1:2019',
NOW(), NOW()),

('Khả năng chịu rung (*)', 
 '8.8 TCVN 12653-1:2019', 
 '16 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng đảm bảo hoạt động của Sprinkler áp suất cao (*)', 
 '8.9 TCVN 12653-1:2019', 
 '17 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng chống gãy gập', 
 '8.10 TCVN 12653-1:2019', 
 '5.1.4; 18 TCVN 12653-2:2019',
NOW(), NOW()),

('Khả năng chịu áp suất theo chu kỳ (*)', 
 '8.11 TCVN 12653-1:2019', 
 '20 TCVN 12653-2:2019';
NOW(), NOW()),



