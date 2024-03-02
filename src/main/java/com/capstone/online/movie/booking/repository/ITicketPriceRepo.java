package com.capstone.online.movie.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.TicketPrice;

@Repository
public interface ITicketPriceRepo extends JpaRepository<TicketPrice, Integer> {

}
