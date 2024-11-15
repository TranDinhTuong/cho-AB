package com.example.choAB.repository;

import com.example.choAB.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email); //kiem tra email da ton tai chua
    User findByEmail(String email);
}
