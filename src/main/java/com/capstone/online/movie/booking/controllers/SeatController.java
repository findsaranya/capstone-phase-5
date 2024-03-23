package com.capstone.online.movie.booking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.online.movie.booking.dto.BookedSeatsDTO;
import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Seats;
import com.capstone.online.movie.booking.services.FilterSpecification;
import com.capstone.online.movie.booking.services.ISeatService;

@Controller
@RequestMapping("/seat")
public class SeatController {
	@Autowired
	private ISeatService seatService;

	@PostMapping(value = "/create")
	public ResponseEntity<APIResponse> createSeats(@RequestBody List<Seats> seats) {
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");

		seatService.createBookedSeats(seats);
		response.setData("Created Successfully");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@PostMapping(value="/getBookedSeats")
	public ResponseEntity<APIResponse> getBookedSeats(@RequestBody BookedSeatsDTO seatsDTO) {
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");
		Specification<Seats> seatSpec = Specification.where(FilterSpecification.hasTheaterId(seatsDTO.getTheaterId()).and(FilterSpecification.hasMovieId(seatsDTO.getMovieId()).and(FilterSpecification.hasShowTime(seatsDTO.getShowTime()).and(FilterSpecification.hasShowDate(seatsDTO.getShowDate())))));
		response.setData(seatService.getBookedSeats(seatSpec));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
