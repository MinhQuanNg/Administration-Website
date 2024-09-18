-- 2.1.1 Máy bơm ly tâm chữa cháy loại cố định dùng động cơ điện
INSERT INTO public.criteria(
	name, "requirementLevel", method, "createdAt", "updatedAt")
VALUES 
('Lưu lượng, áp suất, tốc độ vòng quay của bơm', 
 'Theo TCVN 4208:2009', 
 'Lắp đặt máy bơm trên hệ thống thử nghiệm đảm bảo độ ổn định vận hành theo 5.4.2 TCVN 9222:2012; Vận hành máy bơm, đo tại các điểm làm việc trên đường đặc tính theo 6.3.4.1 TCVN 8531:2010; Xác định lưu lượng và cột áp toàn phần theo 3.19 và 6.1.2 TCVN 9222:2012',
 NOW(), 
 NOW()
),
('Xác định dòng điện làm việc của động cơ ở 110% mức lưu lượng lớn nhất', 
 'Không xuất hiện sự quá tải trên động cơ', 
 'Lắp đặt máy bơm trên hệ thống thử nghiệm đảm bảo độ ổn định vận hành theo 5.4.2 TCVN 9222:2012; Đo cường độ dòng điện làm việc trên các pha tại điểm làm việc 110% lưu lượng',
 NOW(), 
 NOW()
),
('Độ kín của buồng bơm', 
 'Không xuất hiện rò rỉ tại áp suất thử trong thời gian một phút (thử nghiệm với áp suất tối đa khi đóng kín họng ra)', 
 'Kiểm tra trực quan: Khởi động và từ từ đóng họng ra của máy bơm, quan sát đồng hồ đo áp suất để chọn điểm làm việc có áp suất tối đa, duy trì máy bơm làm việc tại điểm đó và kiểm tra vỏ bơm',
 NOW(), 
 NOW()
),

-- 2.1.2 Máy bơm ly tâm chữa cháy loại cố định dùng đông cơ đôt trong
('Lưu lượng, áp suất, tốc độ vòng quay của bơm', 
 '2.3 TCVN 4208: 2009', 
 'Lắp đặt máy bơm trên hệ thống thử nghiệm đảm bảo độ ổn định vận hành theo 5.4.2 TCVN 9222:2012; Vận hành máy bơm, để máy bơm hoạt động ổn định và đo tại các điểm làm việc trên đường đặc tính theo 6.3.4.1 TCVN 8531:2010; Xác định lưu lượng và cột áp toàn phần theo 3.19 và 6.1.2 TCVN 9222:2012;',
 NOW(), 
 NOW()
),
('Xác định khả năng làm việc của động cơ ở 110% mức lưu lượng lớn nhất (đối với máy bơm thiết kế làm việc tại 01 điểm)', 
 'Tốc độ vòng quay của động cơ không vượt quá 100% tốc độ vòng quay định mức', 
 'Lắp đặt máy bơm trên hệ thống thử nghiệm đảm bảo độ ổn định vận hành theo 5.4.2 TCVN 9222:2012; Đo thực tế tốc độ vòng quay tại điểm làm việc 110% lưu lượng;',
 NOW(), 
 NOW()
),
('Độ kín của buồng bơm', 
 'Không xuất hiện rò rỉ tại áp suất thử trong thời gian một phút (thử nghiệm với áp suất tối đa khi đóng kín họng ra)', 
 'Kiểm tra trực quan: Khởi động và từ từ đóng họng ra của máy bơm, quan sát đồng hồ đo áp suất để chọn điểm làm việc có áp suất tối đa, duy trì máy bơm làm việc tại điểm đó và kiểm tra vỏ bơm;',
 NOW(), 
 NOW()
),

-- 2.1.3 Bơm ly tâm chữa cháy loại khiêng tay dùng động cơ đốt trong
('Kích thước, khối lượng cơ bản', 
 '5, 6.1.11 TCVN 12110: 2018; Kích thước tổng thể các chiều của bơm phải phù hợp thông số kỹ thuật do nhà sản xuất công bố', 
 'Kiểm tra kích thước các chiều bằng thước đo có độ chính xác đến 1 mm; Kiểm tra kích thước, kích thước họng đẩy, họng hút bằng thước đo có sai số ± 0,1 mm; Kiểm tra khối lượng theo 7.2.4 TCVN 12110: 2018, sử dụng cân khối lượng có dải đo phù hợp, độ phân giải 0,5 kg',
 NOW(), 
 NOW()
),
('Yêu cầu chung', 
 '6.1.2, 6.1.3, 6.1.4, 6.1.5, 6.1.6, 6.1.7, 6.1.8, 6.1.9 TCVN 12110: 2018; 7.2.1, 7.2.2 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Lưu lượng, áp suất, tốc độ vòng quay của bơm', 
 '2.3 TCVN 4208: 2009 và Bảng 1 TCVN 12110: 2018', 
 'Lắp đặt máy bơm trên hệ thống thử nghiệm đảm bảo độ ổn định vận hành theo 5.4.2 TCVN 9222:2012; Vận hành máy bơm, để máy bơm hoạt động ổn định và đo tại các điểm làm việc trên đường đặc tính theo 6.3.4.1 TCVN 8531:2010; Xác định lưu lượng và cột áp toàn phần theo 3.19 và 6.1.2 TCVN 9222:2012;',
 NOW(), 
 NOW()
),
('Hệ thống nhiên liệu', 
 '6.2.2 TCVN 12110: 2018; 7.2.5 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Hệ thống làm mát', 
 '6.2.3 TCVN 12110: 2018; 7.2.6 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Hệ thống điện', 
 '6.2.4 TCVN 12110: 2018; 7.2.7 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Thiết bị giảm âm', 
 '6.2.5 TCVN 12110: 2018; 7.2.8 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Họng phun, họng hút', 
 '6.3.4, 6.3.5 TCVN 12110: 2018; 7.2.13 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Độ kín của buồng bơm', 
 '6.1.10 TCVN 12110: 2018; 7.2.3 TCVN 12110: 2018', 
 NULL,
 NOW(), 
 NOW()
),
('Chiều sâu hút tối đa', 
 '6.3.6 TCVN 12110: 2018', 
 'Thử nghiệm theo 7.2.15 TCVN 12110:2018, đo thực tế chiều sâu hút tại các điểm làm việc theo công bố của nhà sản xuất',
 NOW(), 
 NOW()
),
('Khả năng gây chân không mồi nước', 
 '6.3.6 TCVN 12110: 2018', 
 'Thử nghiệm theo 7.2.15 TCVN 12110:2018',
 NOW(), 
 NOW()
)