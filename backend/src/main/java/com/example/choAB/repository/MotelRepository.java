package com.example.choAB.repository;

import com.example.choAB.model.Motel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotelRepository extends JpaRepository<Motel, Long> {
}
