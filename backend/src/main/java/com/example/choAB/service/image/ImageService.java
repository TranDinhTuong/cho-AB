package com.example.choAB.service.image;

import com.example.choAB.dto.ImageDto;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Image;
import com.example.choAB.model.Post;
import com.example.choAB.repository.ImageRepository;
import com.example.choAB.service.post.IPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService{
    private final ImageRepository imageRepository;
    private final IPostService postService;
    @Override
    public Image getImageById(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No image found with: " + id));
    }

    @Override
    public void deleteImageById(Long id) {
        imageRepository.findById(id).ifPresentOrElse(
                imageRepository::delete,
                () -> new ResourceNotFoundException("No image found with: " + id)
        );
    }

    @Override
    public List<ImageDto> saveImages(Long postId, List<MultipartFile> files) {
        Post post = postService.getPostById(postId);
        List<ImageDto> savedImageDto = new ArrayList<>();
        for(MultipartFile file : files){
            try {
                Image image = new Image();
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setImage(new SerialBlob(file.getBytes()));
                image.setPost(post);

                String buildDownloadUrl =  "/api/v1/images/image/download/";
                String downloadUrl = buildDownloadUrl + image.getId();
                image.setDownloadUrl(downloadUrl);

                Image savedImage  = imageRepository.save(image);
                savedImage.setDownloadUrl( buildDownloadUrl + savedImage.getId());
                imageRepository.save(savedImage);

                ImageDto imageDto = new ImageDto();
                imageDto.setId(savedImage.getId());
                imageDto.setFileName(savedImage.getFileName());
                imageDto.setDownloadUrl(savedImage.getDownloadUrl());
                savedImageDto.add(imageDto);
            }catch (IOException | SQLException e){
                throw new ResourceNotFoundException(e.getMessage());
            }
        }
        return savedImageDto;
    }

    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        Image image = getImageById(imageId);
        try {
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        }catch (IOException | SQLException e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
}
