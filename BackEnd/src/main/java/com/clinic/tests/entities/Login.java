package com.clinic.tests.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

/*
 * This is Class for Login Entity 
 */
@Entity
public class Login {
	
	@Id
	private String username;
	private String password;
	
	/*
	 * Constructor for Login Entity Class
	 */
	public Login() {
		username="";
		password="";
		
	}
	
	/*
	 * Getter for username attribute
	 */
	public String getUsername() {
		return username;
	}
	
	/*
	 * Setter for username attribute
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/*
	 * Getter for password attribute
	 */
	public String getPassword() {
		return password;
	}
	
	/*
	 * Setter for password attribute
	 */
	public void setPassword(String password) {
		this.password = password;
	}

}
