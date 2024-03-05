package e6eo.finalproject.dto;

import e6eo.finalproject.entity.NotesEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesMapper extends MongoRepository<NotesEntity, String> {
}
