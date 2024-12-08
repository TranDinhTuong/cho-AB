package com.example.choAB.repository;

import com.example.choAB.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    List<Post> findByCategoryNameOrTitleContainingIgnoreCase(String category, String title, PageRequest pageRequest);
    List<Post> findByPriceBetweenAndTitleContainingIgnoreCaseAndLocation(Long minPrice, Long maxPrice ,String title, String location,PageRequest pageRequest);

    List<Post> findByTitle(String title);

    List<Post> findByUserId(Long userId);

    List<Post> findByCategoryName(String category, PageRequest pageRequest);

}
