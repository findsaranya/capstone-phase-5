package com.capstone.online.movie.booking.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TheatreDto {
 private int id;
 private String name;
 private String city;
 private String loc;
 private String phoneNo;
 private String address;
 private List<TicketPriceDto> ticketPrice;
 private List<ShowTimingDto> showTimings;
}
