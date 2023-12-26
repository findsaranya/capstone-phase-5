package com.capstone.online.movie.booking.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class APIErrorMessage {
	    private String message;
	    private String status;
	
}
