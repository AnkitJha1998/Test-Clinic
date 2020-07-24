package com.clinic.tests.service;

import org.springframework.data.repository.CrudRepository;

import com.clinic.tests.entities.Employee;

/*
 * Service Implementation for Employee Entity 
 */

public interface EmployeeService extends CrudRepository<Employee, Integer> {

	Iterable<Employee> findByEmpFirstName(String empFirstName);

	Iterable<Employee> findByEmpLastName(String empLastName);

	Iterable<Employee> findByEmpFirstNameAndEmpLastName(String empFirstName, String empLastName);

	Iterable<Employee> findByEmpDesig(String empDesig);
	
	Iterable<Employee> findByEmpUsername(String empUsername);
}
