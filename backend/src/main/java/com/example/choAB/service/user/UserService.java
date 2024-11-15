package com.example.choAB.service.user;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Role;
import com.example.choAB.model.User;
import com.example.choAB.repository.RoleRepository;
import com.example.choAB.repository.UserRepository;
import com.example.choAB.request.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final RoleRepository roleRepository;
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not found"));
    }

    @Override
    public User createUser(CreateUserRequest request) {
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        return Optional.of(request)
                .filter(user -> !userRepository.existsByEmail(request.getEmail()))
                .map(req -> {
                    User user = new User();
                    user.setEmail(req.getEmail());
                    user.setPassword(passwordEncoder.encode(req.getPassword())); //ma hoa mat khau
                    user.setName(req.getName());
                    user.setRoles(Set.of(userRole));
                    return userRepository.save(user);
                }).orElseThrow(() -> new ResourceNotFoundException("Oops!" +request.getEmail() +" already exists!"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.findById(id).ifPresentOrElse(userRepository::delete, () ->{
            throw new ResourceNotFoundException("User not found!");
        });
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }
}
