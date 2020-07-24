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

import com.clinic.tests.controllers.DoctorController;
import com.clinic.tests.entities.Doctor;
import com.clinic.tests.service.DoctorService;

class DoctorControllerTest {
	@InjectMocks
	DoctorController docCon;

	@Mock
	DoctorService docServ;

	@BeforeEach
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetAllData() {
		ArrayList<Doctor> list = new ArrayList<Doctor>();
		Doctor doc = new Doctor();
		doc.setDocId(1);
		doc.setDocFirstName("Manish");
		doc.setDocLastName("Mittal");
		doc.setDocAddress("Nagwara Bus Stand, Nagwara,Bangalore,India");
		doc.setDocPhone("+918876933645");
		doc.setHospName("Bhakti Vedant Hospital");
		list.add(doc);
		doc.setDocId(2);
		doc.setDocFirstName("Melvin");
		doc.setDocLastName("Mars");
		doc.setDocAddress("JFK Airport Road, New York,USA");
		doc.setDocPhone("+1-773-839-6644");
		doc.setHospName("Chitra Hospital");
		list.add(doc);

		Mockito.when(docServ.findAll()).thenReturn(list);

		Iterable<Doctor> received = docCon.getAllDoctors();
		ArrayList<Doctor> listOfDoctors = (ArrayList<Doctor>) received;
		assertEquals(2, listOfDoctors.size());

	}

	@Test
	public void testUploadDocData() {
		Doctor pushDoc = new Doctor();
		pushDoc.setDocId(3);
		pushDoc.setDocFirstName("Yusuf");
		pushDoc.setDocLastName("Khan");
		pushDoc.setDocAddress("Nagwara Bus Stand, Nagwara,Bangalore,India");
		pushDoc.setDocPhone("+918876933645");
		pushDoc.setHospName("Appolo Hospitals");

		docCon.postDoctorData(pushDoc);

		Mockito.verify(docServ).save(pushDoc);

	}

	@Test
	public void testGetDoctorById() {
		Doctor doc = new Doctor();
		doc.setDocId(2);
		doc.setDocFirstName("Melvin");
		doc.setDocLastName("Mars");
		doc.setDocAddress("JFK Airport Road, New York,USA");
		doc.setDocPhone("+1-773-839-6644");
		doc.setHospName("Chitra Hospital");
		Optional<Doctor> toBeReturned = Optional.of(doc);

		Mockito.when(docServ.findById(2)).thenReturn(toBeReturned);

		Doctor recv = docCon.getDoctorById(2).get();
		assertEquals(2, recv.getDocId());
		assertEquals("Melvin", recv.getDocFirstName());
		assertEquals("Mars", recv.getDocLastName());
		assertEquals("JFK Airport Road, New York,USA", recv.getDocAddress());
		assertEquals("+1-773-839-6644", recv.getDocPhone());
		assertEquals("Chitra Hospital", recv.getHospName());

	}

	@Test
	public void testCheckURL() {
		assertEquals("<h3>This is an api for storing Medical Records.</h3>", docCon.greeting());
	}

	@Test
	public void testFirstNameSearch() {
		Doctor doc = new Doctor();
		doc.setDocId(2);
		doc.setDocFirstName("Melvin");
		doc.setDocLastName("Mars");
		doc.setDocAddress("JFK Airport Road, New York,USA");
		doc.setDocPhone("+1-773-839-6644");
		doc.setHospName("Chitra Hospital");

		ArrayList<Doctor> list = new ArrayList<Doctor>();
		list.add(doc);
		Mockito.when(docServ.findByDocFirstName("Melvin")).thenReturn(list);

		ArrayList<Doctor> retList = (ArrayList<Doctor>) docCon.docNames("Melvin", null);

		assertEquals(1, retList.size());
	}

	@Test
	public void testLastNameSearch() {
		Doctor doc = new Doctor();
		doc.setDocId(2);
		doc.setDocFirstName("Melvin");
		doc.setDocLastName("Mars");
		doc.setDocAddress("JFK Airport Road, New York,USA");
		doc.setDocPhone("+1-773-839-6644");
		doc.setHospName("Chitra Hospital");

		ArrayList<Doctor> list = new ArrayList<Doctor>();
		list.add(doc);
		Mockito.when(docServ.findByDocLastName("Mars")).thenReturn(list);

		ArrayList<Doctor> retList = (ArrayList<Doctor>) docCon.docNames(null, "Mars");

		assertEquals(1, retList.size());
	}

	@Test
	public void testFirstAndLastNameSearch() {
		Doctor doc = new Doctor();
		doc.setDocId(2);
		doc.setDocFirstName("Melvin");
		doc.setDocLastName("Mars");
		doc.setDocAddress("JFK Airport Road, New York,USA");
		doc.setDocPhone("+1-773-839-6644");
		doc.setHospName("Chitra Hospital");

		ArrayList<Doctor> list = new ArrayList<Doctor>();
		list.add(doc);
		Mockito.when(docServ.findByDocFirstNameAndDocLastName("Melvin", "Mars")).thenReturn(list);

		ArrayList<Doctor> retList = (ArrayList<Doctor>) docCon.docNames("Melvin", "Mars");

		assertEquals(1, retList.size());

	}

	@Test
	public void testNoName() {
		ArrayList<Doctor> list = new ArrayList<Doctor>();
		Doctor doc = new Doctor();
		doc.setDocId(1);
		doc.setDocFirstName("Manish");
		doc.setDocLastName("Mittal");
		doc.setDocAddress("Nagwara Bus Stand, Nagwara,Bangalore,India");
		doc.setDocPhone("+918876933645");
		doc.setHospName("Bhaktivedant Hospital");
		list.add(doc);
		doc.setDocId(2);
		doc.setDocFirstName("Melvin");
		doc.setDocLastName("Mars");
		doc.setDocAddress("JFK Airport Road, New York,USA");
		doc.setDocPhone("+1-773-839-6644");
		doc.setHospName("Chitra Hospital");
		list.add(doc);

		Mockito.when(docServ.findAll()).thenReturn(list);

		ArrayList<Doctor> retList = (ArrayList<Doctor>) docCon.docNames(null, null);

		assertEquals(2, retList.size());

	}

}
