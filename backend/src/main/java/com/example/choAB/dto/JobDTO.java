package com.example.choAB.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class JobDTO {
    private Long id;
    private String companyName; // Tên doanh nghiệp
    private int quantity; // Số lượng tuyển dụng
    private String industry; // Ngành nghề
    private String jobType; // Loại công việc (full-time, part-time, freelance...)
    private String salaryType; // Hình thức trả lương (theo giờ, tháng, hợp đồng...)
    private BigDecimal minSalary; // Lương tối thiểu
    private BigDecimal maxSalary; // Lương tối đa
    private int minAge; // Độ tuổi tối thiểu
    private int maxAge; // Độ tuổi tối đa
    private String gender; // Giới tính (Nam, Nữ, Không yêu cầu)
    private String educationLevel; // Trình độ học vấn
    private String experience; // Kinh nghiệm làm việc
    private String certificates; // Chứng chỉ, kỹ năng nếu có
}
