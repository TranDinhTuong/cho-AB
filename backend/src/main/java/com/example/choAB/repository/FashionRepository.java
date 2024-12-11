package com.example.choAB.repository;

import com.example.choAB.model.Fashion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FashionRepository extends JpaRepository<Fashion, Long> {
}