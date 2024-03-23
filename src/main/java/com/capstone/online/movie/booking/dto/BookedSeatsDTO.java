package com.capstone.online.movie.booking.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class BookedSeatsDTO {
private int theaterId;
private int movieId;
private String showTime;
private Date showDate;
}
