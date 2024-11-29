package com.example.choAB.data;

import com.example.choAB.enums.PostStatus;
import com.example.choAB.model.*;
import com.example.choAB.repository.*;
import com.example.choAB.service.image.IImageService;
import com.example.choAB.service.image.ImageService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
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

    private boolean isInitialized = false; // Cờ kiểm tra

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
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        for (int i = 1; i <= 2; i++) {
            String defaultEmail = "sam" + i + "@email.com";
            if (userRepository.existsByEmail(defaultEmail)) {
                continue;
            }
            User user = new User();
            user.setName("User" + i);
            user.setEmail(defaultEmail);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setRoles(Set.of(userRole));
            userRepository.save(user);
            System.out.println("Default vet user " + i + " created successfully.");
        }
    }

    private void createDefaultAdminIfNotExits() {
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").get();
        for (int i = 1; i <= 2; i++) {
            String defaultEmail = "admin" + i + "@email.com";
            if (userRepository.existsByEmail(defaultEmail)) {
                continue;
            }
            User user = new User();
            user.setName("Admin" + i);
            user.setEmail(defaultEmail);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setRoles(Set.of(adminRole));
            userRepository.save(user);
            System.out.println("Default admin user " + i + " created successfully.");
        }
    }

    private void createDefaultRoleIfNotExits(Set<String> roles) {
        roles.stream()
                .filter(role -> roleRepository.findByName(role).isEmpty())
                .map(Role::new).forEach(roleRepository::save);
    }


    private void createDefaultPost() {
        User user = userRepository.findById(1L).orElse(null);
        for (int i = 1; i <= 3; i++) {
            Post post = new Post();
            post.setTitle("vinf " + (i + 6));
            post.setDescription("vin no " + i);
            post.setPrice(BigDecimal.valueOf(1000 + i));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(true);
            post.setStatus(PostStatus.PENDING); // cho duyet
            Category category = Optional.ofNullable(categoryRepository.findByName("Xe Co"))
                    .orElseGet(() -> {
                        Category newCategory = new Category("Xe Co");
                        return categoryRepository.save(newCategory);
                    });

            post.setCategory(category);
            post.setLocation("Quận " + i + " tp HCM");
            Vehicle vehicle = new Vehicle();
            vehicle.setManufacturer("vinfast");
            vehicle.setYear(2021);
            vehicle.setFuelType("xăng");
            vehicle.setOrigin("Vietnam");
            vehicle.setLicensePlate("51A-12345");
            vehicle.setColor("đen");
            vehicle.setMileage(1000);
            vehicle.setPost(post);
            vehicleRepository.save(vehicle);

            post.setVehicle(vehicle);
            post.setUser(user);
            postRepository.save(post);
        }

        User user1 = userRepository.findById(2L).orElse(null);
        for (int i = 1; i <= 3; i++) {
            Post post = new Post();
            post.setTitle("iphone " + (i + 6));
            post.setDescription("iphone ne " + i);
            post.setPrice(BigDecimal.valueOf(1000 + i));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(false);
            post.setStatus(PostStatus.PENDING); // cho duyet

            Category category = Optional.ofNullable(categoryRepository.findByName("Dien Thoai"))
                    .orElseGet(() -> {
                        Category newCategory = new Category("Dien Thoai");
                        return categoryRepository.save(newCategory);
                    });

            post.setCategory(category);
            post.setLocation("Quận " + i + " tp HCM");
            post.setUser(user1);
            postRepository.save(post);
        }

    }


}
