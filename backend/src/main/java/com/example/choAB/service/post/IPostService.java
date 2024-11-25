package com.example.choAB.service.post;

import com.example.choAB.dto.PostDTO;
import com.example.choAB.model.Post;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;

import java.util.List;

public interface IPostService {
    Post addPost(AddPostRequest request);

    void deletePostById(Long id);
    Post updatePost(UpdatePostRequest request, Long postId);
    Post getPostById(Long id);
    List<Post> getAllPosts();
    List<Post> getAllPostsByCategory(String category);

    List<Post> getAllPostsByTitle(String title);

    PostDTO convertPostDTO(Post post);
}
