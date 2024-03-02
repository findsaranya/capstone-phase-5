package com.capstone.online.movie.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class CustomerDTO {
private int id;
private String role;
private String name;
private String location;
private String email;
private String phoneNo;
}
