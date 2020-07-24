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
import com.clinic.tests.entities.ExaminationRadiology;
import com.clinic.tests.service.ExaminationRadiologyService;

/*
 * This Class contains APIs for managing Radiology Examination details.
 * Here basic operations are done on ExaminationRadiology database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ExaminationRadiologyController {
	
	@Autowired
	private ExaminationRadiologyService examServ;
	
	/*
	 * This Method retrieves all Radiology Examination Details.
	 */
	@GetMapping("/examinationRadios")
	public Iterable<ExaminationRadiology> getAllExamRadios()
	{
		PatientMedicalRecordApplication.LOGGER.info("Examination Radiology List Retrieval");
		return examServ.findAll();
	}
	
	/*
	 * This Method posts the Radiology Examination details in the database. 
	 */
	@PostMapping("/examinationRadios")
	public ResponseEntity<Integer> postExamRadio(@RequestBody ExaminationRadiology examRadio)
	{
		PatientMedicalRecordApplication.LOGGER.info("Examination Radiology Data Saving Initiated");
		ExaminationRadiology retExam=examServ.save(examRadio);
		if(retExam==null)
			retExam=new ExaminationRadiology();
		return new ResponseEntity<Integer>(retExam.getExamRadioId(),HttpStatus.CREATED);
	}
	
	/*
	 * This Method gets The Radiology Examination details by it's ID.
	 */
	@GetMapping("/examinationRadios/{id}")
	public Optional<ExaminationRadiology> getByIdExamRadio(@PathVariable int id)
	{
		PatientMedicalRecordApplication.LOGGER.info("Examination Radiology By Id Data Retrieval");
		return examServ.findById(id);
	}
	
	/*
	 * This method updates Radiology Test.
	 */
	@PutMapping("/examinationRadios")
	public String updateExamination(@RequestBody ExaminationRadiology exam)
	{
		PatientMedicalRecordApplication.LOGGER.info("Examination Radiology Updation  Initiated");
		examServ.save(exam);
		return "Update done!"; 
	}
}
