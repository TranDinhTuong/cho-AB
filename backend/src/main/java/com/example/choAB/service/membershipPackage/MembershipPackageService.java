package com.example.choAB.service.membershipPackage;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.MembershipPackage;
import com.example.choAB.repository.MembershipPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MembershipPackageService implements IMembershipPackageService{
    private final MembershipPackageRepository membershipPackageRepository;

    @Override
    public MembershipPackage getMembershipPackageById(Long id) {
        return membershipPackageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MembershipPackage not found!"));
    }

    @Override
    public MembershipPackage getMembershipPackageByName(String name) {
        return membershipPackageRepository.findByName(name);
    }

    @Override
    public List<MembershipPackage> getAllMembershipPackages() {
        return membershipPackageRepository.findAll();
    }

    @Override
    public MembershipPackage addMembershipPackage(MembershipPackage membershipPackage) {
        return Optional.of(membershipPackage)
                .filter(c -> !membershipPackageRepository.existsByName(c.getName()))
                .map(membershipPackageRepository :: save)
                .orElseThrow(() -> new ResourceNotFoundException(membershipPackage.getName() + " already exist!"));
    }

    @Override
    public MembershipPackage updateMembershipPackage(MembershipPackage membershipPackage, Long id) {
        return Optional.ofNullable(getMembershipPackageById(id)).map(oldMembershipPackage ->{
            oldMembershipPackage.setName(membershipPackage.getName());
            return membershipPackageRepository.save(oldMembershipPackage);
        }).orElseThrow(() -> new ResourceNotFoundException("MembershipPackage not found!"));
    }

    @Override
    public void deleteMembershipPackageById(Long id) {
        membershipPackageRepository.findById(id)
                .ifPresentOrElse(
                        membershipPackageRepository::delete,
                        () -> new ResourceNotFoundException("MembershipPackage not found!")
                );
    }
}
