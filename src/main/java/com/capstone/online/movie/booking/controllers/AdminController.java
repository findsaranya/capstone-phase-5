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

import com.capstone.online.movie.booking.dto.AdminDTO;
import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Admin;
import com.capstone.online.movie.booking.entity.Login;
import com.capstone.online.movie.booking.services.IAdminService;

import jakarta.validation.Valid;
@Controller
@RequestMapping(value="/admin")
public class AdminController {
@Autowired
private IAdminService  adminService ;
@PostMapping(value="/login")
private ResponseEntity<APIResponse> loginUser(@Valid @RequestBody Login userDetails){
	APIResponse response = new APIResponse();
	AdminDTO admin = new AdminDTO();
	Admin loginResponse = adminService.authenticateAdmin(userDetails.getEmail().trim(), userDetails.getPassword().trim());
	admin.setId(loginResponse.getId());
	admin.setUsername(loginResponse.getUsername());
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(admin);
	return ResponseEntity.status(HttpStatus.OK).body(response);
}

@GetMapping(value="/getAdmin/{id}")
private ResponseEntity<APIResponse> getUserById(@PathVariable int id){
	APIResponse response = new APIResponse();
	AdminDTO admin = new AdminDTO();
	Admin adminInfo = adminService.getAdminById(id);
	admin.setId(adminInfo.getId());
	admin.setUsername(adminInfo.getUsername());
	response.setStatus(200);
	response.setMessage(HttpStatus.CREATED.toString());
	response.setData(admin);
	return ResponseEntity.status(HttpStatus.OK).body(response);
}
}
