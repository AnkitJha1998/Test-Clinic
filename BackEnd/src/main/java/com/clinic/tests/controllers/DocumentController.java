package com.clinic.tests.controllers;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.clinic.tests.PatientMedicalRecordApplication;
import com.clinic.tests.entities.Document;
import com.clinic.tests.service.DocumentService;

/*
 * This Class consists of API's for the Maintaining of the database
 * Here, we do the basic operations on the download database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DocumentController {
	
	@Autowired
	private DocumentService downServ;
	
	/*
	 * This API Deals with uploading file on the server.
	 */
	@PostMapping("/documents")
	public int uploadFile(@RequestParam( value = "file")MultipartFile file) throws IOException
	{
		PatientMedicalRecordApplication.LOGGER.info("Document Upload service Called");
		Document obj=new Document();
		String fileName=StringUtils.cleanPath(file.getOriginalFilename());
		String type=file.getContentType();
		obj.setDownName(fileName);
		obj.setDownType(type);
		obj.setFile(file.getBytes());
		
		PatientMedicalRecordApplication.LOGGER.info("Actual::"+obj.getDownName()+":"+obj.getDownType());
		Document obj1=downServ.save(obj);
		if(obj1==null)
			obj1=new Document();
		PatientMedicalRecordApplication.LOGGER.info("Document Uploaded");
		return obj1.getDownId();
	}

	/*
	 * This API Deals with download of a particular file Download
	 */
	@GetMapping("/documents/{id}")
	public ResponseEntity<ByteArrayResource> getDownloadFile(@PathVariable int id)
	{
		PatientMedicalRecordApplication.LOGGER.info("Document Retrieval Service Called");
		Document obj=new Document();
		Optional<Document> obj1=downServ.findById(id);
		if(obj1.isPresent())
		{
			obj=obj1.get();	
			PatientMedicalRecordApplication.LOGGER.info("Document Retrieval Successful");
			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType(obj.getDownType()))
					.header(HttpHeaders.CONTENT_DISPOSITION,"inline; filename=\""
							+obj.getDownName()+"\"")
					.body(new ByteArrayResource(obj.getFile()));
		}
		byte[] noFile="".getBytes(); 
		PatientMedicalRecordApplication.LOGGER.warn("No Document To Retrieve");
		return ((BodyBuilder) ResponseEntity.noContent())
				.body(new ByteArrayResource(noFile));
		
	}
}
