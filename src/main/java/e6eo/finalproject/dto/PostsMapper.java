package e6eo.finalproject.dto;

import e6eo.finalproject.entity.PostsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostsMapper extends MongoRepository<PostsEntity, String> {
}
