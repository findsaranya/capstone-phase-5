package com.capstone.online.movie.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Customer;

@Repository
public interface ICustomerRepo extends JpaRepository<Customer, Integer> {

}
