package com.capstone.online.movie.booking.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TicketPriceDto {
private int id;
private int totalSeats;
private String type;
private BigDecimal price;
}
