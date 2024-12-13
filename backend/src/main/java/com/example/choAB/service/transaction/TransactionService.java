package com.example.choAB.service.transaction;

import com.example.choAB.dto.TransactionDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.MembershipPackage;
import com.example.choAB.model.Transaction;
import com.example.choAB.model.User;
import com.example.choAB.repository.MembershipPackageRepository;
import com.example.choAB.repository.TransactionRepository;
import com.example.choAB.repository.UserRepository;
import com.example.choAB.request.TransactionRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService implements ITransactionService{
    private final TransactionRepository transactionRepository;
    private final MembershipPackageRepository membershipPackageRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
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
    public List<Transaction> getAllTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    @Override
    public Transaction addTransaction(TransactionRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        Transaction transaction = new Transaction();
        transaction.setAmount(request.getAmount());
        transaction.setTransaction_date(LocalDateTime.now());
        transaction.setType(request.getType());
        transaction.setUser(user);
        if(request.getMembershipPackageId() != null){
            MembershipPackage membershipPackage = membershipPackageRepository.findById(request.getMembershipPackageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Membership package not found!"));
            transaction.setMembershipPackage(membershipPackage);
        }
        userRepository.updateIsPriority(userId, true);
        return transactionRepository.save(transaction);
    }

    @Override
    public void deleteTransactionById(Long id) {
        transactionRepository.findById(id).ifPresentOrElse(
                transactionRepository::delete,
                () ->{throw new ResourceNotFoundException("Transaction not found!");}
        );
    }

    @Override
    public TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO transactionDTO = modelMapper.map(transaction, TransactionDTO.class);
        return transactionDTO;
    }
}
