package com.clinic.tests.controllers;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.Login;
import com.clinic.tests.service.LoginService;

/*
 * This Class consists of API's for the Maintaining of the database
 * Here, we do the basic operations on the Login Credentials database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class LoginController {

	@Autowired
	LoginService serv;
	
	/*
	 * This method validates the user credentials with the credentials in the database.
	 */
	@PostMapping("/login")
	public String validate(@RequestBody Login logInCredentials) {
		PatientMedicalRecordApplication.LOGGER.info("Authentication Initiated");
		Optional<Login> retrieve = serv.findById(logInCredentials.getUsername());

		if (retrieve.isPresent()) {
			Login temp = retrieve.get();
			PatientMedicalRecordApplication.LOGGER.info("Username Correct");
			if (temp.getPassword().equals(logInCredentials.getPassword())) {
				PatientMedicalRecordApplication.LOGGER.info("Authentication Successful");
				return "Authentication Successful";
			}
		}

		PatientMedicalRecordApplication.LOGGER.info("Authentication Failed");
		return "Authentication Failed";
	}

}
