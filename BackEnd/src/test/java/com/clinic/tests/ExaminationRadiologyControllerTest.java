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

import com.clinic.tests.controllers.ExaminationRadiologyController;
import com.clinic.tests.entities.ExaminationRadiology;
import com.clinic.tests.service.ExaminationRadiologyService;

class ExaminationRadiologyControllerTest {

	@InjectMocks
	ExaminationRadiologyController examCon;
	
	@Mock
	ExaminationRadiologyService examServ;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetAllExamRadio() {
		
		ArrayList<ExaminationRadiology> list=new ArrayList<ExaminationRadiology>();
		ExaminationRadiology tempObj=new ExaminationRadiology();
		
		tempObj.setExamRadioId(1);
		tempObj.setExamRadioName(RadioTests.CT_SCAN);
		tempObj.setExamRadioDetails("Do it Thoroughly");
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setEmpId(1);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamRadioRes(-1);
		list.add(tempObj);
		
		tempObj.setExamRadioId(2);
		tempObj.setExamRadioName(RadioTests.MRI);
		tempObj.setExamRadioDetails("Do it Thoroughly");
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setEmpId(2);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamRadioRes(-1);
		list.add(tempObj);
		
		Mockito.when(examServ.findAll()).thenReturn(list);
		
		ArrayList<ExaminationRadiology> retList=(ArrayList<ExaminationRadiology>)examCon.getAllExamRadios();
		
		assertEquals(2,retList.size());
	}
	
	@Test
	public void testUpdate()
	{
		ExaminationRadiology tempObj=new ExaminationRadiology();
		tempObj.setExamRadioId(1);
		tempObj.setExamRadioName(RadioTests.CT_SCAN);
		tempObj.setExamRadioDetails("Do it Thoroughly");
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setEmpId(1);
		tempObj.setExamRadioRes(-1);
		tempObj.setExamStatus(TestStatus.INITIATED);
		
		examCon.updateExamination(tempObj);
		Mockito.verify(examServ).save(tempObj);
	}
	
	@Test
	public void testPostExamRadio()
	{
		ExaminationRadiology tempObj=new ExaminationRadiology();
		tempObj.setExamRadioId(3);
		tempObj.setExamRadioName(RadioTests.X_RAY);
		tempObj.setExamRadioDetails("Do it Thoroughly Chest");
		tempObj.setPatId(2);
		tempObj.setDocId(3);
		tempObj.setEmpId(2);
		tempObj.setExamRadioRes(-1);
		tempObj.setExamStatus(TestStatus.INITIATED);
		
		examCon.postExamRadio(tempObj);
		
		Mockito.verify(examServ).save(tempObj);
		
	}
	
	@Test
	public void testgetExamRadioById()
	{
		ExaminationRadiology tempObj=new ExaminationRadiology();	
		tempObj.setExamRadioId(1);
		tempObj.setExamRadioName(RadioTests.CT_SCAN);
		tempObj.setExamRadioDetails("Do it Thoroughly");
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setEmpId(1);
		tempObj.setExamRadioRes(-1);
		tempObj.setExamStatus(TestStatus.INITIATED);
		
		Mockito.when(examServ.findById(1)).thenReturn(Optional.of(tempObj));
		
		ExaminationRadiology recv=examCon.getByIdExamRadio(1).get();
		
		assertEquals(1,recv.getExamRadioId());
		assertEquals(RadioTests.CT_SCAN,recv.getExamRadioName());
		assertEquals("Do it Thoroughly",recv.getExamRadioDetails());
		assertEquals(1,recv.getPatId());
		assertEquals(1,recv.getDocId());
		assertEquals(1,recv.getEmpId());
		assertEquals(-1,recv.getExamRadioRes());
		assertEquals(TestStatus.INITIATED,recv.getExamStatus());
		
	}

}
