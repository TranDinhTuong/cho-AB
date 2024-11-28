package com.example.choAB.service.post;

import com.example.choAB.dto.CategoryDTO;
import com.example.choAB.dto.PostDTO;
import com.example.choAB.dto.VehicleDTO;
import com.example.choAB.enums.PostStatus;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.Post;
import com.example.choAB.model.User;
import com.example.choAB.model.Vehicle;
import com.example.choAB.repository.CategoryRepository;
import com.example.choAB.repository.PostRepository;
import com.example.choAB.repository.UserRepository;
import com.example.choAB.repository.VehicleRepository;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService{
    private final PostRepository postRepository;

    private final CategoryRepository categoryRepository;

    private final VehicleRepository vehicleRepository;

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;


    @Override
    public Post addPost(AddPostRequest request, String email) {

        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() ->{
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });

        Post post = createPost(request, category, user);
        postRepository.save(post);

        if(category.getName().equals("Xe Co")){
                    Vehicle vehicle = new Vehicle(
                    request.getVehicle().getManufacturer(),
                    request.getVehicle().getYear(),
                    request.getVehicle().getFuelType(),
                    request.getVehicle().getOrigin(),
                    request.getVehicle().getLicensePlate(),
                    request.getVehicle().getColor(),
                    request.getVehicle().getMileage(),
                    post
                    );
                    vehicleRepository.save(vehicle);
                    post.setVehicle(vehicle);
        }
        return post;
    }
    private Post createPost(AddPostRequest request, Category category, User user){
        Post post = new Post(
                request.getTitle(),
                request.getDescription(),
                request.getPrice(),
                LocalDateTime.now(),
                request.getLocation(),
                true,
                category,
                user,
                PostStatus.PENDING
        );
        return post;
    }
    @Override
    public void deletePostById(Long id) {
        postRepository.findById(id).ifPresentOrElse(
                postRepository::delete,
                () ->{throw new ResourceNotFoundException("Post not found!");}
        );
    }

    @Override
    public Post updatePost(UpdatePostRequest request, Long postId) {
        return postRepository.findById(postId)
                .map(existingPost -> updateExistingPost(existingPost, request))
                .map(postRepository:: save)
                .orElseThrow(() -> {throw new ResourceNotFoundException("Post not found!");});
    }

    private Post updateExistingPost(Post existingPost, UpdatePostRequest request){
        existingPost.setTitle(request.getTitle());
        existingPost.setDescription(request.getDescription());
        existingPost.setPrice(request.getPrice());

        Category category = categoryRepository.findByName(request.getCategory().getName());
        existingPost.setCategory(category);
        return existingPost;
    }
    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found!"));
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getAllPostsByCategoryAndTitle(String category, String title) {
        return postRepository.findByCategoryNameAndTitleContainingIgnoreCase(category, title);
    }

    @Override
    public List<Post> getAllPostsByTitle(String title) {
        return postRepository.findByTitle(title);
    }

    @Override
    public PostDTO convertPostDTO(Post post) {
        PostDTO postDTO = modelMapper.map(post, PostDTO.class);

        postDTO.setCategory(post.getCategory().getName());

        Vehicle vehicle = vehicleRepository.findById(post.getId()).orElse(null);
        if(vehicle != null){
            VehicleDTO vehicleDTO = modelMapper.map(vehicle, VehicleDTO.class);
            postDTO.setVehicle(vehicleDTO);
        }
        return postDTO;
    }

    @Override
    public void approvePost(List<Long> ids, String email) {

        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        List<Post> posts = postRepository.findAllById(ids);
        posts.forEach(
                post -> {
                    post.setStatus(PostStatus.APPROVED);
                    post.setUser_admin(user);
                }
        );
        postRepository.saveAll(posts);
    }

    @Override
    public void rejectPost(List<Long> ids, String email) {
        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        List<Post> posts = postRepository.findAllById(ids);
        posts.forEach(
                post -> {
                    post.setStatus(PostStatus.REJECTED);
                    post.setUser_admin(user);
                }
        );
        postRepository.saveAll(posts);
    }
}
