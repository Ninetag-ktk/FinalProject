package e6eo.finalproject.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "collectionList")
@Data
@NoArgsConstructor
public class CollectionsEntity {
    @Id
    @Field("userId")
    private String userId;
    @Field("collectionIds")
    private List<String> collectionIds;

    @Builder
    public CollectionsEntity(String userId, List<String> collectionIds) {
        this.userId = userId;
        this.collectionIds = collectionIds;
    }

}
