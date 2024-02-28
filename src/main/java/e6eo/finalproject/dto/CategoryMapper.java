package e6eo.finalproject.dto;

import e6eo.finalproject.entity.CategoryEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryMapper extends MongoRepository<CategoryEntity, String> {
}
