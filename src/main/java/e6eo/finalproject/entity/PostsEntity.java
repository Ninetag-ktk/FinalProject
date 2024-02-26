package e6eo.finalproject.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Posts")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostsEntity {
    @Id
    private String id;
    @Field("CollectionId")
    private String CollectionId;
    @Field("HaveRepost")
    private String HaveRepost;
    @Field("StartTime")
    private String StartTime;
    @Field("EndTime")
    private String EndTime;
    @Field("Contents")
    private String Contents;
    @Field("Etag")
    private String Etag;
}
