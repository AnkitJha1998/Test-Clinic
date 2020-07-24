package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.Login;

/*
 * Service Implementation for Login Entity 
 */
public interface LoginService extends CrudRepository<Login, String> {

}
