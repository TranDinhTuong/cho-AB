package com.example.choAB.service.transaction;

import com.example.choAB.model.Category;
import com.example.choAB.model.Transaction;

import java.util.List;

public interface ITransactionService {
    Transaction getTransactionById(Long id);
    List<Transaction> getTransactionByType(String type);
    List<Transaction> getAllTransactions();
    Transaction addTransaction(Transaction transaction);
    void deleteTransactionById(Long id);
}
