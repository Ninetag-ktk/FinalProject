package e6eo.finalproject.dto;

import e6eo.finalproject.entity.NotesEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesMapper extends MongoRepository<NotesEntity, String> {

    @Query(value = "{ 'categoryId': { '$regex': '^?0.*' } }", delete = true)
    void deleteAllByUserId(String UserId);

    @Query(value = "{ 'category_id' : { '$regex': '^?0' }}")
    List<NotesEntity> findByUserId(String userId);

}
