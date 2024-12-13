package com.example.choAB.repository;

import com.example.choAB.enums.PostStatus;
import com.example.choAB.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    List<Post> findByCategoryNameOrTitleContainingIgnoreCase(String category, String title);
    List<Post> findByPriceBetweenAndTitleContainingIgnoreCaseAndLocation(Long minPrice, Long maxPrice ,String title, String location);

    List<Post> findByTitle(String title);
    List<Post> findByStatus(PostStatus status);

    @Query("SELECT p FROM Post p WHERE p.status = :status ORDER BY p.is_priority DESC, p.post_date DESC")
    List<Post> findPostsByStatusOrdered(@Param("status") PostStatus status);
    List<Post> findByUserId(Long userId);

    List<Post> findByCategoryName(String categoryt);
}
