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
import org.springframework.web.bind.annotation.RestController;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.ExaminationPathology;
import com.clinic.tests.service.ExaminationPathologyService;

/*
 * This class consists of the APIs for handling Pathology Examination details.
 * Here, basic operations on ExaminationPathology database is done
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ExaminationPathologyController {

	@Autowired
	private ExaminationPathologyService examServ;

	/*
	 * This retrieves all Pathology Examination from database.
	 */
	@GetMapping("/examinationPathos")
	public Iterable<ExaminationPathology> getallExamPatho() {
		PatientMedicalRecordApplication.LOGGER.info("Examination Pathology List Retrieval");
		return examServ.findAll();
	}

	/*
	 * This saves the Pathology Examination details in the database.
	 */
	@PostMapping("/examinationPathos")
	public ResponseEntity<Integer> postExamPatho(@RequestBody ExaminationPathology patho) {
		PatientMedicalRecordApplication.LOGGER.info("Examination Pathology Data Saving Initiated");
		ExaminationPathology examPatho = examServ.save(patho);
		if (examPatho == null)
			examPatho = new ExaminationPathology();
		//status: 201
		return new ResponseEntity<Integer>(examPatho.getExamPathoId(),HttpStatus.CREATED);
	}

	/*
	 * This retrieves the Pathology Examination By it's Id.
	 */
	@GetMapping("/examinationPathos/{id}")
	public Optional<ExaminationPathology> getByIdExam(@PathVariable int id) {
		PatientMedicalRecordApplication.LOGGER.info("Examination Pathology By Id Data Retrieval");
		return examServ.findById(id);
	}
	
	/*
	 * This method updates Pathology Exam.
	 */
	@PutMapping("/examinationPathos")
	public String updateExamination(@RequestBody ExaminationPathology exam)
	{
		PatientMedicalRecordApplication.LOGGER.info("Examination Pathology Data Updation Initiated");
		examServ.save(exam);
		return "Update Done";
	}

}
