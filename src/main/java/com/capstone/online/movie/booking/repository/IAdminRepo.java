package com.capstone.online.movie.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Admin;


@Repository
public interface IAdminRepo extends JpaRepository<Admin, Integer> {
	 Long countByUsername(String username);
	 Admin findByUsernameAndPassword(String username,String password);
}
