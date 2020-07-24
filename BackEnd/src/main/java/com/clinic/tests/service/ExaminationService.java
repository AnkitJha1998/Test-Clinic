package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.Examination;

/*
 * Service Implementation for Examination Entity 
 */
public interface ExaminationService extends CrudRepository<Examination, Integer> {

	Iterable<Examination> findByPatId(int patId);

	Iterable<Examination> findByLabTechId(int labTechId);
}
