package com.clinic.tests.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.Doctor;
import com.clinic.tests.service.DoctorService;

/*
 * This Class consists of API's for the Maintaining of the database
 * Here, we do the basic operations on the doctor database.
 */

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DoctorController {

	@Autowired
	private DoctorService docServ;

	/*
	 * This method verifies the availability of the API
	 */
	@RequestMapping("/")
	public String greeting() {
		PatientMedicalRecordApplication.LOGGER.info("API Being Checked");
		return "<h3>This is an api for storing Medical Records.</h3>";
	}

	/*
	 * This method fetches the details of all the doctors stored in the DB.
	 */
	@GetMapping("/doctors")
	public Iterable<Doctor> getAllDoctors() {
		PatientMedicalRecordApplication.LOGGER.info("Retrieving All Doctor Info");
		return docServ.findAll();
	}

	/*
	 * This method does the saving details functionality of the database.
	 */
	@PostMapping("/doctors")
	public ResponseEntity<Integer> postDoctorData(@RequestBody Doctor doc) {
		PatientMedicalRecordApplication.LOGGER.info("Posting Doctor Data");
		Doctor doctorObj = docServ.save(doc);
		if (doctorObj == null) {
			PatientMedicalRecordApplication.LOGGER.warn("No data Received. Check With Database.");
			doctorObj = new Doctor();
		}
		PatientMedicalRecordApplication.LOGGER.info("Doctor Data Saved");
		return new ResponseEntity<Integer>(doctorObj.getDocId(),HttpStatus.CREATED);
	}

	/*
	 * This method gets the doctor details from the id requested.
	 */
	@GetMapping("/doctors/{id}")
	public Optional<Doctor> getDoctorById(@PathVariable int id) {
		PatientMedicalRecordApplication.LOGGER.info("Doctor Data Retrieval By ID");
		return docServ.findById(id);
	}

	/*
	 * This method does the custom search in the database on the basis of First Name
	 * and Last Name.
	 */
	@GetMapping("/doctors/doctor-name")
	public Iterable<Doctor> docNames(@RequestParam(value = "firstName", required = false) String firstName,
			@RequestParam(value = "lastName", required = false) String lastName) {
		if (firstName != null && lastName != null) {
			PatientMedicalRecordApplication.LOGGER.info("Doctor Data Retrieval By Both Names");
			return docServ.findByDocFirstNameAndDocLastName(firstName, lastName);
		}
		else if (firstName != null) {
			PatientMedicalRecordApplication.LOGGER.info("Doctor Data Retrieval By First Name");
			return docServ.findByDocFirstName(firstName);
		}
		else if (lastName != null) {
			PatientMedicalRecordApplication.LOGGER.info("Doctor Data Retrieval By Last Name");
			return docServ.findByDocLastName(lastName);
		}
		else {
			PatientMedicalRecordApplication.LOGGER.info("Whole Doctors List Retrieval");
			return docServ.findAll();
		}
	}

}
