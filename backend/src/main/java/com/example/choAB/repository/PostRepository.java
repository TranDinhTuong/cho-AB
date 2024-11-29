package com.example.choAB.repository;

import com.example.choAB.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategoryNameAndTitleContainingIgnoreCase(String category, String title);
    List<Post> findByTitle(String title);

    List<Post> findByUserId(Long userId);
}
