package com.capstone.online.movie.booking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.entity.Customer;
import com.capstone.online.movie.booking.exception.CustomerNotFoundException;
import com.capstone.online.movie.booking.repository.ICustomerRepo;

@Service
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    private ICustomerRepo custRepo;
    
	
	@Override
	public Customer createCustomer(Customer cust) {
		return custRepo.save(cust);
	}

	@Override
	public Customer getCustById(int custId) {
		Customer cust = custRepo.findById(custId).orElse(null);
		if(cust == null) {
			throw new CustomerNotFoundException("Cust Id " +custId + " not found!!");
		}
		return cust;
	}

	@Override
	public Customer updateCustomer(Customer cust) {
		return custRepo.save(cust);
	}

	@Override
	public String deleteCustomer(int custId) {
		Customer cust = custRepo.findById(custId).orElse(null);
		if(cust == null) {
			throw new CustomerNotFoundException("Cust Id " +custId + " not found!!");
		}
		custRepo.deleteById(custId);
		return "Customer Id " + custId + " deleted successfully";
	}

	@Override
	public Customer authenticateUser(String email, String password) {
		return null;
	}

	@Override
	public Boolean checkEmailExists(String email) {
		return null;
	}

}
