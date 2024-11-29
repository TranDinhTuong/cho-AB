package com.example.choAB.repository;

import com.example.choAB.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByPostId(Long id);


}
