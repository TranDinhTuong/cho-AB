package com.example.choAB.service.user;

import com.example.choAB.dto.UserDto;
import com.example.choAB.model.Conversation;
import com.example.choAB.model.User;
import com.example.choAB.request.CreateUserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IUserService {
    User getUserById(Long id);
    User createUser(CreateUserRequest request);
    //User updateUser(UpdateUserRequest request, Long userId);
    void deleteUser(Long id);

    Long getCurrentUserId();

    User getAuthenticatedUser();

    List<User> findUsersInConversationsByUserId(Long userId);

    Page<User> getAllUserByRole(String role, PageRequest pageRequest);

    UserDto convertUserDto(User user);

    Long findConversationIdByUser1IdAndUser2Id(Long user1Id, Long user2Id);
}
