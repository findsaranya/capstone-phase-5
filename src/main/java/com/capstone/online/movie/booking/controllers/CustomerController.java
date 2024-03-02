package com.capstone.online.movie.booking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.online.movie.booking.dto.CustomerDTO;
import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Customer;
import com.capstone.online.movie.booking.entity.Login;
import com.capstone.online.movie.booking.entity.UserEmail;
import com.capstone.online.movie.booking.exception.EmailAlreadyExistsException;
import com.capstone.online.movie.booking.services.ICustomerService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/customer")
public class CustomerController {
@Autowired
private ICustomerService custService;

@PostMapping(value="/create")
private ResponseEntity<APIResponse> createCustomer(@RequestBody @Valid Customer cust){

	boolean checkEmailExists = custService.checkEmailExists(cust.getEmail());
	APIResponse response = new APIResponse();
	
	if(checkEmailExists == true) {
		throw new EmailAlreadyExistsException("User with same email exists");	
	}
	CustomerDTO custDTO = new CustomerDTO();
	Customer custResponse = custService.createCustomer(cust);
	
	custDTO.setEmail(custResponse.getEmail());
	custDTO.setId(custResponse.getId());
	custDTO.setLocation(custResponse.getLocation());
	custDTO.setName(custResponse.getName());
	custDTO.setPhoneNo(custResponse.getPhoneNo());
	custDTO.setRole(custResponse.getRole());
	
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(custDTO);
	
	return ResponseEntity.status(HttpStatus.OK).body(response);
	
}

@PostMapping(value="/checkEmailExists")
private ResponseEntity<APIResponse> checkEmailExists(@Valid @RequestBody UserEmail email){
	APIResponse response = new APIResponse();
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(custService.checkEmailExists(email.getEmail()));
	return ResponseEntity.status(HttpStatus.OK).body(response);
}

@PostMapping(value="/login")
private ResponseEntity<APIResponse> loginUser(@Valid @RequestBody Login userDetails){
	APIResponse response = new APIResponse();
	CustomerDTO cust = new CustomerDTO();
	Customer loginResponse = custService.authenticateUser(userDetails.getEmail().trim(), userDetails.getPassword().trim());
	cust.setEmail(loginResponse.getEmail());
	cust.setId(loginResponse.getId());
	cust.setLocation(loginResponse.getLocation());
	cust.setName(loginResponse.getName());
	cust.setPhoneNo(loginResponse.getPhoneNo());
	cust.setRole(loginResponse.getRole());
	
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(cust);
	return ResponseEntity.status(HttpStatus.OK).body(response);
}

@GetMapping(value="/getUser/{id}")
private ResponseEntity<APIResponse> getUserById(@PathVariable int id){
	APIResponse response = new APIResponse();
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(custService.getCustById(id));
	return ResponseEntity.status(HttpStatus.OK).body(response);
}
}
