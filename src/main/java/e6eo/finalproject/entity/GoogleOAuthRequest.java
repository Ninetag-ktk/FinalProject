package e6eo.finalproject.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GoogleOAuthRequest {
    private String accessType;
    private String clientId;
    private String clientSecret;
    private String code;
    private String redirectUri;
    private String responseType;
    private String scope;
    private String grantType;
    private String state;
    private String includeGrantedScopes;
    private String loginHint;
    private String prompt;
}
