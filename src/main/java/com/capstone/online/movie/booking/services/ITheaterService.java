package com.capstone.online.movie.booking.services;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.capstone.online.movie.booking.entity.Theater;

public interface ITheaterService {
Theater createTheater(Theater data);
Theater updateTheater(Theater data);
String deleteTheater(int id);
Theater getTheaterById(int id);
Page<Theater> getAllTheater(Pageable page);
List<Theater> getTheaters();
}
