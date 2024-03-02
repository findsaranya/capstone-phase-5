package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.entity.ShowTimings;
import com.capstone.online.movie.booking.repository.IShowTimingsRepo;

@Service
public class ShowTimingServiceImpl implements IShowTimingService{

	@Autowired
	IShowTimingsRepo showTimeRepo;
	
	@Override
	public ShowTimings createShowTime(ShowTimings data) {
		return showTimeRepo.save(data);
	}

	@Override
	public ShowTimings updateShowTime(ShowTimings data) {
		return showTimeRepo.save(data);
	}

	@Override
	public ShowTimings getShowTimeById(int id) {
		return showTimeRepo.findById(id).orElse(null);
	}

	@Override
	public List<ShowTimings> getAllShowTime() {
		return showTimeRepo.findAll();
	}

	@Override
	public String deleteShowTime(int id) {
	 showTimeRepo.deleteById(id);
	 return "Show time ID "+id+" deleted Successfully";
	}

	@Override
	public List<ShowTimings> createAll(List<ShowTimings> showTimeList) {
		return showTimeRepo.saveAll(showTimeList);
	}

}
