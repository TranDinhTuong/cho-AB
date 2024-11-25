package com.example.choAB.data;

import com.example.choAB.model.*;
import com.example.choAB.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.CannotCreateTransactionException;
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

    String defaultEmail = "adf";

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        Set<String> defaultRoles =  Set.of("ROLE_ADMIN", "ROLE_USER");
        createDefaultRoleIfNotExits(defaultRoles);
        createDefaultUserIfNotExits();
        createDefaultAdminIfNotExits();
        createDefaultPost();
    }

    private void createDefaultUserIfNotExits(){
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        for (int i = 1; i <= 5; i++){
            String defaultEmail = "sam"+i+"@email.com";
            if (userRepository.existsByEmail(defaultEmail)){
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

    private void createDefaultAdminIfNotExits(){
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").get();
        for (int i = 1; i<=2; i++){
            String defaultEmail = "admin"+i+"@email.com";
            if (userRepository.existsByEmail(defaultEmail)){
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

    private void createDefaultRoleIfNotExits(Set<String> roles){
        roles.stream()
             .filter(role -> roleRepository.findByName(role).isEmpty())
             .map(Role:: new).forEach(roleRepository::save);
    }


    private void createDefaultPost(){
        for (int i = 1; i <= 5; i++){
            Post post = new Post();
            post.setTitle("vinf " + i);
            post.setDescription("vin no " + i);
            post.setPrice(BigDecimal.valueOf(1000 + i));
            post.setPost_date(LocalDateTime.now());
            post.set_priority(true);

            Category category = Optional.ofNullable(categoryRepository.findByName("Xe Co"))
                    .orElseGet(() ->{
                        Category newCategory = new Category("Xe Co");
                        return categoryRepository.save(newCategory);
                    });

            post.setCategory(category);
            post.setLocation("tp HCM");

            Vehicle vehicle = new Vehicle();
            vehicle.setManufacturer("vinfast");
            vehicle.setYear(2021);
            vehicle.setFuelType("diesel");
            vehicle.setOrigin("Vietnam");
            vehicle.setLicensePlate("51A-12345");
            vehicle.setColor("black");
            vehicle.setMileage(1000);
            vehicle.setPost(post);
            vehicleRepository.save(vehicle);

            post.setVehicle(vehicle);

            postRepository.save(post);
        }
    }
}
