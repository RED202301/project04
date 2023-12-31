package com.ssafy.send2u;

import com.ssafy.send2u.common.config.properties.AppProperties;
import com.ssafy.send2u.common.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
@EnableJpaAuditing
public class Send2uApplication {

	public static void main(String[] args) {
		SpringApplication.run(Send2uApplication.class, args);
	}

}
