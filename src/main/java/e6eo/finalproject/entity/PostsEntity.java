package e6eo.finalproject.entity;


import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "posts")
public class PostsEntity {
    @Id
    private String id;
    @Field(name = "categoryId")
    private String categoryId;
    @Field(name = "haveRepost")
    private String haveRepost;
    @Field(name = "startTime")
    private String startTime;
    @Field(name = "endTime")
    private String endTime;
    @Field(name = "contents")
    private String contents;
    @Field(name = "etag")
    private String etag;

    @Builder
    public PostsEntity(String categoryId, String haveRepost, String startTime, String endTime, String contents, String etag) {
        this.categoryId = categoryId;
        this.haveRepost = haveRepost;
        this.startTime = startTime;
        this.endTime = endTime;
        this.contents = contents;
        this.etag = etag;
    }
}
