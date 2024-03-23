package com.capstone.online.movie.booking.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Seats;
@Repository
public interface ISeatRepo extends JpaRepository<Seats, Integer>,JpaSpecificationExecutor<Seats>{
	
}
