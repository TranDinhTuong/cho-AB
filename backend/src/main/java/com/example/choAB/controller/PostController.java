package com.example.choAB.controller;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Post;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.post.IPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/posts")
public class PostController{
    private final IPostService postService;

    @PreAuthorize(value = "hasRole('ROLE_USER')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addPost(@RequestBody AddPostRequest request){
        try{
            Post post = postService.addPost(request);
            return ResponseEntity.ok(new ApiResponse("Success", post));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllPosts(){
        try{
            List<Post> posts = postService.getAllPosts();
            if(posts.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", posts));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{id}/post")
    public ResponseEntity<ApiResponse> getPostById(@PathVariable Long id){
        try{
            Post post = postService.getPostById(id);
            return ResponseEntity.ok(new ApiResponse("Success", post));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{category}/all/posts")
    public ResponseEntity<ApiResponse> getAllPostsByCategory(@PathVariable String category){
        try{
            List<Post> posts = postService.getAllPostsByCategory(category);
            if(posts.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", posts));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{title}/posts")
    public ResponseEntity<ApiResponse> getAllPostsByTitle(@PathVariable String title){
        try{
            List<Post> posts = postService.getAllPostsByTitle(title);
            if(posts.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", posts));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PreAuthorize(value = "hasRole('ROLE_USER')")
    @PutMapping("/post/{id}/update")
    public ResponseEntity<ApiResponse> updatePost(@RequestBody  UpdatePostRequest request,@PathVariable Long id){
        try {
            Post post = postService.updatePost(request, id);
            return ResponseEntity.ok(new ApiResponse("Success", post));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/product/{id}/delete")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long id){
        try {
            postService.deletePostById(id);
            return ResponseEntity.ok(new ApiResponse("Success", null));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
