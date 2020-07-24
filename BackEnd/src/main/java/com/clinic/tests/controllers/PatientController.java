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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.Patient;
import com.clinic.tests.service.PatientService;

/*
 * This Class consists of the API for Patient Details.
 * Here we manage basic Patient Database Functionalities.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PatientController {

	@Autowired
	private PatientService patServ;
	
	/*
	 * This method gets all patient details.
	 */
	@GetMapping("/patients")
	public Iterable<Patient> getAllPatients()
	{
		PatientMedicalRecordApplication.LOGGER.info("Patient List Retrieval");
		return patServ.findAll();
	}
	
	/*
	 *  This method posts the patient details in the database.
	 */
	@PostMapping("/patients")
	public ResponseEntity<String> postPatient(@RequestBody Patient patientData)
	{
		PatientMedicalRecordApplication.LOGGER.info("Patient Data Saving Initiated");
		Patient saved=patServ.save(patientData);
		if(saved==null)
			saved=new Patient();
		return new ResponseEntity<String>(String.valueOf(saved.getPatId()),HttpStatus.CREATED);
	}
	
	/*
	 *  This method gets patient details by the id.
	 */
	@GetMapping("/patients/{id}")
	public Optional<Patient> getPatientById(@PathVariable int id)
	{
		PatientMedicalRecordApplication.LOGGER.info("Patient Data By Id Retrieval");
		return patServ.findById(id);
	}
	
	/*
	 * This method gets patient details by first name and last name.
	 */
	@GetMapping("/patients/name")
	public Iterable<Patient> getPatientDetailsByName(@RequestParam(value = "firstName", required=false)String firstName,@RequestParam(value = "lastName",required=false)String lastName )
	{
		if(firstName!=null && lastName!=null) {
			PatientMedicalRecordApplication.LOGGER.info("Patient Data Retrieval By First and Last Name");
			return patServ.findByPatFirstNameAndPatLastName(firstName, lastName);
		}
		else if(firstName!=null) {
			PatientMedicalRecordApplication.LOGGER.info("Patient Data Retrieval By Last Name");
			return patServ.findByPatFirstName(firstName);
		}
		else if(lastName!=null) {
			PatientMedicalRecordApplication.LOGGER.info("Patient Data Retrieval By First Name");
			return patServ.findByPatLastName(lastName);
		}
		else {
			PatientMedicalRecordApplication.LOGGER.info("Patient List Retrieval");
			return patServ.findAll();
		}
	}
}
