package com.example.choAB.service.post;

import com.example.choAB.core.PostSpecification;
import com.example.choAB.dto.*;
import com.example.choAB.enums.PostStatus;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.*;
import com.example.choAB.repository.*;
import com.example.choAB.request.AddPostRequest;
import com.example.choAB.request.UpdatePostRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
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

    private final PhoneRepository phoneRepository;
    private final JobRepository jobRepository;


    @Override
    public Post addPost(AddPostRequest request, User user) {

//        User user = Optional.ofNullable(userRepository.findByEmail(email))
//                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

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
        else if(category.getName().equals("Viec Lam")){
            Job job = new Job(
                    request.getJob().getCompanyName(),
                    request.getJob().getQuantity(),
                    request.getJob().getIndustry(),
                    request.getJob().getJobType(),
                    request.getJob().getSalaryType(),
                    request.getJob().getMinSalary(),
                    request.getJob().getMaxSalary(),
                    request.getJob().getMinAge(),
                    request.getJob().getMaxAge(),
                    request.getJob().getGender(),
                    request.getJob().getEducationLevel(),
                    request.getJob().getExperience(),
                    request.getJob().getCertificates(),
                    post
            );
            jobRepository.save(job);
            post.setJob(job);
        }
        else if(category.getName().equals("Dien Thoai")){
            Phone phone = new Phone(
                    request.getPhone().getCondition(),
                    request.getPhone().getBrand(),
                    request.getPhone().getModel(),
                    request.getPhone().getOrigin(),
                    request.getPhone().getColor(),
                    request.getPhone().getStorage(),
                    post
            );
            phoneRepository.save(phone);
            post.setPhone(phone);
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
    public Page<Post> findAllPosts(Specification<Post> specification, PageRequest pageRequest) {
        return postRepository.findAll(specification, pageRequest);
    }

    @Override
    public List<Post> getAllPostsByTitle(String title) {
        return postRepository.findByTitle(title);
    }

    @Override
    public List<Post> getPostByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }

    @Override
    public PostDTO convertPostDTO(Post post) {
        PostDTO postDTO = modelMapper.map(post, PostDTO.class);

        postDTO.setCategory(post.getCategory().getName());

        Vehicle vehicle = vehicleRepository.findById(post.getId()).orElse(null);
        Job job = jobRepository.findById(post.getId()).orElse(null);
        Phone phone = phoneRepository.findById(post.getId()).orElse(null);

        if(vehicle != null){
            VehicleDTO vehicleDTO = modelMapper.map(vehicle, VehicleDTO.class);
            postDTO.setVehicle(vehicleDTO);
        }else if(job != null) {
            JobDTO jobDTO = modelMapper.map(job, JobDTO.class);
            postDTO.setJob(jobDTO);
        }else if(phone != null){
            PhoneDTO phoneDTO = modelMapper.map(phone, PhoneDTO.class);
            postDTO.setPhone(phoneDTO);
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

    @Override
    public User getUserByPostId(Long postId) {
        return postRepository.findById(postId)
                .map(Post::getUser)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found!"));
    }

    @Override
    public List<Post> getPostByCategory(String category, int page) {
        PageRequest pageRequest = PageRequest.of(page, 2);
        return postRepository.findByCategoryName(category, pageRequest);
    }
}
