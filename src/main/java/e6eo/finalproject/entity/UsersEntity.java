package e6eo.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsersEntity {
    @Id
    @Column(name = "user_id", unique = true, nullable = false)
    private String userId;
    @Column(name = "pw", nullable = false)
    private String pw;
    @Column(name = "nickname", nullable = false)
    private String nickName;
    @Column(name = "inner_id", nullable = true)
    private String innerId;
    @Column(name = "refresh_token", nullable = true)
    private String refreshToken;
}
