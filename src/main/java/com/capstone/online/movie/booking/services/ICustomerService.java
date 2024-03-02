package com.capstone.online.movie.booking.services;

import com.capstone.online.movie.booking.entity.Customer;
import com.capstone.online.movie.booking.exception.CustomerNotFoundException;

public interface ICustomerService {
Customer createCustomer(Customer cust);
Customer getCustById(int custId) throws CustomerNotFoundException;
Customer updateCustomer(Customer cust);
String deleteCustomer(int custId);
Customer authenticateUser(String email,String password)throws CustomerNotFoundException;
Boolean checkEmailExists(String email);
}
