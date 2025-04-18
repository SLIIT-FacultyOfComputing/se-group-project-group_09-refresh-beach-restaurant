package grp_9.restaurant2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class Restaurant2Application {

	public static void main(String[] args) {
		SpringApplication.run(Restaurant2Application.class, args);
	}

}
