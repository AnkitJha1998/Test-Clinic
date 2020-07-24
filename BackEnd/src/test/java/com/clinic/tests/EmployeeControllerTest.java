package com.clinic.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.clinic.tests.controllers.EmployeeController;
import com.clinic.tests.entities.Employee;
import com.clinic.tests.entities.Login;
import com.clinic.tests.service.EmployeeService;
import com.clinic.tests.service.LoginService;

class EmployeeControllerTest {

	@InjectMocks
	EmployeeController empC;

	@Mock
	EmployeeService empServ;

	@Mock
	LoginService loginServ;

	@BeforeEach
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetAllEmployee() {
		ArrayList<Employee> list = new ArrayList<Employee>();
		Employee sampleEmp = new Employee();
		sampleEmp.setEmpId(1);
		sampleEmp.setEmpFirstName("Ankit");
		sampleEmp.setEmpLastName("Jha");
		sampleEmp.setEmpDesig(Designations.RECEPTIONIST);
		sampleEmp.setEmpAddr("Zolo Cosmos");
		sampleEmp.setEmpUsername("aj1998");
		sampleEmp.setEmpPhone("+91 9988764847");
		list.add(sampleEmp);
		sampleEmp.setEmpId(2);
		sampleEmp.setEmpFirstName("Carl");
		sampleEmp.setEmpLastName("Johnson");
		sampleEmp.setEmpDesig(Designations.LAB_TECHNICIAN);
		sampleEmp.setEmpAddr("Los Santos");
		sampleEmp.setEmpUsername("cj1998");
		sampleEmp.setEmpPhone("+1-9989-343466");
		list.add(sampleEmp);

		Mockito.when(empServ.findAll()).thenReturn(list);

		ArrayList<Employee> retList = (ArrayList<Employee>) empC.getAllEmployees();

		assertEquals(2, retList.size());
	}

	@Test
	public void testPostEmployeeData() {
		Employee sampleEmp = new Employee();
		sampleEmp.setEmpId(3);
		sampleEmp.setEmpFirstName("Asha");
		sampleEmp.setEmpLastName("Bhonsle");
		sampleEmp.setEmpDesig(Designations.PATHOLOGIST);
		sampleEmp.setEmpAddr("Mumbai");
		sampleEmp.setEmpUsername("ab1962");
		sampleEmp.setEmpPhone("+91 2274744847");

		empC.postEmployeeData(sampleEmp);

		Mockito.verify(empServ).save(sampleEmp);

	}
	
	
	@Test
	public void testUsernameConflict() {
		Login tempLog=new Login();
		tempLog.setUsername("ab1962");
		tempLog.setPassword("nextToLata");
		Mockito.when(loginServ.findById("ab1962")).thenReturn(Optional.of(tempLog));
		
		ResponseEntity<String> available=empC.addUsername(tempLog);
		
		assertEquals("Username Not Available",available.getBody());
		
	}
	
	
	
	@Test
	public void testUsernameAddFeature()
	{
		Login tempLog=new Login();
		tempLog.setUsername("ab1962");
		tempLog.setPassword("nextToLata");		
		ResponseEntity<String> available=empC.addUsername(tempLog);
		Mockito.verify(loginServ).save(tempLog);
		assertEquals("Username Available",available.getBody());
	}
	
	@Test
	public void testGetEmployeeById() {
		Employee sampleEmp = new Employee();
		sampleEmp.setEmpId(1);
		sampleEmp.setEmpFirstName("Ankit");
		sampleEmp.setEmpLastName("Jha");
		sampleEmp.setEmpDesig(Designations.RADIOLOGIST);
		sampleEmp.setEmpAddr("Zolo Cosmos");
		sampleEmp.setEmpUsername("aj1998");
		sampleEmp.setEmpPhone("+91 9988764847");

		Mockito.when(empServ.findById(1)).thenReturn(Optional.of(sampleEmp));

		Employee retEmp = empC.getByIdEmployee(1).get();

		assertEquals(1, retEmp.getEmpId());
		assertEquals("Ankit", retEmp.getEmpFirstName());
		assertEquals("Jha", retEmp.getEmpLastName());
		assertEquals(Designations.RADIOLOGIST, retEmp.getEmpDesig());
		assertEquals("Zolo Cosmos", retEmp.getEmpAddr());
		assertEquals("aj1998", retEmp.getEmpUsername());
		assertEquals("+91 9988764847", retEmp.getEmpPhone());

	}

	@Test
	public void testGetEmpByFirstName() {
		Employee sampEmp = new Employee();
		sampEmp.setEmpId(2);
		sampEmp.setEmpFirstName("Carl");
		sampEmp.setEmpLastName("Johnson");
		sampEmp.setEmpDesig(Designations.LAB_TECHNICIAN);
		sampEmp.setEmpAddr("Los Santos");
		sampEmp.setEmpUsername("cj1998");
		sampEmp.setEmpPhone("+1-9989-343466");

		ArrayList<Employee> empList = new ArrayList<Employee>();
		empList.add(sampEmp);

		Mockito.when(empServ.findByEmpFirstName("Carl")).thenReturn(empList);

		ArrayList<Employee> retList = (ArrayList<Employee>) empC.getByFirstAndLastmployee("Carl", null);

		assertEquals(1, retList.size());
	}

	@Test
	public void testGetEmpByLastName() {
		Employee sampEmp = new Employee();
		sampEmp.setEmpId(2);
		sampEmp.setEmpFirstName("Carl");
		sampEmp.setEmpLastName("Johnson");
		sampEmp.setEmpDesig(Designations.LAB_TECHNICIAN);
		sampEmp.setEmpAddr("Los Santos");
		sampEmp.setEmpUsername("cj1998");
		sampEmp.setEmpPhone("+1-9989-343466");

		ArrayList<Employee> empList = new ArrayList<Employee>();
		empList.add(sampEmp);

		Mockito.when(empServ.findByEmpLastName("Johnson")).thenReturn(empList);

		ArrayList<Employee> retLis = (ArrayList<Employee>) empC.getByFirstAndLastmployee(null, "Johnson");

		assertEquals(1, retLis.size());

	}

	@Test
	public void testGetEmpByFirstAndLastName() {

		Employee sampEmp = new Employee();
		sampEmp.setEmpId(2);
		sampEmp.setEmpFirstName("Carl");
		sampEmp.setEmpLastName("Johnson");
		sampEmp.setEmpDesig(Designations.LAB_TECHNICIAN);
		sampEmp.setEmpAddr("Los Santos");
		sampEmp.setEmpUsername("cj1998");
		sampEmp.setEmpPhone("+1-9989-343466");

		ArrayList<Employee> empList = new ArrayList<Employee>();
		empList.add(sampEmp);

		Mockito.when(empServ.findByEmpFirstNameAndEmpLastName("Carl", "Johnson")).thenReturn(empList);

		ArrayList<Employee> retLis = (ArrayList<Employee>) empC.getByFirstAndLastmployee("Carl", "Johnson");

		assertEquals(1, retLis.size());

	}

	@Test
	public void testGetByNoName() {
		ArrayList<Employee> list = new ArrayList<Employee>();
		Employee sampleEmp = new Employee();
		sampleEmp.setEmpId(1);
		sampleEmp.setEmpFirstName("Ankit");
		sampleEmp.setEmpLastName("Jha");
		sampleEmp.setEmpDesig(Designations.LAB_TECHNICIAN);
		sampleEmp.setEmpAddr("Zolo Cosmos");
		sampleEmp.setEmpUsername("aj1998");
		sampleEmp.setEmpPhone("+91 9988764847");
		list.add(sampleEmp);
		sampleEmp.setEmpId(2);
		sampleEmp.setEmpFirstName("Carl");
		sampleEmp.setEmpLastName("Johnson");
		sampleEmp.setEmpDesig(Designations.LAB_TECHNICIAN);
		sampleEmp.setEmpAddr("Los Santos");
		sampleEmp.setEmpUsername("cj1998");
		sampleEmp.setEmpPhone("+1-9989-343466");
		list.add(sampleEmp);

		Mockito.when(empServ.findAll()).thenReturn(list);

		ArrayList<Employee> getAll = (ArrayList<Employee>) empC.getByFirstAndLastmployee(null, null);

		assertEquals(2, getAll.size());

	}

	@Test
	public void testGetByDesig() {
		Employee sampleEmp = new Employee();
		sampleEmp.setEmpId(1);
		sampleEmp.setEmpFirstName("Ankit");
		sampleEmp.setEmpLastName("Jha");
		sampleEmp.setEmpDesig(Designations.RECEPTIONIST);
		sampleEmp.setEmpAddr("Zolo Cosmos");
		sampleEmp.setEmpUsername("aj1998");
		sampleEmp.setEmpPhone("+91 9988764847");

		ArrayList<Employee> list = new ArrayList<Employee>();
		list.add(sampleEmp);
		Mockito.when(empServ.findByEmpDesig("Receptionist")).thenReturn(list);

		ArrayList<Employee> retList = (ArrayList<Employee>) empC.getByDesignation("Receptionist");

		assertEquals(1, retList.size());

	}
	
	@Test
	public void testGetByEmpUsername()
	{
		Employee sampleEmp = new Employee();
		sampleEmp.setEmpId(1);
		sampleEmp.setEmpFirstName("Ankit");
		sampleEmp.setEmpLastName("Jha");
		sampleEmp.setEmpDesig(Designations.RECEPTIONIST);
		sampleEmp.setEmpAddr("Zolo Cosmos");
		sampleEmp.setEmpUsername("aj1998");
		sampleEmp.setEmpPhone("+91 9988764847");

		ArrayList<Employee> list = new ArrayList<Employee>();
		list.add(sampleEmp);
		Mockito.when(empServ.findByEmpUsername("aj1998")).thenReturn(list);
		
		ArrayList<Employee> retList = (ArrayList<Employee>) empC.getByUsername("aj1998");
		assertEquals(1, retList.size());

		
	}
	
}
