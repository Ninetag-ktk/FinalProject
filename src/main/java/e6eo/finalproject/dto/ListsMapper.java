package e6eo.finalproject.dto;

import e6eo.finalproject.entity.ListsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface ListsMapper extends MongoRepository<ListsEntity, String> {
}
