package com.example.choAB.request;

import com.example.choAB.model.MembershipPackage;
import com.example.choAB.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransactionRequest {

    private String amount;
    private String type;
    private Long membershipPackageId;
}
