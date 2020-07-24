package com.clinic.tests.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.Examination;
import com.clinic.tests.service.ExaminationService;

/*
 * This Class consists of API for maintaining Examination details.
 * Here the basic functionalities of Examination Database is done.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ExaminationController {

	@Autowired
	private ExaminationService examServ;

	/*
	 * This method retrieves all the Examinations from the database.
	 */
	@GetMapping("/examinations")
	public Iterable<Examination> getAllExaminations() {
		PatientMedicalRecordApplication.LOGGER.info("Examination List Retrieval");
		return examServ.findAll();
	}

	/*
	 * This method posts the examination in the database
	 */
	@PostMapping("/examinations")
	public ResponseEntity<Integer> postExamination(@RequestBody Examination examDet) {
		PatientMedicalRecordApplication.LOGGER.info("Examination Data Saving Initiated");
		Examination retExam = examServ.save(examDet);
		if (retExam == null)
			retExam = new Examination();
		return new ResponseEntity<Integer>(retExam.getExamId(),HttpStatus.CREATED);
	}

	/*
	 * This method retrieves the examination details by it's ID.
	 */
	@GetMapping("/examinations/{id}")
	public Optional<Examination> getExamById(@PathVariable int id) {
		PatientMedicalRecordApplication.LOGGER.info("Examination Data Retrieval By ID initiated");
		return examServ.findById(id);
	}

	/*
	 * This method retrieves the examination details by patient ID.
	 */
	@GetMapping("/examinations/patient-test")
	public Iterable<Examination> getPatientTestRecord(@RequestParam(value = "patientId") int patId) {
		PatientMedicalRecordApplication.LOGGER.info("Examination Data Retrieval By Patient Id Initiated");
		return examServ.findByPatId(patId);
	}
	
	/*
	 * This method retrieves the examination details by Lab Technician ID.
	 */
	@GetMapping("/examinations/labTech-test")
	public Iterable<Examination> getTechnicianTestDet(@RequestParam(value = "labTechId") int labTechId) {
		PatientMedicalRecordApplication.LOGGER.info("Examination Data Retrieval By Lab Technician Id Initiated");
		return examServ.findByLabTechId(labTechId);
	}
	/*
	 * This method updates the examination details in the database.
	 */
	@PutMapping("/examinations/test-update")
	public String updateExamEntry(@RequestBody Examination exam)
	{
		PatientMedicalRecordApplication.LOGGER.info("Update of Examination Entry Initiated");
		examServ.save(exam);
		return "Update Successful";
	}
}
