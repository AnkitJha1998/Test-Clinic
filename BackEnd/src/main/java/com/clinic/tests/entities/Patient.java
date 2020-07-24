package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

/*
 * This is Class for Patient Entity
 */
@Entity
public class Patient {

	@Id
	@GeneratedValue( strategy = GenerationType.AUTO, generator = "patient_seq")
	@SequenceGenerator(name = "patient_seq", sequenceName = "patient_seq", allocationSize = 1, initialValue = 1)
	private int patId;
	private String patFirstName;
	private String patLastName;
	private String patPhone;
	private String patAddr;
	private String patAllergies;
	private String patEmergencyName;
	private String patEmergencyPhone;
	private int patDocId;
	
	/*
	 * Constructor for Patient Entity Class
	 */
	public Patient() {
		patId=-1;
		patDocId=-1;
		patFirstName="";
		patLastName="";
		patPhone="";
		patAddr="";
		patAllergies="";
		patEmergencyName="";
		patEmergencyPhone="";
	}
	
	/*
	 * Getter for patDocId
	 */
	public int getPatDocId() {
		return patDocId;
	}
	
	/*
	 * Setter for patDocId
	 */
	public void setPatDoctId(int patDoctId) {
		this.patDocId = patDoctId;
	}
	
	/*
	 * Getter for patId
	 */
	public int getPatId() {
		return patId;
	}
	
	/*
	 * Setter for patId
	 */
	public void setPatId(int patId) {
		this.patId = patId;
	}
	
	/*
	 * Getter for patFirstName
	 */
	public String getPatFirstName() {
		return patFirstName;
	}
	
	/*
	 * Setter for patFirstName
	 */
	public void setPatFirstName(String patFirstName) {
		this.patFirstName = patFirstName;
	}
	
	/*
	 * Getter for patLastName
	 */
	public String getPatLastName() {
		return patLastName;
	}
	
	/*
	 * Setter for patLastName
	 */
	public void setPatLastName(String patLastName) {
		this.patLastName = patLastName;
	}
	
	/*
	 * Getter for patPhone
	 */
	public String getPatPhone() {
		return patPhone;
	}
	
	/*
	 * Setter for patPhone
	 */
	public void setPatPhone(String patPhone) {
		this.patPhone = patPhone;
	}
	
	/*
	 * Getter for patAddr
	 */
	public String getPatAddr() {
		return patAddr;
	}
	
	/*
	 * Setter for patAddr
	 */
	public void setPatAddr(String patAddr) {
		this.patAddr = patAddr;
	}
	
	/*
	 * Getter for patAllergies
	 */
	public String getPatAllergies() {
		return patAllergies;
	}
	
	/*
	 * Setter for patAllergies
	 */
	public void setPatAllergies(String patAllergies) {
		this.patAllergies = patAllergies;
	}
	
	/*
	 * Getter for patEmergencyName
	 */
	public String getPatEmergencyName() {
		return patEmergencyName;
	}
	
	/*
	 * Setter for patEmergencyName
	 */
	public void setPatEmergencyName(String patEmergencyName) {
		this.patEmergencyName = patEmergencyName;
	}
	
	/*
	 * Getter for patEmergencyPhone
	 */
	public String getPatEmergencyPhone() {
		return patEmergencyPhone;
	}
	
	/*
	 * Setter for patEmergencyPhone
	 */
	public void setPatEmergencyPhone(String patEmergencyPhone) {
		this.patEmergencyPhone = patEmergencyPhone;
	}
}
