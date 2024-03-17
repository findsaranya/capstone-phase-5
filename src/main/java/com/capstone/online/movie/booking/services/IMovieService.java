package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.entity.Movie;

public interface IMovieService {
Movie createMovie(Movie movie);
Movie getMovieById(int id);
List<Movie> getAllMovies();
String deleteMovie(int id);
Page<Movie> getMovies(Pageable pageable);
Page<Movie> getMoviesByGenre(Genre genre, Pageable pageable);
Long deleteMovieByGenre(Genre genre);
List<Movie> getRecentMovies();
Page<Movie> movieSearch(Specification<Movie> search, Pageable pageable);

}
