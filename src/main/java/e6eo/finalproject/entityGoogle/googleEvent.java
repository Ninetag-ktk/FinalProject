package e6eo.finalproject.entityGoogle;

import com.google.api.client.util.DateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class googleEvent {
    private String etag;
    private String id;
    private String summary;
    private String description;
    private Map<String, String> start;
    private Map<String, String> end;
}
