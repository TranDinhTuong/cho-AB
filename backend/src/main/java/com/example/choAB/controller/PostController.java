package com.example.choAB.controller;

import com.example.choAB.dto.PostDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Post;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.security.jwt.JwtUtils;
import com.example.choAB.service.post.IPostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/posts")
public class PostController{
    private final IPostService postService;

    private final JwtUtils jwtUtils;


    @PreAuthorize(value = "hasRole('ROLE_USER')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addPost(@RequestBody AddPostRequest request, HttpServletRequest httpRequest){
        try{
            // Lấy token từ header Authorization
            String token = httpRequest.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Bỏ phần "Bearer " khỏi token
            }

            String username = jwtUtils.getUsernameFromToken(token);

            Post post = postService.addPost(request, "username");

            PostDTO postDTO = postService.convertPostDTO(post);

            String message = "Success";

            return ResponseEntity.ok(new ApiResponse("Success", postDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage() , null));
        }
    }

    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @PostMapping("/review/{isApproved}")
    public ResponseEntity<ApiResponse> reviewPosts(@RequestBody Map<String, Object> ids,
                                                   @PathVariable boolean isApproved,
                                                   HttpServletRequest httpRequest){
        try {
            String token = httpRequest.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Bỏ phần "Bearer " khỏi token
            }
            String username = jwtUtils.getUsernameFromToken(token);

            List<Long> id = (List<Long>) ids.get("ids");
            if(isApproved){
                postService.approvePost(id, "username");
            }
            else{
                postService.rejectPost(id, "username");
            }
            return ResponseEntity.ok(new ApiResponse("Success", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage() , null));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllPosts(){
        try{
            List<Post> posts = postService.getAllPosts();
            List<PostDTO> postDTOs = posts.stream().map(element -> postService.convertPostDTO(element)).toList();
            if(posts.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{id}/post")
    public ResponseEntity<ApiResponse> getPostById(@PathVariable Long id){
        try{
            Post post = postService.getPostById(id);
            PostDTO postDTO = postService.convertPostDTO(post);
            return ResponseEntity.ok(new ApiResponse("Success", postDTO));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/all/posts")
    public ResponseEntity<ApiResponse> getAllPostsByCategoryAndTitle(@RequestParam(value = "category", required = false) String category,
                                                                     @RequestParam(value = "title", required = false) String title){
        try{
            List<Post> posts = postService.getAllPostsByCategoryAndTitle(category, title);
            List<PostDTO> postDTOs = posts.stream().map((element) -> postService.convertPostDTO(element)).toList();
            if(posts.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{title}/posts")
    public ResponseEntity<ApiResponse> getAllPostsByTitle(@PathVariable String title){
        try{
            List<Post> posts = postService.getAllPostsByTitle(title);
            List<PostDTO> postDTOs = posts.stream().map((element) -> postService.convertPostDTO(element)).toList();
            if(posts.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PreAuthorize(value = "hasRole('ROLE_USER')")
    @PutMapping("/post/{id}/update")
    public ResponseEntity<ApiResponse> updatePost(@RequestBody  UpdatePostRequest request,@PathVariable Long id){
        try {
            Post post = postService.updatePost(request, id);
            PostDTO postDTO = postService.convertPostDTO(post);
            return ResponseEntity.ok(new ApiResponse("Success", postDTO));
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
