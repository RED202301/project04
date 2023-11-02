package com.ssafy.send2u.common.error.exception;

import com.ssafy.send2u.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class NoAuthorizationException extends RuntimeException {

    private final ErrorCode errorCode;

    public NoAuthorizationException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
