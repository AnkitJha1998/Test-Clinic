package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.clinic.tests.RadioTests;
import com.clinic.tests.TestStatus;

/*
 * This is an Entity Class for Radiology Examination
 */
@Entity
public class ExaminationRadiology {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "exam_radio_seq")
	@SequenceGenerator(name = "exam_radio_seq", sequenceName = "exam_radio_seq", allocationSize = 1, initialValue = 1)
	private int examRadioId;
	
	@Enumerated(EnumType.STRING)
	private RadioTests examRadioName;
	private String examRadioDetails;
	private int patId;
	private int docId;
	private int empId;
	@Enumerated(EnumType.STRING)
	private TestStatus examStatus;
	private int examRadioRes;

	/*
	 * Constructor for Radiology Examination Entity Class
	 */
	public ExaminationRadiology() {
		examRadioId = -1;
		examRadioName = null;
		examRadioDetails="";
		patId = -1;
		docId = -1;
		empId = -1;
		examRadioRes = -1;
	}

	/*
	 * Getter for examRadioId
	 */
	public int getExamRadioId() {
		return examRadioId;
	}

	/*
	 * Setter for examRadioId
	 */
	public void setExamRadioId(int examRadioId) {
		this.examRadioId = examRadioId;
	}

	/*
	 * Getter for examRadioName
	 */
	public RadioTests getExamRadioName() {
		return examRadioName;
	}

	/*
	 * Setter for examRadioName
	 */
	public void setExamRadioName(RadioTests examRadioName) {
		this.examRadioName = examRadioName;
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
	 * Getter for docId
	 */
	public int getDocId() {
		return docId;
	}

	/*
	 * Setter for docId
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}

	/*
	 * Getter for empId
	 */
	public int getEmpId() {
		return empId;
	}

	/*
	 * Setter for empId
	 */
	public void setEmpId(int empId) {
		this.empId = empId;
	}

	/*
	 * Getter for examRadioRes
	 */
	public int getExamRadioRes() {
		return examRadioRes;
	}

	/*
	 * Setter for examRadioRes
	 */
	public void setExamRadioRes(int examRadioRes) {
		this.examRadioRes = examRadioRes;
	}

	/*
	 * Getter for examRadioDetails
	 */
	public String getExamRadioDetails() {
		return examRadioDetails;
	}

	/*
	 * Setter for examRadioDetails
	 */
	public void setExamRadioDetails(String examRadioDetails) {
		this.examRadioDetails = examRadioDetails;
	}
	
	/*
	 * Getter for examStatus attribute
	 */
	public TestStatus getExamStatus() {
		return examStatus;
	}
	
	/*
	 * Setter for examStatus attribute
	 */
	public void setExamStatus(TestStatus examStatus) {
		this.examStatus = examStatus;
	}
}
