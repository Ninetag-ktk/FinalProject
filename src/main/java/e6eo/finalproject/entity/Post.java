package e6eo.finalproject.entity;


import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "Post")
public class Post {

    @Id
    private ObjectId _id;

    @Field("PostID")
    private String PostID;

    @Field("CalenderID")
    private String CalenderID;

    @Field("HaveAns")
    private String HaveAns;

    @Field("StartTime")
    private String StartTime;

    @Field("EndTime")
    private String EndTime;

    @Field("Etag")
    private String Etag;

    @Field("Contents")
    private String Contents;
}
