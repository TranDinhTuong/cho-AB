package com.example.choAB.repository;

import com.example.choAB.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email); //kiem tra email da ton tai chua
    User findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleName and u.status = 'ACTIVE'")
    Page<User> findByRole(@Param("roleName") String roleName, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.is_priority = :isPriority WHERE u.id = :userId")
    void updateIsPriority(@Param("userId") Long userId, @Param("isPriority") boolean isPriority);
}
