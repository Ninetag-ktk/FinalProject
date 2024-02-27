package e6eo.finalproject.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "CollectionList")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListEntity {
    @Id
    @Field("UserId")
    private String UserId;
    @Field("CollectionIds")
    private String CollectionIds;
}
