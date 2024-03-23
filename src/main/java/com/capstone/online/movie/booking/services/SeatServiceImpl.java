package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import com.capstone.online.movie.booking.entity.Seats;
import com.capstone.online.movie.booking.repository.ISeatRepo;

@Service
public class SeatServiceImpl implements ISeatService  {
    
	@Autowired
	private ISeatRepo seatRepo;
	@Override
	public List<Seats> createBookedSeats(List<Seats> seatInfo) {
		// TODO Auto-generated method stub
		return seatRepo.saveAll(seatInfo);
	}

	@Override
	public Seats updateBookedSeats(Seats seatInfo) {
		// TODO Auto-generated method stub
		return seatRepo.save(seatInfo);
	}

	@Override
	public String deleteBookedSeats(int id) {
		// TODO Auto-generated method stub
		seatRepo.deleteById(id);
		return "Seat Id "+id+" deleted successfully";
	}


	@Override
	public List<Seats> getBookedSeats(Specification<Seats> seatSpec) {
		// TODO Auto-generated method stub
		return seatRepo.findAll(seatSpec);
	}

}
