package e6eo.finalproject.entity;


import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "posts")
public class PostsEntity {
    @Id
    private String id;
    @Field("collectionId")
    private String collectionId;
    @Field("haveRepost")
    private String haveRepost;
    @Field("startTime")
    private String startTime;
    @Field("endTime")
    private String endTime;
    @Field("contents")
    private String contents;
    @Field("etag")
    private String etag;

    @Builder
    public PostsEntity(String collectionId, String haveRepost, String startTime, String endTime, String contents, String etag) {
        this.collectionId = collectionId;
        this.haveRepost = haveRepost;
        this.startTime = startTime;
        this.endTime = endTime;
        this.contents = contents;
        this.etag = etag;
    }
}
