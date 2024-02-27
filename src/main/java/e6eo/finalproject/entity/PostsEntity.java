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

    @Builder
    public PostsEntity(String id, String collectionId, String haveRepost, String startTime, String endTime, String contents, String etag) {
        this.id = id;
        this.CollectionId = collectionId;
        this.HaveRepost = haveRepost;
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.Contents = contents;
        this.Etag = etag;
    }
}
