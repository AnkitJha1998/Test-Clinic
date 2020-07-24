package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.ExaminationPathology;

/*
 * Service Implementation for Pathology Examination Entity 
 */
public interface ExaminationPathologyService extends CrudRepository<ExaminationPathology, Integer>{
}
