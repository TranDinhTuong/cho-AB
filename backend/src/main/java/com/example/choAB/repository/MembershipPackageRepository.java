package com.example.choAB.repository;

import com.example.choAB.model.MembershipPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipPackageRepository extends JpaRepository<MembershipPackage, Long> {
    MembershipPackage findByName(String name);
    boolean existsByName(String name);
}
