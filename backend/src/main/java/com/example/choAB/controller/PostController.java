package com.example.choAB.controller;

import com.example.choAB.core.PostSpecification;
import com.example.choAB.dto.PostDTO;
import com.example.choAB.dto.UserDto;
import com.example.choAB.enums.PostStatus;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Post;
import com.example.choAB.model.User;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.post.IPostService;
import com.example.choAB.service.user.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    private final IPostService postService;

    private final IUserService userService;

    private final PostSpecification postSpecification;

    //@PreAuthorize(value = "hasRole('ROLE_USER')")
    @PostMapping("/{userId}/add")
    public ResponseEntity<ApiResponse> addPost(@RequestBody AddPostRequest request, @PathVariable Long userId) {
        try {

//            // Lấy token từ header Authorization
//            String token = httpRequest.getHeader("Authorization");
//            if (token != null && token.startsWith("Bearer ")) {
//                token = token.substring(7); // Bỏ phần "Bearer " khỏi token
//            }

//            String username = jwtUtils.getUsernameFromToken(token);

            User user = userService.getUserById(userId);

            Post post = postService.addPost(request, user);

            PostDTO postDTO = postService.convertPostDTO(post);

            String message = "Success";

            return ResponseEntity.ok(new ApiResponse("Success", postDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    //@PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @PostMapping("/review/{isApproved}")
    public ResponseEntity<ApiResponse> reviewPosts(@RequestBody Map<String, Object> ids,
                                                   @PathVariable boolean isApproved,
                                                   HttpServletRequest httpRequest) {
        try {
            String token = httpRequest.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Bỏ phần "Bearer " khỏi token
            }
            //String username = jwtUtils.getUsernameFromToken(token);

            List<Long> id = (List<Long>) ids.get("ids");
            if (isApproved) {
                postService.approvePost(id, "username");
            } else {
                postService.rejectPost(id, "username");
            }
            return ResponseEntity.ok(new ApiResponse("Success", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllPosts() {
        try {
            List<Post> posts = postService.getAllPosts(PostStatus.APPROVED);
            List<PostDTO> postDTOs = posts.stream().map(element -> postService.convertPostDTO(element)).toList();
            if (posts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{id}/post")
    public ResponseEntity<ApiResponse> getPostById(@PathVariable Long id) {
        try {
            Post post = postService.getPostById(id);
            PostDTO postDTO = postService.convertPostDTO(post);
            return ResponseEntity.ok(new ApiResponse("Success", postDTO));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/{userId}/post")
    public ResponseEntity<ApiResponse> getPostByUserId(@PathVariable Long userId) {
        try {
            List<Post> posts = postService.getPostByUserId(userId);
            if (posts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            List<PostDTO> postDTOs = posts.stream().map(
                    (element) -> postService.convertPostDTO(element)
            ).toList();
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/all/posts")
    public ResponseEntity<ApiResponse> findPosts(@RequestParam(value = "category", required = false) String category,
                                                                     @RequestParam(value = "title", required = false) String title,
                                                                     @RequestParam(value = "minPrice", required = false) Long minPrice,
                                                                     @RequestParam(value = "maxPrice", required = false) Long maxPrice,
                                                                     @RequestParam(value = "location", required = false) String location,
                                                                     @RequestParam(value = "page", required = false, defaultValue = "0") int page) {
        try {
            Specification<Post> spec = Specification.where(postSpecification.hasCategory(category))
                    .and(postSpecification.hasTitle(title))
                    .and(postSpecification.hasPriceBetween(minPrice, maxPrice))
                    .and(postSpecification.hasLocation(location));

            Page<Post> posts = postService.findAllPosts(spec, PageRequest.of(page, 2));
            List<PostDTO> postDTOs = posts.stream().map((element) -> postService.convertPostDTO(element)).toList();
            if (posts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{portId}/user")
    public ResponseEntity<ApiResponse> getUserByPortId(@PathVariable Long portId) {
        try {
            User user = postService.getUserByPostId(portId);
            UserDto userDto = userService.convertUserDto(user);
            return ResponseEntity.ok(new ApiResponse("Success", userDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post/{category}/user")
    public ResponseEntity<ApiResponse> getUserByPortId(
            @PathVariable String category,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page
    ) {
        try {
            List<Post> posts= postService.getPostByCategory(category, page);
            List<PostDTO> postDTOs = posts.stream().map((element) -> postService.convertPostDTO(element)).toList();
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/post")
    public ResponseEntity<ApiResponse> getAllPostsByTitle(
            @RequestParam String title,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page
    ) {
        try {
            List<Post> posts = postService.getAllPostsByTitle(title);
            List<PostDTO> postDTOs = posts.stream().map((element) -> postService.convertPostDTO(element)).toList();
            if (posts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No product found ", null));
            }
            return ResponseEntity.ok(new ApiResponse("Success", postDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PreAuthorize(value = "hasRole('ROLE_USER')")
    @PutMapping("/post/{id}/update")
    public ResponseEntity<ApiResponse> updatePost(@RequestBody UpdatePostRequest request, @PathVariable Long id) {
        try {
            Post post = postService.updatePost(request, id);
            PostDTO postDTO = postService.convertPostDTO(post);
            return ResponseEntity.ok(new ApiResponse("Success", postDTO));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/product/{id}/delete")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long id) {
        try {
            postService.deletePostById(id);
            return ResponseEntity.ok(new ApiResponse("Success", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
