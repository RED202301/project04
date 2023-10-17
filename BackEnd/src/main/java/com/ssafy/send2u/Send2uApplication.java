package com.ssafy.send2u;

import com.ssafy.send2u.common.config.properties.AppProperties;
import com.ssafy.send2u.common.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
public class Send2uApplication {

	public static void main(String[] args) {
		SpringApplication.run(Send2uApplication.class, args);
	}

}
