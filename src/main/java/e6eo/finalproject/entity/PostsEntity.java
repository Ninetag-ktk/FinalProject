package e6eo.finalproject.entity;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Document(collection = "posts")
@Data
@NoArgsConstructor
public class PostsEntity {
    @Id
    @Field(name = "_id")
    private Object id;
    @Field(name = "category_id")
    private Object categoryId;
    @Field(name = "status")
    private Object status;
    @Field(name = "start_time")
    private Object startTime;
    @Field(name = "end_time")
    private Object endTime;
    @Field(name = "title")
    private Object title;
    @Field(name = "contents")
    private Object contents;
    @Field(name = "etag")
    private Object etag;
    @Field(name = "have_repost")
    private Object haveRepost;

    @Builder
    public PostsEntity(Object id, Object categoryId, Object status, Object startTime, Object endTime, Object title, Object contents, Object etag, Object haveRepost) {
        this.id = id;
        this.categoryId = categoryId;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
        this.title = title;
        this.contents = contents;
        this.etag = etag;
        this.haveRepost = haveRepost;
    }

    public PostsEntity eventParser(Map<String, Object> event, String userId, String calendar) {
        Map<String, String> start = (Map<String, String>) event.get("start");
        Map<String, String> end = (Map<String, String>) event.get("end");
        PostsEntity post = PostsEntity.builder()
                .id(event.get("id"))
                .categoryId(userId + "#google^calendar^" + calendar)
                .status(event.get("status"))
                .startTime(start.get("date") != null ? start.get("date") : start.get("dateTime"))
                .endTime(end.get("date") != null ? end.get("date") : end.get("dateTime"))
                .title(event.get("summary"))
                .contents(event.get("description"))
                .etag(event.get("etag"))
                .build();
        return post;
    }

    public PostsEntity taskParser(Map<String, Object> task, String userId, String tasklist) {
        PostsEntity post = PostsEntity.builder()
                .id(task.get("id"))
                .categoryId(userId + "#google^tasks^" + tasklist)
                .status(task.get("status"))
                .startTime(task.get("due"))
                .endTime(task.get("due"))
                .title(task.get("title"))
                .contents(task.get("notes"))
                .etag(task.get("etag"))
                .build();
        return post;
    }
}
