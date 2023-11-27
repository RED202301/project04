package com.ssafy.send2u.common.oauth.info.impl;

import com.ssafy.send2u.common.oauth.info.OAuth2UserInfo;
import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("nickname");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("thumbnail_image");
    }

    @Override
    public String setImageUrl() {

        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        String http =  (String) properties.get("thumbnail_image");
        String https = http.replaceFirst("^http:/", "https:/");

        properties.replace("thumbnail_image",(Object) https);

        return https;

    }


}
