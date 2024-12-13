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

    private final MotelRepository motelRepository;

    private final HouseholdRepository householdRepository;

    private final FashionRepository fashionRepository;

    private final BookRepository bookRepository;

    private final PetRepository petRepository;


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
        else if (category.getName().equals("Phong tro")) {
            Motel motel = new Motel();
            motel.setArea(request.getMotel().getArea());
            motel.setDeposit(request.getMotel().getDeposit());
            motel.setPost(post);
            motelRepository.save(motel);
            post.setMotel(motel);
        }

        else if (category.getName().equals("Do gia dung")) {
            Household household = new Household();
            household.setName(request.getHousehold().getName());
            household.setOrigin(request.getHousehold().getOrigin());
            household.setStatus(request.getHousehold().getStatus());
            household.setPost(post);
            householdRepository.save(household);
            post.setHousehold(household);
        }

        else if (category.getName().equals("Thoi trang")) {
            Fashion fashion = new Fashion();
            fashion.setName(request.getFashion().getName());
            fashion.setType(request.getFashion().getType());
            fashion.setStatus(request.getFashion().getStatus());
            fashion.setPost(post);
            fashionRepository.save(fashion);
            post.setFashion(fashion);
        }

        else if (category.getName().equals("Sach")) {
            Book book = new Book();
            book.setName(request.getBook().getName());
            book.setOrigin(request.getBook().getOrigin());
            book.setType(request.getBook().getType());
            book.setYear(request.getBook().getYear());
            book.setStatus(request.getBook().getStatus());
            book.setPost(post);
            bookRepository.save(book);
            post.setBook(book);
        }
        else if (category.getName().equals("Thu cung")) {
            Pet pet = new Pet();
            pet.setName(request.getPet().getName());
            pet.setAge(request.getPet().getAge());
            pet.setSize(request.getPet().getSize());
            pet.setPost(post);
            petRepository.save(pet);
            post.setPet(pet);
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
                false,
                category,
                user,
                PostStatus.PENDING
        );
        if(user.is_priority()){
            post.set_priority(true);
        }
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
    public List<Post> getAllPosts(PostStatus status) {
        return postRepository.findPostsByStatusOrdered(status);
    }

    @Override
    public List<Post> findAllPosts(Specification<Post> specification) {
       return postRepository.findAll(specification);
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
    public List<PostDTO> sortPostByIsPriority(List<Post> posts) {

        return null;
    }

    @Override
    public PostDTO convertPostDTO(Post post) {
        PostDTO postDTO = modelMapper.map(post, PostDTO.class);

        postDTO.setCategory(post.getCategory().getName());

        if(post.getVehicle() != null){
            VehicleDTO vehicleDTO = modelMapper.map(post.getVehicle(), VehicleDTO.class);
            postDTO.setVehicle(vehicleDTO);
        }else if(post.getJob() != null) {
            JobDTO jobDTO = modelMapper.map(post.getJob(), JobDTO.class);
            postDTO.setJob(jobDTO);
        }else if(post.getPhone() != null){
            PhoneDTO phoneDTO = modelMapper.map(post.getPhone(), PhoneDTO.class);
            postDTO.setPhone(phoneDTO);
        }else if(post.getMotel() != null) {
            MotelDTO motelDTO = modelMapper.map(post.getMotel(), MotelDTO.class);
            postDTO.setMotel(motelDTO);
        }else if(post.getHousehold() != null) {
            HouseholdDTO householdDTO = modelMapper.map(post.getHousehold(), HouseholdDTO.class);
            postDTO.setHousehold(householdDTO);
        }else if(post.getFashion() != null) {
            FashionDTO fashionDTO = modelMapper.map(post.getFashion(), FashionDTO.class);
            postDTO.setFashion(fashionDTO);
        }else if(post.getBook() != null) {
            BookDTO bookDTO = modelMapper.map(post.getBook(), BookDTO.class);
            postDTO.setBook(bookDTO);
        }else if(post.getPet() != null) {
            PetDTO petDTO = modelMapper.map(post.getPet(), PetDTO.class);
            postDTO.setPet(petDTO);
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
    public List<Post> getPostByCategory(String category) {
        return postRepository.findByCategoryName(category);
    }
}
