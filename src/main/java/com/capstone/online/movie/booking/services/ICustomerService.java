package com.capstone.online.movie.booking.services;

import com.capstone.online.movie.booking.entity.Customer;

public interface ICustomerService {
Customer createCustomer(Customer cust);
Customer getCustById(int custId);
Customer updateCustomer(Customer cust);
String deleteCustomer(int custId);
Customer authenticateUser(String email,String password);
Boolean checkEmailExists(String email);
}
