package com.example.choAB.service.post;

import com.example.choAB.dto.PostDTO;
import com.example.choAB.model.Post;
import com.example.choAB.model.User;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;

import java.util.List;

public interface IPostService {
    Post addPost(AddPostRequest request, User user);

    void deletePostById(Long id);
    Post updatePost(UpdatePostRequest request, Long postId);
    Post getPostById(Long id);
    List<Post> getAllPosts();

    List<Post> getPostByUserId(Long userId);

    List<Post> getAllPostsByCategoryAndTitle(String category, String title);

    List<Post> getAllPostsByTitle(String title);

    void approvePost(List<Long> ids, String email);

    void rejectPost(List<Long> ids, String email);

    PostDTO convertPostDTO(Post post);
}
