package com.capstone.online.movie.booking.dto;

import com.capstone.online.movie.booking.entity.Genre;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class MovieGenreDto {
private Genre genre;
private int page;
private int size;
}
