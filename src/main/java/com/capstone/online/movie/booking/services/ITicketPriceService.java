package com.capstone.online.movie.booking.services;

import java.util.List;

import com.capstone.online.movie.booking.entity.TicketPrice;

public interface ITicketPriceService {
TicketPrice createTicketPrice(TicketPrice data );
TicketPrice updateTicketPrice(TicketPrice data );
TicketPrice getTicketPriceById(int id );
String deleteTicketPrice(int id );
List<TicketPrice> getAllTicketPrice();
List<TicketPrice> createAll(List<TicketPrice> tickets);

}
