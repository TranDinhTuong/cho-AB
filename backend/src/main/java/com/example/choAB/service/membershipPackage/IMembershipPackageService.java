package com.example.choAB.service.membershipPackage;

import com.example.choAB.model.MembershipPackage;

import java.util.List;

public interface IMembershipPackageService {
    MembershipPackage getMembershipPackageById(Long id);
    MembershipPackage getMembershipPackageByName(String name);
    List<MembershipPackage> getAllMembershipPackages();
    MembershipPackage addMembershipPackage(MembershipPackage membershipPackage);

    MembershipPackage updateMembershipPackage(MembershipPackage membershipPackage, Long id);

    void deleteMembershipPackageById(Long id);
}
