package com.example.choAB.service.transaction;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.MembershipPackage;
import com.example.choAB.model.Transaction;
import com.example.choAB.repository.MembershipPackageRepository;
import com.example.choAB.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService implements ITransactionService{
    private final TransactionRepository transactionRepository;
    private final MembershipPackageRepository membershipPackageRepository;
    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found!"));
    }

    @Override
    public List<Transaction> getTransactionByType(String type) {
        return transactionRepository.findByType(type);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction addTransaction(Transaction transaction) {
        Transaction theTransaction = new Transaction();
        theTransaction.setAmount(transaction.getAmount());
        theTransaction.setTransaction_date(LocalDateTime.now());
        theTransaction.setType(transaction.getType());
        return transactionRepository.save(theTransaction);
    }

    @Override
    public void deleteTransactionById(Long id) {
        transactionRepository.findById(id).ifPresentOrElse(
                transactionRepository::delete,
                () ->{throw new ResourceNotFoundException("Transaction not found!");}
        );
    }
}
