package com.capstone.online.movie.booking.services;

import com.capstone.online.movie.booking.entity.Admin;
import com.capstone.online.movie.booking.exception.CustomerNotFoundException;

public interface IAdminService {
	Admin createAdmin(Admin admin);
	Admin getAdminById(int adminId) throws CustomerNotFoundException;
    Admin updateAdmin(Admin admin);
	String deleteAdmin(int adminId);
	Admin authenticateAdmin(String username,String password)throws CustomerNotFoundException;
	Boolean checkUsernameExists(String username);
}
