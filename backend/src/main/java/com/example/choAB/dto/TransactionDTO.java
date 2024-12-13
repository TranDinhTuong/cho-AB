package com.example.choAB.dto;

import lombok.Data;

@Data
public class TransactionDTO {
    private Long id;
    private String amount; // số tiền
    private String transaction_date; // ngày giao dịch
    private String type; // loại giao dịch
    private MembershipPackageDTO membershipPackage;
}
