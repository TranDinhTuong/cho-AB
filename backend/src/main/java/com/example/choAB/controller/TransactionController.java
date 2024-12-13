package com.example.choAB.controller;

import com.example.choAB.dto.TransactionDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.Transaction;
import com.example.choAB.request.TransactionRequest;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.transaction.ITransactionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {
    private final ITransactionService transactionService;
    private final ModelMapper modelMapper;

    @GetMapping("/{userId}/all")
    public ResponseEntity<ApiResponse> getAllTransactions(@PathVariable Long userId){
        try {
            List<Transaction> transactions = transactionService.getAllTransactions(userId);
            List<TransactionDTO> transactionDTOs = transactions.stream().map(e -> transactionService.convertToDTO(e)).toList();
            if(transactionDTOs.isEmpty()){
                return ResponseEntity.ok(new ApiResponse("Success!", "not found"));
            }
            return ResponseEntity.ok(new ApiResponse("Success!", transactionDTOs));
        }catch (Exception e){
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error:", INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<ApiResponse> addTransaction(@RequestBody TransactionRequest request, @PathVariable Long userId){
        try {
            Transaction transaction = transactionService.addTransaction(request, userId);
            TransactionDTO transactionDTO = transactionService.convertToDTO(transaction);

            return ResponseEntity.ok(new ApiResponse("Success", transactionDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{id}/transaction")
    public ResponseEntity<ApiResponse> getTransactionById(@PathVariable Long id){
        try{
            Transaction transaction = transactionService.getTransactionById(id);
            return ResponseEntity.ok(new ApiResponse("Success", transaction));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse( e.getMessage(), ""));
        }
    }

    @GetMapping("/transaction/{type}/transaction")
    public ResponseEntity<ApiResponse> getTransactionByType(@PathVariable String type){
        try{
            List<Transaction> transactions = transactionService.getTransactionByType(type);
            if(transactions.isEmpty()){
                return ResponseEntity.ok(new ApiResponse("Success!", "not found"));
            }
            return ResponseEntity.ok(new ApiResponse("Success", transactions));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ""));
        }
    }


    @DeleteMapping("/transaction/{id}/delete")
    public ResponseEntity<ApiResponse> deleteTransaction(@PathVariable Long id){
        try{
            transactionService.deleteTransactionById(id);
            return ResponseEntity.ok(new ApiResponse("Success", null));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ""));
        }
    }
}
