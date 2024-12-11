package com.example.choAB.data;

import com.example.choAB.enums.PostStatus;
import com.example.choAB.model.*;
import com.example.choAB.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Transactional
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ApplicationEvent> {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final VehicleRepository vehicleRepository;
    private final PhoneRepository phoneRepository;
    private final MotelRepository motelRepository;
    private final HouseholdRepository householdRepository;
    private final FashionRepository fashionRepository;
    private final BookRepository bookRepository;
    private final PetRepository petRepository;

    private boolean isInitialized = false;

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        Set<String> defaultRoles = Set.of("ROLE_ADMIN", "ROLE_USER");
        if (!isInitialized) {
            isInitialized = true;
            createDefaultRoleIfNotExits(defaultRoles);
            createDefaultUserIfNotExits();
            createDefaultAdminIfNotExits();
            createDefaultPost();
        }
    }

    private void createDefaultUserIfNotExits() {
        Role userRole = roleRepository.findByName("ROLE_USER").orElse(null);
        for (int i = 1; i <= 2; i++) {
            String defaultEmail = "user" + i + "@email.com";
            if (userRepository.existsByEmail(defaultEmail)) continue;

            User user = new User();
            user.setName("User" + i);
            user.setEmail(defaultEmail);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setPhone("0123456789");
            user.setRoles(Set.of(userRole));
            userRepository.save(user);
            System.out.println("Default user " + i + " created successfully.");
        }
    }

    private void createDefaultAdminIfNotExits() {
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElse(null);
        for (int i = 1; i <= 2; i++) {
            String defaultEmail = "admin" + i + "@email.com";
            if (userRepository.existsByEmail(defaultEmail)) continue;

            User user = new User();
            user.setName("Admin" + i);
            user.setEmail(defaultEmail);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setPhone("0987654321");
            user.setRoles(Set.of(adminRole));
            userRepository.save(user);
            System.out.println("Default admin " + i + " created successfully.");
        }
    }

    private void createDefaultRoleIfNotExits(Set<String> roles) {
        roles.stream()
                .filter(role -> roleRepository.findByName(role).isEmpty())
                .map(Role::new)
                .forEach(roleRepository::save);
    }

    private void createDefaultPost() {
        User user = userRepository.findById(1L).orElse(null);
        User user1 = userRepository.findById(2L).orElse(null);
        createVehiclePosts(user1);
        createPhonePosts(user);
        createMotelPosts(user);
        createHouseholdPosts(user);
        createFashionPosts(user);
        createBookPosts(user);
        createPetPosts(user);
    }

    private void createVehiclePosts(User user) {
        for (int i = 1; i <= 3; i++) {
            Post post = new Post();
            post.setTitle("Vinfast Car " + i);
            post.setDescription("Vinfast description " + i);
            post.setPrice(BigDecimal.valueOf(10000000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(true);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Xe Co");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Vehicle vehicle = new Vehicle();
            vehicle.setManufacturer("Vinfast");
            vehicle.setYear(2021 + i);
            vehicle.setFuelType("Xăng");
            vehicle.setOrigin("Việt Nam");
            vehicle.setLicensePlate("51A-1234" + i);
            vehicle.setColor("Đen");
            vehicle.setMileage(10000 * i);
            vehicle.setPost(post);

            vehicleRepository.save(vehicle);
            post.setVehicle(vehicle);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private void createPhonePosts(User user) {
        for (int i = 1; i <= 3; i++) {
            Post post = new Post();
            post.setTitle("iPhone " + i);
            post.setDescription("Description for iPhone " + i);
            post.setPrice(BigDecimal.valueOf(20000000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(false);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Dien Thoai");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Phone phone = new Phone(
                    "Mới", "Apple", "iPhone 13", "Chính hãng", "Đen", "256GB", post);
            phoneRepository.save(phone);

            post.setPhone(phone);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private void createMotelPosts(User user) {
        for (int i = 1; i <= 3; i++) {
            Post post = new Post();
            post.setTitle("Cho thuê phòng trọ " + i);
            post.setDescription("Phòng trọ giá rẻ tại Quận " + i);
            post.setPrice(BigDecimal.valueOf(1500000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(true);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Phong tro");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Motel motel = new Motel();
            motel.setArea((20 + i) + "m2");
            motel.setDeposit(500000.0);
            motel.setPost(post);
            motelRepository.save(motel);

            post.setMotel(motel);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private void createHouseholdPosts(User user) {
        for (int i = 1; i <= 2; i++) {
            Post post = new Post();
            post.setTitle("Đồ gia dụng " + i);
            post.setDescription("Quạt điện chất lượng cao " + i);
            post.setPrice(BigDecimal.valueOf(300000 + i * 10000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(false);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Do gia dung");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Household household = new Household();
            household.setName("Quạt điện " + i);
            household.setOrigin("Nhật Bản");
            household.setStatus("Mới");
            household.setPost(post);
            householdRepository.save(household);

            post.setHousehold(household);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private void createFashionPosts(User user) {
        for (int i = 1; i <= 2; i++) {
            Post post = new Post();
            post.setTitle("Áo thời trang " + i);
            post.setDescription("Áo len phong cách số " + i);
            post.setPrice(BigDecimal.valueOf(500000 + i * 50000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(true);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Thoi trang");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Fashion fashion = new Fashion();
            fashion.setName("Áo len " + i);
            fashion.setType("Nam");
            fashion.setStatus("Mới");
            fashion.setPost(post);
            fashionRepository.save(fashion);

            post.setFashion(fashion);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private void createBookPosts(User user) {
        for (int i = 1; i <= 2; i++) {
            Post post = new Post();
            post.setTitle("Sách hay " + i);
            post.setDescription("Sách hay dành cho mọi người " + i);
            post.setPrice(BigDecimal.valueOf(120000 + i * 10000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(false);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Sach");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Book book = new Book();
            book.setName("Cuốn sách " + i);
            book.setOrigin("Kim Đồng");
            book.setType("Truyện tranh");
            book.setYear(2020 + i);
            book.setStatus("Mới");
            book.setPost(post);
            bookRepository.save(book);

            post.setBook(book);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private void createPetPosts(User user) {
        for (int i = 1; i <= 2; i++) {
            Post post = new Post();
            post.setTitle("Bán thú cưng " + i);
            post.setDescription("Chó Chihuahua thuần chủng số " + i);
            post.setPrice(BigDecimal.valueOf(5000000 + i * 100000));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(false);
            post.setStatus(PostStatus.APPROVED);
            Category category = getCategory("Thu cung");
            post.setCategory(category);
            post.setLocation("Quận " + i + ", TP HCM");

            Pet pet = new Pet(
                    "Chihuahua", 1 + i, "Nhỏ", post
            );
            petRepository.save(pet);

            post.setPet(pet);
            post.setUser(user);
            postRepository.save(post);
        }
    }

    private Category getCategory(String name) {
        return Optional.ofNullable(categoryRepository.findByName(name))
                .orElseGet(() -> categoryRepository.save(new Category(name)));
    }
}