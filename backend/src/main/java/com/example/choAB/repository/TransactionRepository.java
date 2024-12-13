package com.example.choAB.repository;

import com.example.choAB.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(String type);

    List<Transaction> findByUserId(Long userId);
}
