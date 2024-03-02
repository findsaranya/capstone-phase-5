package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.entity.Theater;
import com.capstone.online.movie.booking.exception.TheatreNotFoundException;
import com.capstone.online.movie.booking.repository.ITheaterRepo;

@Service
public class TheatreServiceImpl implements ITheaterService {
    @Autowired
    private ITheaterRepo theatreRepo;
    
	@Override
	public Theater createTheater(Theater data) {
		return theatreRepo.save(data) ;
	}

	@Override
	public Theater updateTheater(Theater data) {
		return theatreRepo.save(data);
	}

	@Override
	public String deleteTheater(int id) {
		theatreRepo.deleteById(id);
		return "Theatre ID "+id+" deleted Successfully";
	}

	@Override
	public Theater getTheaterById(int id) {
		Theater response = theatreRepo.findById(id).orElse(null);
		if(response == null) throw new TheatreNotFoundException("Theatre ID " +id + " not found!!");
		return response;
	}

	@Override
	public Page<Theater> getAllTheater(Pageable page) {
		// TODO Auto-generated method stub
		return theatreRepo.findAll(page);
	}

	@Override
	public List<Theater> getTheaters() {
		return theatreRepo.findAll();
	}

}
