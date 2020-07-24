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

import com.clinic.tests.controllers.ExaminationController;
import com.clinic.tests.entities.Examination;
import com.clinic.tests.service.ExaminationService;

class ExaminationControllerTest {

	@InjectMocks
	ExaminationController examCon;

	@Mock
	ExaminationService examServ;

	@BeforeEach
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetAllExaminations() {

		ArrayList<Examination> list = new ArrayList<Examination>();
		Examination tempObj = new Examination();
		tempObj.setExamId(1);
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setExamName("MRI of Brain");
		tempObj.setExamDetails("MRI is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(1);

		list.add(tempObj);

		tempObj.setExamId(2);
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setExamName("CT Scan of Brain");
		tempObj.setExamDetails("CT Scan is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(2);

		list.add(tempObj);

		Mockito.when(examServ.findAll()).thenReturn(list);

		ArrayList<Examination> retList = (ArrayList<Examination>) examCon.getAllExaminations();

		assertEquals(2, retList.size());

	}
	@Test
	public void testUpdateExamination()
	{
		Examination tempObj = new Examination();
		tempObj.setExamId(1);
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setExamName("MRI of Brain");
		tempObj.setExamDetails("MRI is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(1);
		
		examCon.updateExamEntry(tempObj);
		Mockito.verify(examServ).save(tempObj);
	}

	@Test
	public void testPostExamination() {
		Examination tempObj = new Examination();
		tempObj.setExamId(3);
		tempObj.setPatId(3);
		tempObj.setDocId(1);
		tempObj.setExamName("MRI of Brain");
		tempObj.setExamDetails("MRI is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(1);

		examCon.postExamination(tempObj);

		Mockito.verify(examServ).save(tempObj);

	}

	@Test
	public void testGetExamById() {
		Examination tempObj = new Examination();
		tempObj.setExamId(2);
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setExamName("CT Scan of Brain");
		tempObj.setExamDetails("CT Scan is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(2);

		Mockito.when(examServ.findById(2)).thenReturn(Optional.of(tempObj));

		Examination retObj = examCon.getExamById(2).get();

		assertEquals(2, retObj.getExamId());
		assertEquals(2, retObj.getPatId());
		assertEquals(1, retObj.getDocId());
		assertEquals("CT Scan of Brain", retObj.getExamName());
		assertEquals("CT Scan is to be done thoroughly",retObj.getExamDetails());
		assertEquals(0,retObj.getExamRes());
		assertEquals(0, retObj.getExamPathoId());
		assertEquals(0, retObj.getExamRadioId());
		assertEquals(2, retObj.getLabTechId());

	}

	@Test
	public void testGetExamByPat() {
		Examination tempObj = new Examination();
		ArrayList<Examination> list = new ArrayList<Examination>();
		tempObj.setExamId(2);
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setExamName("CT Scan of Brain");
		tempObj.setExamDetails("CT Scan is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(2);
		list.add(tempObj);

		Mockito.when(examServ.findByPatId(2)).thenReturn(list);

		ArrayList<Examination> retObj = (ArrayList<Examination>) examCon.getPatientTestRecord(2);

		assertEquals(1, retObj.size());

	}

	@Test
	public void testGetExamByLabTech() {
		Examination tempObj = new Examination();
		ArrayList<Examination> list = new ArrayList<Examination>();
		tempObj.setExamId(2);
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setExamName("CT Scan of Brain");
		tempObj.setExamDetails("CT Scan is to be done thoroughly");
		tempObj.setExamRes(0);
		tempObj.setExamPathoId(0);
		tempObj.setExamRadioId(0);
		tempObj.setLabTechId(2);
		list.add(tempObj);

		Mockito.when(examServ.findByLabTechId(2)).thenReturn(list);

		ArrayList<Examination> retObj = (ArrayList<Examination>) examCon.getTechnicianTestDet(2);

		assertEquals(1, retObj.size());
	}

}
