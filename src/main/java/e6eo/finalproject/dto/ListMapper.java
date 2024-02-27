package e6eo.finalproject.dto;

import e6eo.finalproject.entity.ListEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListMapper extends MongoRepository<ListEntity, String> {
}
