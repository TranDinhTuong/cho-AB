package com.example.choAB.exception;

import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CannotCreateTransactionException.class)
    public String handleCannotCreateTransactionException(CannotCreateTransactionException ex) {
        return "error/500";
    }


}
