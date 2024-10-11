package com.example.choAB.controller;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.MembershipPackage;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.membershipPackage.IMembershipPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/membershipPackages")
public class MembershipPackageController {
    private final IMembershipPackageService membershipPackageService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllMembershipPackages(){
        try {
            List<MembershipPackage> membershipPackages = membershipPackageService.getAllMembershipPackages();
            if(membershipPackages.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Error:", NOT_FOUND));
            }
            return ResponseEntity.ok(new ApiResponse("Found!", membershipPackages));
        }catch (Exception e){
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error:", INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addMembershipPackage(@RequestBody MembershipPackage request){
        try {
            MembershipPackage membershipPackage = membershipPackageService.addMembershipPackage(request);
            return ResponseEntity.ok(new ApiResponse("Success", membershipPackage));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/membershipPackage/{id}")
    public ResponseEntity<ApiResponse> getMembershipPackageById(@PathVariable Long id){
        try{
            MembershipPackage membershipPackage = membershipPackageService.getMembershipPackageById(id);
            return ResponseEntity.ok(new ApiResponse("Found", membershipPackage));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse( e.getMessage(), ""));
        }
    }

    @GetMapping("/membershipPackage/{name}/membershipPackage")
    public ResponseEntity<ApiResponse> getMembershipPackageByName(@PathVariable String name){
        try{
            MembershipPackage membershipPackage = membershipPackageService.getMembershipPackageByName(name);
            return ResponseEntity.ok(new ApiResponse("Found", membershipPackage));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ""));
        }
    }


    @DeleteMapping("/membershipPackage/{id}/delete")
    public ResponseEntity<ApiResponse> deleteMembershipPackage(@PathVariable Long id){
        try{
            membershipPackageService.deleteMembershipPackageById(id);
            return ResponseEntity.ok(new ApiResponse("Success", null));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ""));
        }
    }

    @PutMapping("/membershipPackage/{id}/update")
    public ResponseEntity<ApiResponse> updateMembershipPackage(@PathVariable Long id, @RequestBody MembershipPackage membershipPackage){
        try{
            MembershipPackage theMembershipPackage = membershipPackageService.updateMembershipPackage(membershipPackage, id);
            return ResponseEntity.ok(new ApiResponse("Success", theMembershipPackage));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
