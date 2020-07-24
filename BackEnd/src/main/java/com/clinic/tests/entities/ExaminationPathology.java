package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.clinic.tests.PathoTests;
import com.clinic.tests.TestStatus;


/*
 * This is Entity For ExaminationPathology
 */
@Entity
public class ExaminationPathology {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "exam_patho_seq")
	@SequenceGenerator(name = "exam_patho_seq", sequenceName = "exam_patho_seq", allocationSize = 1, initialValue = 1)
	private int examPathoId;
	@Enumerated(EnumType.STRING)
	private PathoTests examPathoName;
	private String examPathoDetails;
	private int patId;
	private int docId;
	private int empId;
	@Enumerated(EnumType.STRING)
	private TestStatus examStatus;
	private int examPathoRes;

	/*
	 * Constructor for Pathology Examination Entity Class
	 */
	public ExaminationPathology() {
		examPathoId = -1;
		examPathoName = null;
		examPathoDetails="";
		patId = -1;
		docId = -1;
		empId = -1;
		examPathoRes = -1;
	}

	/*
	 * Getter for examPathoId attribute
	 */
	public int getExamPathoId() {
		return examPathoId;
	}

	/*
	 * Setter for examPathoId attribute
	 */
	public void setExamPathoId(int examPathoId) {
		this.examPathoId = examPathoId;
	}

	/*
	 * Getter for examPathoName attribute
	 */
	public PathoTests getExamPathoName() {
		return examPathoName;
	}

	/*
	 * Setter for examPathoName attribute
	 */
	public void setExamPathoName(PathoTests examPathoName) {
		this.examPathoName = examPathoName;
	}

	/*
	 * Getter for patId attribute
	 */
	public int getPatId() {
		return patId;
	}

	/*
	 * Setter for patId attribute
	 */
	public void setPatId(int patId) {
		this.patId = patId;
	}

	/*
	 * Getter for docId attribute
	 */
	public int getDocId() {
		return docId;
	}

	/*
	 * Getter for docId attribute
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}

	/*
	 * Getter for empId attribute
	 */
	public int getEmpId() {
		return empId;
	}

	/*
	 * Setter for empId attribute
	 */
	public void setEmpId(int empId) {
		this.empId = empId;
	}

	/*
	 * Getter for examPathoRes attribute
	 */
	public int getExamPathoRes() {
		return examPathoRes;
	}

	/*
	 * Getter for examPathoRes attribute
	 */
	public void setExamPathoRes(int examPathoRes) {
		this.examPathoRes = examPathoRes;
	}

	/*
	 * Getter for examPathoDetails attribute
	 */
	public String getExamPathoDetails() {
		return examPathoDetails;
	}

	/*
	 * Setter for examPathoDetails attribute
	 */
	public void setExamPathoDetails(String examPathoDetails) {
		this.examPathoDetails = examPathoDetails;
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
