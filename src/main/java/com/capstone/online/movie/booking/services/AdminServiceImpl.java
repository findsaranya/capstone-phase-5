package com.capstone.online.movie.booking.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.online.movie.booking.entity.Admin;
import com.capstone.online.movie.booking.exception.CustomerNotFoundException;
import com.capstone.online.movie.booking.repository.IAdminRepo;

public class AdminServiceImpl implements IAdminService {

	@Autowired
	private IAdminRepo adminRepo;
	@Override
	public Admin createAdmin(Admin admin) {
		return adminRepo.save(admin);
	}

	@Override
	public Admin getAdminById(int adminId) throws CustomerNotFoundException {
		Admin admin = adminRepo.findById(adminId).orElse(null);
		if(admin == null) {
			throw new CustomerNotFoundException("Admin Id " +adminId + " not found!!");
		}
		return admin;
	}

	@Override
	public Admin updateAdmin(Admin admin) {
		return adminRepo.save(admin);
	}

	@Override
	public String deleteAdmin(int adminId) {
		Admin admin = adminRepo.findById(adminId).orElse(null);
		if(admin == null) {
			throw new CustomerNotFoundException("Admin Id " +adminId + " not found!!");
		}
		adminRepo.deleteById(adminId);
		return "Admin Id " + adminId + " deleted successfully"; 
	}

	@Override
	public Admin authenticateAdmin(String username, String password) throws CustomerNotFoundException {
		Admin admin = adminRepo.findByUsernameAndPassword(username, password);
		if(admin == null) {
			throw new CustomerNotFoundException("Invalid Login Credentials!!");
		}
		return admin;
	}

	@Override
	public Boolean checkUsernameExists(String username) {
		Long result = adminRepo.countByUsername(username);
		return result == 0 ? false : true;
	}

}
