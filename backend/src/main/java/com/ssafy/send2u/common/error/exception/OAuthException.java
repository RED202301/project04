package com.ssafy.send2u.common.error.exception;

import com.ssafy.send2u.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class OAuthException extends RuntimeException {

    private final ErrorCode errorCode;

    public OAuthException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
