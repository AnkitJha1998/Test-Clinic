package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;


/*
 * This is the entity for Examination Here 
 */
@Entity
public class Examination {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "exam_seq")
	@SequenceGenerator(name = "exam_seq", sequenceName = "exam_seq", allocationSize = 1, initialValue = 1)
	private int examId;
	private int patId;
	private int docId;
	private String examName;
	private String examDetails;
	private int examRes;
	private int examRadioId;
	private int examPathoId;
	private int labTechId;

	/*
	 * Constructor For Examination Entity Class
	 */
	public Examination() {
		examId = -1;
		patId = -1;
		docId = -1;
		examName = "";
		examDetails = "";
		examRes = -1;
		examRadioId = -1;
		examPathoId = -1;
		labTechId = -1;
	}

	/*
	 * Getter for ExamId attribute
	 */
	public int getExamId() {
		return examId;
	}
	
	/*
	 * Setter for ExamId attribute
	 */
	public void setExamId(int examId) {
		this.examId = examId;
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
	 * Setter for docId attribute
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}

	/*
	 * Getter for examName attribute
	 */
	public String getExamName() {
		return examName;
	}

	/*
	 * Setter for examName attribute
	 */
	public void setExamName(String examName) {
		this.examName = examName;
	}

	/*
	 * Getter for examRes attribute
	 */
	public int getExamRes() {
		return examRes;
	}

	/*
	 * Setter for examRes attribute
	 */
	public void setExamRes(int examRes) {
		this.examRes = examRes;
	}

	/*
	 * Getter for examRadioId attribute
	 */
	public int getExamRadioId() {
		return examRadioId;
	}

	/*
	 * Setter for examRadioId attribute
	 */
	public void setExamRadioId(int examRadioId) {
		this.examRadioId = examRadioId;
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
	 * Getter for labTechId attribute
	 */
	public int getLabTechId() {
		return labTechId;
	}

	/*
	 * Setter for labTechId attribute
	 */
	public void setLabTechId(int labTechId) {
		this.labTechId = labTechId;
	}

	/*
	 * Getter for examDetails attribute
	 */
	public String getExamDetails() {
		return examDetails;
	}

	/*
	 * Setter for examDetails attribute
	 */
	public void setExamDetails(String examDetails) {
		this.examDetails = examDetails;
	}

}
