package com.clinic.tests;


import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import com.clinic.tests.controllers.DocumentController;
import com.clinic.tests.entities.Document;
import com.clinic.tests.service.DocumentService;

@AutoConfigureMockMvc
class DocumentControllerTest {
	
	@InjectMocks
	DocumentController docC;
	
	@Mock
	DocumentService docServ;
	
	@BeforeEach
	public void setup()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	void testUpload() throws IOException {
		MockMultipartFile mmf=new MockMultipartFile("file.pdf", "file.pdf", "application/pdf","SpringFramework".getBytes());
		Document doc=new Document();
		doc.setDownId(3);
		doc.setDownName(mmf.getName());
		doc.setDownType(mmf.getContentType());
		doc.setFile(mmf.getBytes());
		int id=docC.uploadFile(mmf);
		assertEquals(-1,id);
	}
	
	@Test
	void testDownload() throws IOException
	{
		MockMultipartFile mmf=new MockMultipartFile("file.pdf", "file.pdf", "application/pdf","SpringFramework".getBytes());
		Document doc=new Document();
		doc.setDownId(3);
		doc.setDownName(mmf.getName());
		doc.setDownType(mmf.getContentType());
		doc.setFile(mmf.getBytes());
		
		Mockito.when(docServ.findById(3)).thenReturn(Optional.of(doc));
		
		ResponseEntity<ByteArrayResource> res=docC.getDownloadFile(3);
		
		assertEquals("200 OK",res.getStatusCode().toString());
		
	}
	
	@Test
	void testNoDownloadableFile() 
	{
		Mockito.when(docServ.findById(3)).thenReturn(Optional.empty());
		
		ResponseEntity<ByteArrayResource> res=docC.getDownloadFile(3);
		
		assertEquals("204 NO_CONTENT",res.getStatusCode().toString());
	}


}
