package e6eo.finalproject.entity;


import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "posts")
public class PostsEntity {
    @Id
    private String id;
    @Field(name = "category_id")
    private String categoryId;
    @Field(name = "have_repost")
    private String haveRepost;
    @Field(name = "start_time")
    private String startTime;
    @Field(name = "end_time")
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
