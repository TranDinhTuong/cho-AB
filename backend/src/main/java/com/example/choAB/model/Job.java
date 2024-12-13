package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    public Job(String companyName, int quantity, String industry, String jobType, String salaryType,
               BigDecimal minSalary, BigDecimal maxSalary, int minAge, int maxAge,
               String gender, String educationLevel, String experience, String certificates, Post post) {
        this.companyName = companyName;
        this.quantity = quantity;
        this.industry = industry;
        this.jobType = jobType;
        this.salaryType = salaryType;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.gender = gender;
        this.educationLevel = educationLevel;
        this.experience = experience;
        this.certificates = certificates;
        this.post = post;
    }
}
