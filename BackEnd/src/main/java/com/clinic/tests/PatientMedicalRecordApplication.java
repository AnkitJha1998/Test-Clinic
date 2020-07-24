package com.clinic.tests;

import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the application
 * @author AJ078354
 *
 */


@SpringBootApplication
public class PatientMedicalRecordApplication {
	
	public static final Logger LOGGER=org.slf4j.LoggerFactory.getLogger(PatientMedicalRecordApplication.class);
	public static void main(String[] args) {
		LOGGER.info("Application Starting");
		SpringApplication.run(PatientMedicalRecordApplication.class, args);
		LOGGER.info("Application Started");
		
		
	}
}
