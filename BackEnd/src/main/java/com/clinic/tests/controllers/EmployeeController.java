package com.clinic.tests.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.Employee;
import com.clinic.tests.entities.Login;
import com.clinic.tests.service.EmployeeService;
import com.clinic.tests.service.LoginService;

/*
 * This Class consists of API's for the Maintaining of the database
 * Here, we do the basic operations on the Employee database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeService empServ;

	@Autowired
	private LoginService logServ;
	
	@PostMapping("/employees/username")
	public ResponseEntity<String> addUsername(@RequestBody Login log) {
		PatientMedicalRecordApplication.LOGGER.info("Check/Add Credentials Feature Called");
		if ((logServ.findById(log.getUsername())).isPresent()) {
			/*
			 * The Status code of HttpStatus.CONFLICT is 409
			 */
			PatientMedicalRecordApplication.LOGGER.warn("Username in Use");
			return new ResponseEntity<String>("Username Not Available",HttpStatus.CONFLICT);
		}
		PatientMedicalRecordApplication.LOGGER.info("Username Available");
		logServ.save(log);
		PatientMedicalRecordApplication.LOGGER.info("Credentials Updated");
		return new ResponseEntity<String>("Username Available",HttpStatus.CREATED);
	}

	/*
	 * This method posts the data passed on to the database and also checks if there
	 * is any username conflict.
	 */
	@PostMapping("/employees")
	public ResponseEntity<Integer> postEmployeeData(@RequestBody Employee employee) {
		PatientMedicalRecordApplication.LOGGER.info("Employee data storage initiated");
		Employee recvEmp = empServ.save(employee);
		if (recvEmp == null)
			recvEmp = new Employee();
		PatientMedicalRecordApplication.LOGGER.info("Employee Data Stored");
		return new ResponseEntity<Integer>(recvEmp.getEmpId(),HttpStatus.CREATED);
	}

	/*
	 * This method gets all the employees
	 */
	@GetMapping("/employees")
	public Iterable<Employee> getAllEmployees() {
		PatientMedicalRecordApplication.LOGGER.info("Employee List Retrieval Initiated");
		return empServ.findAll();
	}

	/*
	 * This method searches employee details by their id.
	 */
	@GetMapping("/employees/{id}")
	public Optional<Employee> getByIdEmployee(@PathVariable int id) {
		PatientMedicalRecordApplication.LOGGER.info("Employee By Id Data Retrieval Initiated");
		return empServ.findById(id);
	}

	/*
	 * This method searches employee details by their first and last name.
	 */
	@GetMapping("/employees/searchName")
	public Iterable<Employee> getByFirstAndLastmployee(
			@RequestParam(value = "firstName", required = false) String empFirstName,
			@RequestParam(value = "lastName", required = false) String empLastName) {
		if (empFirstName != null && empLastName != null) {
			PatientMedicalRecordApplication.LOGGER.info("Employee Data Retrieval By Both Names");
			return empServ.findByEmpFirstNameAndEmpLastName(empFirstName, empLastName);
		}
		else if (empFirstName != null) {
			PatientMedicalRecordApplication.LOGGER.info("Employee Data Retrieval By Last Names");
			return empServ.findByEmpFirstName(empFirstName);
			}
		else if (empLastName != null) {
			PatientMedicalRecordApplication.LOGGER.info("Employee Data Retrieval By First Names");
			return empServ.findByEmpLastName(empLastName);
		}
		else {
			PatientMedicalRecordApplication.LOGGER.info("Employee List Retrieval");
			return empServ.findAll();
		}
	}

	/*
	 * This method searches employee details by their designation
	 */
	@GetMapping("/employees/desig")
	public Iterable<Employee> getByDesignation(@RequestParam("desig") String empDesig) {
		PatientMedicalRecordApplication.LOGGER.info("Employee Search By Designation");
		return empServ.findByEmpDesig(empDesig);
	}
	
	@GetMapping("/employees/username")
	public Iterable<Employee> getByUsername(@RequestParam("user") String username)
	{
		PatientMedicalRecordApplication.LOGGER.info("Employee Search By Username Initiated");
		return empServ.findByEmpUsername(username);
	}

}
