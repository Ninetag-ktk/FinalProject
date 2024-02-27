package e6eo.finalproject.dto.collectionsList;

import e6eo.finalproject.entity.CollectionsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionsRepository extends MongoRepository<CollectionsEntity, String> {
    public List<CollectionsEntity> findAllByUserId(String userId);
}
