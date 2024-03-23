package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.capstone.online.movie.booking.entity.Seats;

public interface ISeatService {
List<Seats> createBookedSeats(List<Seats> seatIfo);
Seats updateBookedSeats(Seats seatInfo);
String deleteBookedSeats(int id);
List<Seats> getBookedSeats(Specification<Seats> seatSpec);
}
