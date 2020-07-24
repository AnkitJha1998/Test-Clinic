package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;

/*
 * This is the Entity For Document Here.
 */
@Entity
public class Document {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "down_gen")
	@SequenceGenerator(name = "down_gen", sequenceName = "down_gen",initialValue = 1, allocationSize = 1)
	private int downId;
	
	private String downName;
	private String downType;
	
	@Lob
	private byte[] file;
	
	/*
	 * This is the COnstructor For Downloads Entity Class.
	 */
	public Document() {
		downId=-1;
		downName="";
		downType="";
		
	}
	
	/*
	 * Getter For DownId
	 */
	public int getDownId() {
		return downId;
	}

	/*
	 * Setter For DownId
	 */
	public void setDownId(int downId) {
		this.downId = downId;
	}

	/*
	 * Getter For DownName
	 */
	public String getDownName() {
		return downName;
	}

	/*
	 * Setter For DownName
	 */
	public void setDownName(String downName) {
		this.downName = downName;
	}

	/*
	 * Getter For DownType
	 */
	public String getDownType() {
		return downType;
	}

	/*
	 * Setter For DownType
	 */
	public void setDownType(String downType) {
		this.downType = downType;
	}

	/*
	 * Getter For DownFile
	 */
	public byte[] getFile() {
		return file;
	}

	/*
	 * Setter For DownFile
	 */
	public void setFile(byte[] file) {
		this.file = file;
	}
}
