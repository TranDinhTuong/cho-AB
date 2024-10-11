package com.example.choAB.repository;

import com.example.choAB.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategoryName(String category);
    List<Post> findByTitle(String title);
}
