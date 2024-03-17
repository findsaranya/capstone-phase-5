package com.capstone.online.movie.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class AdminDTO {
private int id;
private String username;
private String role = "ADMIN";
}
