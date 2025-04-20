package com.bskjp.refresh.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.bskjp.refresh.restaurant.model")
public class RefreshRestaurantApplication {

	public static void main(String[] args) {
		SpringApplication.run(RefreshRestaurantApplication.class, args);

	}

}
