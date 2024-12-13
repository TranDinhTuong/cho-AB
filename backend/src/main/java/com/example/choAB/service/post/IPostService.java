package com.example.choAB.service.post;

import com.example.choAB.core.PostSpecification;
import com.example.choAB.dto.PostDTO;
import com.example.choAB.enums.PostStatus;
import com.example.choAB.model.Post;
import com.example.choAB.model.User;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface IPostService {
    Post addPost(AddPostRequest request, User user);

    void deletePostById(Long id);
    Post updatePost(UpdatePostRequest request, Long postId);
    Post getPostById(Long id);

    User getUserByPostId(Long postId);

    List<Post> getAllPosts(PostStatus status);

    List<Post> getPostByUserId(Long userId);

    List<Post> findAllPosts(Specification<Post> spec);

    List<Post> getAllPostsByTitle(String title);

    void approvePost(List<Long> ids, String email);

    void rejectPost(List<Long> ids, String email);

    PostDTO convertPostDTO(Post post);

    List<Post> getPostByCategory(String category);

    List<PostDTO> sortPostByIsPriority(List<Post> posts);
}
