package com.example.choAB.controller;

import com.example.choAB.dto.UserDto;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.User;
import com.example.choAB.request.CreateUserRequest;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final IUserService userService;

    @GetMapping("/{userId}/user")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId){
        try{
            User user = userService.getUserById(userId);
            UserDto userDto = userService.convertUserDto(user);
            return ResponseEntity.ok(new ApiResponse("Success", userDto));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }



    @PostMapping("/add")
    public ResponseEntity<ApiResponse> createUser(@RequestBody CreateUserRequest request){
        try{
            User user = userService.createUser(request);
            UserDto userDto = userService.convertUserDto(user);
            return ResponseEntity.ok(new ApiResponse("Create User Success!", userDto));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(e.getMessage(), null));
        }
    }



    @DeleteMapping("/{userId}/delete")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId){
        try{
            userService.deleteUser(userId);
            return ResponseEntity.ok(new ApiResponse("Delete User Success!", null));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }



    @GetMapping("/conversation/id")
    public ResponseEntity<ApiResponse> findConversationIdByUser1IdAndUser2Id(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        try {
            Long conversationId = userService.findConversationIdByUser1IdAndUser2Id(user1Id, user2Id);
            return ResponseEntity.ok(new ApiResponse("Success", conversationId));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

}