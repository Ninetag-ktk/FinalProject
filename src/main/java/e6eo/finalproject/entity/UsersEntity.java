package e6eo.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsersEntity {
    @Id
    @Column(name = "UserID")
    private String UserID;
    @Column(name = "PW")
    private String PW;
    @Column(name = "NickName")
    private String NickName;
    @Column(name = "InnerID")
    private String InnerID;



}
