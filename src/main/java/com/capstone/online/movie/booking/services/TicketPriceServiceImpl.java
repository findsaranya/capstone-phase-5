package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.entity.TicketPrice;
import com.capstone.online.movie.booking.repository.ITicketPriceRepo;

@Service
public class TicketPriceServiceImpl implements ITicketPriceService{
    
	@Autowired
	private ITicketPriceRepo ticketRepo;
	
	@Override
	public TicketPrice createTicketPrice(TicketPrice data) {
		return ticketRepo.save(data);
	}

	@Override
	public TicketPrice updateTicketPrice(TicketPrice data) {
		return ticketRepo.save(data);
	}

	@Override
	public TicketPrice getTicketPriceById(int id) {
		return ticketRepo.findById(id).orElse(null);
	}

	@Override
	public String deleteTicketPrice(int id) {
		ticketRepo.deleteById(id);
		return "TicketPrice ID " +id+ " deleted Successfully!!";
	}

	@Override
	public List<TicketPrice> getAllTicketPrice() {
		return ticketRepo.findAll();
	}

	@Override
	public List<TicketPrice> createAll(List<TicketPrice> tickets) {
		return ticketRepo.saveAll(tickets);
	}

}
