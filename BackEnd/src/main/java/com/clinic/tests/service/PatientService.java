package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.Patient;

/*
 * Service Implementation for Patient Entity 
 */
public interface PatientService extends CrudRepository<Patient, Integer>{
	
	Iterable<Patient> findByPatFirstNameAndPatLastName(String first,String last);
	Iterable<Patient> findByPatFirstName(String first);
	Iterable<Patient> findByPatLastName(String last);
	
}
