package e6eo.finalproject.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;

@Document(collection = "category")
@Data
@NoArgsConstructor
public class CategoryEntity {
    @Id
    @Field(name = "_id")
    private String userId;
    @Field(name = "categories", targetType = FieldType.ARRAY)
    private String categories; // 문자열 구분은 공백없이 반점(,)만 사용할 것

    @Builder
    public CategoryEntity(String userId, String categories) {
        this.userId = userId;
        this.categories = categories;
    }

}
