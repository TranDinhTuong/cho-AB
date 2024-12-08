package com.example.choAB.core;
import com.example.choAB.model.Post;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PostSpecification {

    public Specification<Post> hasCategory(String category) {
        return (root, query, criteriaBuilder) -> category == null ? null :
                criteriaBuilder.equal(root.get("category").get("name"), category);
    }

    public Specification<Post> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> title == null ? null :
                criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public Specification<Post> hasPriceBetween(Long minPrice, Long maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (minPrice == null && maxPrice == null) return null;
            if (minPrice != null && maxPrice != null)
                return criteriaBuilder.between(root.get("price"), BigDecimal.valueOf(minPrice), BigDecimal.valueOf(maxPrice));
            if (minPrice != null)
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), BigDecimal.valueOf(minPrice));
            return criteriaBuilder.lessThanOrEqualTo(root.get("price"), BigDecimal.valueOf(maxPrice));
        };
    }

    public Specification<Post> hasLocation(String location) {
        return (root, query, criteriaBuilder) -> location == null ? null :
                criteriaBuilder.equal(root.get("location"), location);
    }
}
