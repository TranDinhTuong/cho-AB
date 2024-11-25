package com.example.choAB.service.post;

import com.example.choAB.dto.PostDTO;
import com.example.choAB.dto.VehicleDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.Post;
import com.example.choAB.model.Vehicle;
import com.example.choAB.repository.CategoryRepository;
import com.example.choAB.repository.PostRepository;
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

    @Override
    public Post addPost(AddPostRequest request) {
        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() ->{
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });

        Post post = createPost(request, category);

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
    private Post createPost(AddPostRequest request, Category category){
        Post post = new Post(
                request.getTitle(),
                request.getDescription(),
                request.getPrice(),
                LocalDateTime.now(),
                request.getLocation(),
                true,
                category
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
    public List<Post> getAllPostsByCategory(String category) {
        return postRepository.findByCategoryName(category);
    }

    @Override
    public List<Post> getAllPostsByTitle(String title) {
        return postRepository.findByTitle(title);
    }

    @Override
    public PostDTO convertPostDTO(Post post) {
        PostDTO postDTO = modelMapper.map(post, PostDTO.class);
        Vehicle vehicle = vehicleRepository.findById(post.getId()).orElse(null);
        VehicleDTO vehicleDTO = modelMapper.map(vehicle, VehicleDTO.class);
        postDTO.setVehicle(vehicleDTO);
        return postDTO;
    }
}
