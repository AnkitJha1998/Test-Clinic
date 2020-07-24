package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;


/*
 * This is the Entity For Doctor here.
 */
@Entity
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "doctor_seq")
	@SequenceGenerator(name = "doctor_seq", sequenceName = "doctor_seq", initialValue = 1, allocationSize = 1)
	private int docId;
	private String docFirstName;
	private String docLastName;
	private String docPhone;
	private String hospName;
	private String docAddress;
	
	/*
	 * Constructor For Doctor Entity Class.
	 */
	public Doctor()
	{
		docId=-1;
		hospName="";
		docFirstName="";
		docLastName="";
		docPhone="";
		docAddress="";
	}
	
	/*
	 * Getter For DocId
	 */
	public int getDocId() {
		return docId;
	}

	/*
	 * Setter For DocId
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}
	
	/*
	 * Getter For DocFirstName
	 */
	public String getDocFirstName() {
		return docFirstName;
	}

	/*
	 * Setter For DocFirstName
	 */
	public void setDocFirstName(String docFirstName) {
		this.docFirstName = docFirstName;
	}

	/*
	 * Getter For DocLastName
	 */
	public String getDocLastName() {
		return docLastName;
	}

	/*
	 * Setter For DocLastName
	 */
	public void setDocLastName(String docLastName) {
		this.docLastName = docLastName;
	}

	/*
	 * Getter For DocPhone
	 */
	public String getDocPhone() {
		return docPhone;
	}

	/*
	 * Setter For DocPhone
	 */
	public void setDocPhone(String docPhone) {
		this.docPhone = docPhone;
	}

	/*
	 * Getter For Hospital Name
	 */
	public String getHospName() {
		return hospName;
	}

	/*
	 * Setter For Hospital Name
	 */
	public void setHospName(String hospName) {
		this.hospName = hospName;
	}

	/*
	 * Getter For DocAddress
	 */
	public String getDocAddress() {
		return docAddress;
	}

	/*
	 * Setter For DocAddress
	 */
	public void setDocAddress(String docAddress) {
		this.docAddress = docAddress;
	}

}
