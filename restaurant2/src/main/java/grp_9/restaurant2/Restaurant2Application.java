package grp_9.restaurant2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableRetry
@EnableScheduling
public class Restaurant2Application {

	public static void main(String[] args) {
		SpringApplication.run(Restaurant2Application.class, args);
	}

}
