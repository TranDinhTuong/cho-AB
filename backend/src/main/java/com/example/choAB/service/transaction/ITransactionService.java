package com.example.choAB.service.transaction;

import com.example.choAB.dto.TransactionDTO;
import com.example.choAB.model.Category;
import com.example.choAB.model.Transaction;
import com.example.choAB.request.TransactionRequest;

import java.util.List;

public interface ITransactionService {
    Transaction getTransactionById(Long id);
    List<Transaction> getTransactionByType(String type);
    List<Transaction> getAllTransactions(Long userId);
    Transaction addTransaction(TransactionRequest transaction, Long userId);
    void deleteTransactionById(Long id);

    TransactionDTO convertToDTO(Transaction transaction);
}
