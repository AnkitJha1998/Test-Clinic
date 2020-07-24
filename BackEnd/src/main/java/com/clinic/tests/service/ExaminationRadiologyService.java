package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.ExaminationRadiology;

/*
 * Service Implementation for Examination Radiology Entity 
 */
public interface ExaminationRadiologyService extends CrudRepository<ExaminationRadiology,Integer>{
}
