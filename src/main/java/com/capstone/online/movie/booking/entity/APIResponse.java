package com.capstone.online.movie.booking.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class APIResponse {
private String message;
private int status;
private Object data;
}
