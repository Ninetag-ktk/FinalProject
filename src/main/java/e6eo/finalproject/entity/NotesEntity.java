package e6eo.finalproject.entity;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Document(collection = "notes")
@Data
@NoArgsConstructor
public class NotesEntity {
    @Id
    @Field(name = "_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Object id;
    @Field(name = "category_id")
    private Object categoryId;
    @Field(name = "type")
    private Object type;
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
    public NotesEntity(Object id, Object categoryId, Object type, Object status, Object startTime, Object endTime, Object title, Object contents, Object etag, Object haveRepost) {
        this.id = id;
        this.categoryId = categoryId;
        this.type = type;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
        this.title = title;
        this.contents = contents;
        this.etag = etag;
        this.haveRepost = haveRepost;
    }

    public NotesEntity noteWriter(Map<String, String> data){
        NotesEntity post = NotesEntity.builder()
//                .id()
                .categoryId("e6eo")
                .type(data.get("kind"))
                .status(data.get("status"))
                .startTime(data.get("start"))
                .endTime(data.get("end"))
                .title(data.get("title"))
                .contents(data.get("description"))
                .build();
        return post;

    }

    public NotesEntity eventParser(Map<String, Object> event, String userId, String calendar) {
        Map<String, String> start = (Map<String, String>) event.get("start");
        Map<String, String> end = (Map<String, String>) event.get("end");
        String kind = event.get("kind").toString().split("#")[1];
        NotesEntity post = NotesEntity.builder()
                .id(event.get("id"))
                .categoryId(userId + "#google^calendar^" + calendar)
                .type(kind)
                .status(event.get("status"))
                .startTime(start.get("date") != null ? start.get("date") : start.get("dateTime"))
                .endTime(end.get("date") != null ? end.get("date") : end.get("dateTime"))
                .title(event.get("summary"))
                .contents(event.get("description"))
                .etag(event.get("etag"))
                .build();
        return post;
    }

    public NotesEntity taskParser(Map<String, Object> task, String userId, String tasklist) {
        String kind = task.get("kind").toString().split("#")[1];
        NotesEntity post = NotesEntity.builder()
                .id(task.get("id"))
                .categoryId(userId + "#google^tasks^" + tasklist)
                .type(kind)
                .status(task.get("deleted") == null ? task.get("status") : "cancelled")
                .startTime(task.get("due"))
                .endTime(task.get("due"))
                .title(task.get("title"))
                .contents(task.get("notes"))
                .etag(task.get("etag"))
                .build();
        return post;
    }
}
