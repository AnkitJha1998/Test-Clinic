package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.clinic.tests.Designations;


/*
 * This is an Entity for Employee
 */
@Entity
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "employee_seq")
	@SequenceGenerator(name = "employee_seq", sequenceName = "employee_seq", initialValue = 1, allocationSize = 1)
	private int empId;
	private String empUsername;
	private String empFirstName;
	private String empLastName;
	private String empAddr;
	
	@Enumerated(EnumType.STRING)
	private Designations empDesig;
	private String empPhone;

	/*
	 * Constructor for Employee Entity Class
	 */
	public Employee() {
		empId=-1;
		empUsername="";
		empFirstName="";
		empLastName="";
		empAddr="";
		empDesig=null;
		empPhone="";
	}
	
	/*
	 * Getter For EmpId
	 */
	public int getEmpId() {
		return empId;
	}

	/*
	 * Setter For EmpId
	 */
	public void setEmpId(int empId) {
		this.empId = empId;
	}

	/*
	 * Getter For EmpUsername
	 */
	public String getEmpUsername() {
		return empUsername;
	}

	/*
	 * Setter For EmpUsername
	 */
	public void setEmpUsername(String empUsername) {
		this.empUsername = empUsername;
	}

	/*
	 * Getter For EmpFirstName
	 */
	public String getEmpFirstName() {
		return empFirstName;
	}

	/*
	 * Setter For EmpFirstName
	 */
	public void setEmpFirstName(String empFirstName) {
		this.empFirstName = empFirstName;
	}

	/*
	 * Getter For EmpLastName
	 */
	public String getEmpLastName() {
		return empLastName;
	}

	/*
	 * Setter For EmpLastName
	 */
	public void setEmpLastName(String empLastName) {
		this.empLastName = empLastName;
	}

	/*
	 * Getter For EmpAddr
	 */
	public String getEmpAddr() {
		return empAddr;
	}

	/*
	 * Setter For EmpAddr
	 */
	public void setEmpAddr(String empAddr) {
		this.empAddr = empAddr;
	}

	/*
	 * Getter For EmpDesig
	 */
	public Designations getEmpDesig() {
		return empDesig;
	}

	/*
	 * Setter For EmpDesig
	 */
	public void setEmpDesig(Designations empDesig) {
		this.empDesig = empDesig;
	}

	/*
	 * Getter For EmpPhone
	 */
	public String getEmpPhone() {
		return empPhone;
	}

	/*
	 * Setter For EmpPhone
	 */
	public void setEmpPhone(String empPhone) {
		this.empPhone = empPhone;
	}

}
