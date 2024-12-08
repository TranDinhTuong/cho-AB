package com.example.choAB.service.image;

import com.example.choAB.dto.ImageDto;
import com.example.choAB.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageService {
    Image getImageById(Long id);
    void deleteImageById(Long id);
    List<ImageDto> saveImages(Long postId, List<MultipartFile> files);
    void updateImage(MultipartFile file,  Long imageId);

    List<Image> getImagesByPostId(Long postId);

    ImageDto convertImageToDto(Image image);
}
