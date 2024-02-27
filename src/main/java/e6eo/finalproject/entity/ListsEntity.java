package e6eo.finalproject.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "CollectionList")
@Data
@NoArgsConstructor
public class ListsEntity {
    @Id
    @Field("UserId")
    private String UserId;
    @Field("CollectionIds")
    private List<String> CollectionIds;

    @Builder
    public ListsEntity(String userId, List<String> collectionIds) {
        this.UserId = userId;
        this.CollectionIds = collectionIds;
    }
}
