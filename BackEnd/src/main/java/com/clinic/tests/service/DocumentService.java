package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.Document;

/*
 * Service Implementation for Downloads Entity 
 */
public interface DocumentService extends CrudRepository<Document, Integer>{

}
