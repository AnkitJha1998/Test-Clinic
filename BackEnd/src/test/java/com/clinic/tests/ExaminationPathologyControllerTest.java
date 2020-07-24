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

import com.clinic.tests.controllers.ExaminationPathologyController;
import com.clinic.tests.entities.ExaminationPathology;
import com.clinic.tests.service.ExaminationPathologyService;

class ExaminationPathologyControllerTest {

	@InjectMocks
	ExaminationPathologyController examCon;

	@Mock
	ExaminationPathologyService examServ;

	@BeforeEach
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetAllExamPatho() {
		ArrayList<ExaminationPathology> list = new ArrayList<ExaminationPathology>();
		ExaminationPathology tempObj = new ExaminationPathology();

		tempObj.setExamPathoId(1);
		tempObj.setExamPathoName(PathoTests.URINALYSIS);
		tempObj.setExamPathoDetails("Thorough Examination");
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setEmpId(1);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamPathoRes(-1);
		list.add(tempObj);

		tempObj.setExamPathoId(2);
		tempObj.setExamPathoName(PathoTests.FULL_BODY_EXAMINATION);
		tempObj.setExamPathoDetails("Thorough Examination");
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setEmpId(2);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamPathoRes(-1);
		list.add(tempObj);

		Mockito.when(examServ.findAll()).thenReturn(list);

		ArrayList<ExaminationPathology> pathoResList = (ArrayList<ExaminationPathology>) examCon.getallExamPatho();

		assertEquals(2, pathoResList.size());

	}

	@Test
	public void testPostExamPatho() {

		ExaminationPathology tempObj = new ExaminationPathology();
		tempObj.setExamPathoId(3);
		tempObj.setExamPathoName(PathoTests.URINALYSIS);
		tempObj.setExamPathoDetails("Thorough Examination");
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setEmpId(2);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamPathoRes(-1);

		examCon.postExamPatho(tempObj);

		Mockito.verify(examServ).save(tempObj);

	}
	
	@Test
	public void testUpdate()
	{
		ExaminationPathology tempObj = new ExaminationPathology();
		tempObj.setExamPathoId(3);
		tempObj.setExamPathoName(PathoTests.URINALYSIS);
		tempObj.setExamPathoDetails("Thorough Examination");
		tempObj.setPatId(2);
		tempObj.setDocId(1);
		tempObj.setEmpId(2);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamPathoRes(-1);
		examCon.updateExamination(tempObj);
		Mockito.verify(examServ).save(tempObj);
	}

	@Test
	public void testGetExamById() {
		ExaminationPathology tempObj = new ExaminationPathology();
		tempObj.setExamPathoId(1);
		tempObj.setExamPathoName(PathoTests.URINALYSIS);
		tempObj.setExamPathoDetails("Thorough Examination");
		tempObj.setPatId(1);
		tempObj.setDocId(1);
		tempObj.setEmpId(1);
		tempObj.setExamStatus(TestStatus.INITIATED);
		tempObj.setExamPathoRes(-1);

		Mockito.when(examServ.findById(1)).thenReturn(Optional.of(tempObj));

		ExaminationPathology patho = examCon.getByIdExam(1).get();

		assertEquals(1, patho.getExamPathoId());
		assertEquals(PathoTests.URINALYSIS, patho.getExamPathoName());
		assertEquals("Thorough Examination",patho.getExamPathoDetails());
		assertEquals(1, patho.getPatId());
		assertEquals(1, patho.getDocId());
		assertEquals(1, patho.getEmpId());
		assertEquals(TestStatus.INITIATED,patho.getExamStatus());
		assertEquals(-1,patho.getExamPathoRes());

	}

}
