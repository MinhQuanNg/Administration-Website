INSERT INTO public.criteria(
	name, "requirementLevel", method, "createdAt", "updatedAt")
VALUES 
-- 2.7.1 Chiếu sáng thoát hiểm khẩn cấp(Đèn chỉ dẫn thoát nạn)
('Ký hiệu chỉ dẫn', 
 '8.6 và 10 ISO 3864-1:2011', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Màu sắc', 
 'Màu nền: Màu xanh lá cây Biểu tượng đồ họa: Trắng Đường viền: Màu trắng Màu xanh lá cây an toàn phải bao phủ ít nhất 50% diện tích của biển báo. Tọa độ màu sắc được quy ước phụ lục A ISO 3864-1:2011', 
 'Đo màu quang phổ tại vị trí có độ chói lớn nhất của màu an toàn và màu tương phản', 
 NOW(), NOW()),

('Khởi động', 
 'Đèn có thể tự khởi động khẩn cấp khi nguồn điện chính bị mất mà không cần kích hoạt các thiết bị hỗ trợ', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Yêu cầu về mạch điện của đèn', 
 'Việc hỏng một đèn điện bất kỳ không ảnh hưởng đến các đèn điện khác nối với cùng mạch', 
 'Thử nghiệm ngắt 01 bóng bất kỳ trên đèn và kiểm tra bằng trực quan các đèn còn lại trong mạch điện', 
 NOW(), NOW()),

('Yêu cầu về nguồn chiếu sáng dùng điện', 
 'Màu sắc phải là màu xanh lá cây; khi một chỉ thị cung cấp 02 chức năng thì chấp nhận cả màu đỏ và xanh lá cây', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Yêu cầu về dây dẫn điện đi bên trong và bên ngoài', 
 'Các mối nối điện đến nguồn lưới, giữa các phần riêng lẻ của đèn (ví dụ hộp điều khiển từ xa) và giữa các thành phần của đèn phải được bảo vệ chống rủi ro bị ngắt ngẫu nhiên. Đấu nối phích cắm và ổ cắm bên trong không có phương tiện để ngăn bị ngắt ngẫu nhiên được chấp nhận nếu không thể tiếp cận trực tiếp với chúng (ví dụ được bảo vệ bằng nắp đậy mà không thể tháo ra khi dùng một tay thực hiện một động tác).
Đấu nối phích cắm và ổ cắm bên ngoài không có phương tiện để ngăn bị ngắt ngẫu nhiên được chấp nhận nếu đèn có cảnh báo: “Đèn này chỉ được thiết kế để lắp ở những nơi phích cắm và ổ cắm được bảo vệ để không bị rút ra khi không được phép”', 
 'Kiểm tra bằng trực quan, thao tác', 
 NOW(), NOW()),

('Yêu cầu về nhiệt và độ bền (*)', 
 'Sau thử nghiệm, đèn phải được kiểm tra bằng mắt. Các linh kiện của đèn phải làm việc bình thường, không có bộ phận nào bị biến dạng, ghi nhãn của đèn vẫn phải rõ ràng. Đèn sau khi thử nghiệm độ bền phải tiếp tục duy trì thời gian chiếu sáng tối thiểu 2 h bằng nguồn điện dự phòng sau chu kỳ thử nghiệm thứ 10 (chu kỳ nạp 30 h).',
 'Đèn phải được lắp đặt trong hộp nhiệt được khống chế nhiệt độ để đảm bảo môi trường thử. Đèn phải được định vị trên bề mặt đỡ (và ở cùng tư thế làm việc) tương tự như trong thử nghiệm nhiệt làm việc bình thường. Nhiệt độ môi trường thử phải được duy trì trong phạm vi ±2°C của (ta + 10)°C trong quá trình thử nghiệm; ta là 25 °C trừ khi có ghi nhãn khác trên đèn. Nhiệt độ môi trường phải được đo theo Phụ lục K tại TCVN 7722-1 (IEC 60598-1). Ba-lát dùng để làm việc riêng rẽ với đèn phải được làm việc ở nhiệt độ bao quanh là 25 °C ± 5 °C. Đèn phải được thử nghiệm trong thời gian tổng cộng là 390 h, gòm 10 chu kỳ 36 h liên tiếp và thời gian hoạt động bình thường cuối cùng là 30 giờ, ở điện áp cung cấp danh định lớn nhất.
Đèn phải được cho hoạt động bình thường ở điện áp nguồn lớn nhất trong 30 h và trong 6 h ở chế độ khẩn cấp, trong từng chu kỳ trong số 10 chu kỳ (thời gian của chu kỳ có thể thay đổi phụ thuộc số giờ tối đa được nạp đủ công suất và duy trì chiếu sáng theo công bố của nhà sản xuất bằng nguồn dự phòng của đèn)
',
 NOW(), NOW()),

('Yêu cầu đóng cắt đột ngột (*)', 
 'Đèn hoạt động bình thường sau thử nghiệm.',
 'Phải hoạt động bình thường trong 50 thao tác đóng cắt điện áp nguồn khi pin được nạp đầy ở chu kỳ thử 11 sau thử nghiệm độ bền. Từng thao tác đóng cắt gồm giai đoạn nối với nguồn cung cấp danh định bình thường trong 60 s và ngắt khỏi nguồn trong 20 s.', 
 NOW(), NOW()),

('Yêu cầu về Pin/Ac-qui', 
 'Pin/acqui lắp trong đèn chiếu sáng khẩn cấp phải là một trong các kiểu sau: Niken cadmi gắn kín hoặc Chì axit được điều chỉnh bằng van, hoặc loại pin sạc đảm bảo tính an toàn tương đương trở lên', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Độ tương phản, độ chói và màu quang phổ (*)', 
 'Đèn phải cung cấp đủ độ chói danh định tại thời điểm cuối của thời gian làm việc danh định. Độ chói nhỏ nhất của mọi diện tích màu an toàn của ký hiệu đèn phải là 2 cd/m², nếu nguy cơ chính là khói, thì độ chói nhỏ nhất phải là 10 cd/m²; Độ đồng đều của độ chói trong màu an toàn và màu tương phản, được đo bằng tỷ số giữa độ chói tối thiểu và tối đa trong màu, phải lớn hơn 1:5 (xem ISO 3864-1:2011). Nếu độ chói của biển báo an toàn lớn hơn 100 cd/m², tỷ lệ độ chói tối thiểu và tối đa trong màu phải lớn hơn 1:10. Tỷ lệ độ sáng Màu tương phản với độ sáng lân cận Màu an toàn không được nhỏ hơn 5:1 và không lớn hơn 15:1.', 
 'Khi hoàn thành thử nghiệm trong hộp nhiệt, đèn phải được để nguội về nhiệt độ môi trường danh định (ta) hoặc 25°c chọn giá trị cao hơn và phải chịu chu kỳ nạp điện 24 h ở 0,9 lần điện áp nguồn danh định. Sử dụng thiết bị đo độ chói. Các phép đo thực hiện trên 05 mẫu thử nghiệm, kết quả đo được là giá trị trung bình của 05 phép đo trên các mẫu thử khác nhau.',
 NOW(), NOW()),

--  2.7.2 Chiếu sáng dự phòng (Đèn chiếu sáng sự cố)
('Khởi động', 
 'Đèn có thể tự khởi động khẩn cấp khi nguồn điện chính bị mất mà không cần kích hoạt các thiết bị hỗ trợ', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Yêu cầu về mạch điện của đèn', 
 'Việc hỏng một đèn điện bất kỳ không ảnh hưởng đến các đèn điện khác nối với cùng mạch', 
 'Thử nghiệm ngắt 01 bóng bất kỳ trên đèn và Kiểm tra bằng trực quan các đèn còn lại trong mạch điện', 
 NOW(), NOW()),

('Chỉ thị về nguồn chiếu sáng dùng điện', 
 'Màu sắc phải là màu xanh lá cây; khi một chỉ thị cung cấp 02 chức năng thì chấp nhận cả màu đỏ và xanh lá cây', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Yêu cầu về dây dẫn điện đi bên trong và bên ngoài', 
 'Các mối nối điện đến nguồn lưới, giữa các phần riêng lẻ của đèn (ví dụ hộp điều khiển từ xa) và giữa các thành phần của đèn phải được bảo vệ chống rủi ro bị ngắt ngẫu nhiên. Đấu nối phích cắm và ổ cắm bên trong không có phương tiện để ngăn bị ngắt ngẫu nhiên được chấp nhận nếu không thể tiếp cận trực tiếp với chúng (ví dụ được bảo vệ bằng nắp đậy mà không thể tháo ra khi dùng một tay thực hiện một động tác). Đấu nổi phích cắm và ổ cắm bên ngoài không có phương tiện để ngăn bị ngắt ngẫu nhiên được chấp nhận nếu đèn có cảnh báo: “Đèn này chỉ được thiết kế để lắp ở những nơi phích cắm và ổ cắm được bảo vệ để không bị rút ra khi không được phép”', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Yêu cầu về nhiệt và độ bền (*)', 
 'Sau thử nghiệm, đèn phải được kiểm tra được bằng mắt. Các linh kiện của đèn phải làm việc bình thường, không có bộ phận nào bị biến dạng, ghi nhãn của đèn vẫn phải rõ ràng. Đèn sau khi thử nghiệm độ bền phải tiếp tục duy trì thời gian chiếu sáng tối thiểu 2 h bằng nguồn điện dự phòng. Sau chu kỳ thử nghiệm thứ 10 (chu kỳ nạp 30 h).',
 'Đèn phải được lắp đặt trong hộp nhiệt được khống chế nhiệt độ đề đảm bảo môi trường thử.
Đèn phải được định vị trên bề mặt đỡ (và ở cùng tư thế làm việc) tương tự như trong thử nghiệm nhiệt làm việc bình thường. Nhiệt độ môi trường thử phải được duy trì trong phạm vi ±2°c của (ta + 10)°C trong quá trình thử nghiệm; ta là 25 °C trừ khi cỏ ghi nhãn khác trên đèn. Nhiệt độ môi trường phải được đo theo Phụ lục K tại TCVN 7722-1 (IEC 60598-1). Ba-lát dùng để làm việc riêng rẽ với đèn phải được làm việc ở nhiệt độ bao quanh là 25 °C ± 5 °C.
Đèn phải được thử nghiệm trong thời gian tổng cộng là 390 h, gồm 10 chu ky 36 h liên tiếp và thời gian hoạt động bình thường cuối cùng là 30 h, ở điện áp cung cấp danh định lớn nhất.
Đèn phải được cho hoạt động bình thường ở điện áp nguồn lớn nhất trong 30 h và trong 6 h ở chế độ khẩn cấp, trong từng chu kỳ trong số 10 chu kỳ (thời gian của chu kỳ có thể thay đổi phụ thuộc số giờ tối đa để nạp đủ công suất và duy trì chiếu sáng theo công bố của nhà sản xuất bằng nguồn dự phòng của đèn)
',
 NOW(), NOW()),

 ('Yêu cầu về đóng cắt đột ngột (*)', 
 'Đèn hoạt động bình thường sau thử nghiệm',
 'Phải hoạt động bình thường trong 50 thao tác đóng cắt điện áp nguồn khi pin được nạp đầy ở chu kỳ thử 11 sau thử nghiệm độ bền. Từng thao tác đóng cắt gòm giai đoạn nối với nguồn cung cấp danh định bình thường trong 60 s và ngắt khỏi nguồn trong 20 s.', 
 NOW(), NOW()),

('Yêu cầu về Pin/Ac-qui', 
 'Pin/acqui lắp trong đèn chiếu sáng khẩn cấp phải là một trong các kiểu sau: Niken cadmi gắn kín hoặc Chì axit được điều chỉnh bằng van, hoặc loại pin sạc đảm bảo tính an toàn tương đương trở lên', 
 'Kiểm tra bằng trực quan', 
 NOW(), NOW()),

('Yêu cầu về quang thông và độ hoàn màu (CRI) (*)', 
 'Đèn phải cung cấp đủ quang thông danh định tại thời điểm cuối của thời gian làm việc danh định; Độ hoàn màu của đèn trong suốt thời gian làm việc danh định phải > 40. ', 
 'Khi hoàn thành thử nghiệm trong hộp nhiệt, đèn phải được để nguội về nhiệt độ môi trường danh định (ta) hoặc 25°C chọn giá trị cao hơn và phải chịu chu kỳ nạp điện 24 h ở 0,9 lần điện áp nguồn danh định. 
 Sử dụng thiết bị đo quang thông và độ hoàn màu. Các phép đo thực hiện trên 05 mẫu thử nghiệm, kết quả đo được là giá trị trung bình của 05 phép đo trên các mẫu thử khác nhau.', 
 NOW(), NOW())




 



