package com.capstone.online.movie.booking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Customer;
import com.capstone.online.movie.booking.services.ICustomerService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/customer")
public class CustomerController {
@Autowired
private ICustomerService custService;

@PostMapping(value="/create")
private ResponseEntity<APIResponse> createCustomer(@RequestBody @Valid Customer cust){
	APIResponse response = new APIResponse();
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(custService.createCustomer(cust));
	return ResponseEntity.status(HttpStatus.OK).body(response);
}
}
