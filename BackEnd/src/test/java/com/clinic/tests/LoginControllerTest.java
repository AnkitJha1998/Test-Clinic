package com.clinic.tests;

import static org.junit.jupiter.api.Assertions.*;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import com.clinic.tests.controllers.LoginController;
import com.clinic.tests.entities.Login;
import com.clinic.tests.service.LoginService;

class LoginControllerTest {
	
	@InjectMocks
	LoginController logC;
	
	@Mock
	LoginService logS;
	
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testValidation()
	{
		Login tempLog=new Login();
		tempLog.setUsername("aj1998");
		tempLog.setPassword("ankitjha");
		Mockito.when(logS.findById("aj1998")).thenReturn(Optional.of(tempLog));
		String message=logC.validate(tempLog);
		assertEquals("Authentication Successful",message);
		
	}
	
	@Test
	public void testValidationWrong()
	{
		Login tempLog=new Login();
		tempLog.setUsername("aj1998");
		tempLog.setPassword("ankitjha");
		Mockito.when(logS.findById("aj1998")).thenReturn(Optional.of(tempLog));
		Login tempLog1=new Login();
		tempLog1.setUsername("aj1998");
		tempLog1.setPassword("ankit");
		String message=logC.validate(tempLog1);
		assertEquals("Authentication Failed",message);
		
	}
	
	
}
