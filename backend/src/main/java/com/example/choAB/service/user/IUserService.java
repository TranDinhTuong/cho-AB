package com.example.choAB.service.user;

import com.example.choAB.model.User;
import com.example.choAB.request.CreateUserRequest;

public interface IUserService {
    User getUserById(Long id);
    User createUser(CreateUserRequest request);
    //User updateUser(UpdateUserRequest request, Long userId);
    void deleteUser(Long id);

    //UserDto convertUserDto(User user);

    User getAuthenticatedUser();
}
