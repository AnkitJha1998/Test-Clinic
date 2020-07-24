package com.clinic.tests;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.clinic.tests.controllers.PatientController;
import com.clinic.tests.entities.Patient;
import com.clinic.tests.service.PatientService;

class PatientControllerTest {

	@InjectMocks
	PatientController patCon;
	
	@Mock
	PatientService patServ;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetAllPatient() {
		ArrayList<Patient> patList=new ArrayList<Patient>(); 
		Patient tempObj=new Patient();
		tempObj.setPatId(1);
		tempObj.setPatDoctId(0);
		tempObj.setPatFirstName("Mohammed");
		tempObj.setPatLastName("Shahrukh");
		tempObj.setPatPhone("+91-7747477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Hafeez Ahmed");
		tempObj.setPatEmergencyPhone("+917748302846");
		
		patList.add(tempObj);
		
		tempObj.setPatId(2);
		tempObj.setPatDoctId(0);
		tempObj.setPatFirstName("Faizan");
		tempObj.setPatLastName("Immam");
		tempObj.setPatPhone("+91-7711477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Dawood Hussain");
		tempObj.setPatEmergencyPhone("+917711882462");
		
		patList.add(tempObj);
		
		Mockito.when(patServ.findAll()).thenReturn(patList);
		
		ArrayList<Patient> listRet=(ArrayList<Patient>)patCon.getAllPatients();
		
		assertEquals(2,listRet.size());
		
	}
	
	@Test
	public void testPostPat()
	{
		Patient tempObj=new Patient();
		tempObj.setPatFirstName("Faiyaaz");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Sheikh");
		tempObj.setPatPhone("+91-9937747310");
		tempObj.setPatAddr("Ahmedabad");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Dawood Ahmed");
		tempObj.setPatEmergencyPhone("+917722207146");
		
		patCon.postPatient(tempObj);
		
		Mockito.verify(patServ).save(tempObj);
		
	}
	
	@Test
	public void testGetPatById()
	{
		Patient tempObj=new Patient();
		tempObj.setPatId(1);
		tempObj.setPatFirstName("Mohammed");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Shahrukh");
		tempObj.setPatPhone("+91-7747477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Hafeez Ahmed");
		tempObj.setPatEmergencyPhone("+917748302846");
		
		Mockito.when(patServ.findById(1)).thenReturn(Optional.of(tempObj));
		
		Patient recvData=patCon.getPatientById(1).get();
		
		assertEquals(1,recvData.getPatId());
		assertEquals("Mohammed",recvData.getPatFirstName());
		assertEquals(0,recvData.getPatDocId());
		assertEquals("Shahrukh",recvData.getPatLastName());
		assertEquals("+91-7747477473",recvData.getPatPhone());
		assertEquals("North Delhi",recvData.getPatAddr());
		assertNull(recvData.getPatAllergies());
		assertEquals("Hafeez Ahmed",recvData.getPatEmergencyName());
		assertEquals("+917748302846",recvData.getPatEmergencyPhone());
		
		
	}
	
	@Test
	public void testGetPatFirstName()
	{
		Patient tempObj=new Patient();
		tempObj.setPatId(1);
		tempObj.setPatFirstName("Mohammed");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Shahrukh");
		tempObj.setPatPhone("+91-7747477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Hafeez Ahmed");
		tempObj.setPatEmergencyPhone("+917748302846");
		ArrayList<Patient> list=new ArrayList<Patient>();
		list.add(tempObj);
		Mockito.when(patServ.findByPatFirstName("Mohammed")).thenReturn(list);
		
		ArrayList<Patient> retList=(ArrayList<Patient>)patCon.getPatientDetailsByName("Mohammed", null);
		
		assertEquals(1,retList.size());
	}
	
	@Test
	public void testGetPatLastName()
	{
		Patient tempObj=new Patient();
		tempObj.setPatId(1);
		tempObj.setPatFirstName("Mohammed");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Shahrukh");
		tempObj.setPatPhone("+91-7747477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Hafeez Ahmed");
		tempObj.setPatEmergencyPhone("+917748302846");
		ArrayList<Patient> list=new ArrayList<Patient>();
		list.add(tempObj);
		Mockito.when(patServ.findByPatLastName("Shahrukh")).thenReturn(list);
		
		ArrayList<Patient> retList=(ArrayList<Patient>)patCon.getPatientDetailsByName(null, "Shahrukh");
		
		assertEquals(1,retList.size());
	}
	
	@Test
	public void testGetPatFirstAndLastName()
	{
		Patient tempObj=new Patient();
		tempObj.setPatId(1);
		tempObj.setPatFirstName("Mohammed");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Shahrukh");
		tempObj.setPatPhone("+91-7747477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Hafeez Ahmed");
		tempObj.setPatEmergencyPhone("+917748302846");
		ArrayList<Patient> list=new ArrayList<Patient>();
		list.add(tempObj);
		Mockito.when(patServ.findByPatFirstNameAndPatLastName("Mohammed","Shahrukh")).thenReturn(list);
		
		ArrayList<Patient> retList=(ArrayList<Patient>)patCon.getPatientDetailsByName("Mohammed", "Shahrukh");
		
		assertEquals(1,retList.size());
	}
	
	@Test
	public void testGetNoName()
	{
		ArrayList<Patient> patList=new ArrayList<Patient>(); 
		Patient tempObj=new Patient();
		tempObj.setPatId(1);
		tempObj.setPatFirstName("Mohammed");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Shahrukh");
		tempObj.setPatPhone("+91-7747477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Hafeez Ahmed");
		tempObj.setPatEmergencyPhone("+917748302846");
		
		patList.add(tempObj);
		
		tempObj.setPatId(2);
		tempObj.setPatFirstName("Faizan");
		tempObj.setPatDoctId(0);
		tempObj.setPatLastName("Immam");
		tempObj.setPatPhone("+91-7711477473");
		tempObj.setPatAddr("North Delhi");
		tempObj.setPatAllergies(null);
		tempObj.setPatEmergencyName("Dawood Hussain");
		tempObj.setPatEmergencyPhone("+917711882462");
		
		patList.add(tempObj);
		
		Mockito.when(patServ.findAll()).thenReturn(patList);
		
		ArrayList<Patient> listRet=(ArrayList<Patient>)patCon.getPatientDetailsByName(null, null);
		
		assertEquals(2,listRet.size());
	}
}
