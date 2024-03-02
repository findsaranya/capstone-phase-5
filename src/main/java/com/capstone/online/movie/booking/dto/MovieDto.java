package com.capstone.online.movie.booking.dto;

import java.util.List;

import com.capstone.online.movie.booking.entity.Genre;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class MovieDto {
private int id;
private String name;
private String language;
private String description;
private Genre genre;
private List<TheatreDto>  movieTheater;
}
