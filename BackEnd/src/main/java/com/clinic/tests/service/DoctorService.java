package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.Doctor;

/*
 * Service Implementation for Doctor Entity 
 */
public interface DoctorService extends CrudRepository<Doctor, Integer>{
	
	Iterable<Doctor> findByDocFirstName(String docFirstName);
	Iterable<Doctor> findByDocLastName(String docLastName);
	Iterable<Doctor> findByDocFirstNameAndDocLastName(String docFirstName,String docLastName);

}
