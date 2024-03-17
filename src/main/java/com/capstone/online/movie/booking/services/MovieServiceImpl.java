package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.entity.Movie;
import com.capstone.online.movie.booking.repository.IMovieRepo;

@Service
public class MovieServiceImpl implements IMovieService {
    @Autowired
    private IMovieRepo movieRepo;
	
	@Override
	public Movie createMovie(Movie movie) {
		return movieRepo.save(movie);
	}

	@Override
	public Movie getMovieById(int id) {
		return movieRepo.findById(id).orElse(null);
	}

	@Override
	public List<Movie> getAllMovies() {
		return movieRepo.findAll();
	}

	@Override
	public String deleteMovie(int id) {
		movieRepo.deleteById(id);
		return "Movie ID "+id+" deleted Successfully!!";
	}

	@Override
	public Page<Movie> getMoviesByGenre(Genre genre, Pageable pageable) {
		// TODO Auto-generated method stub
		return movieRepo.findByGenre(genre, pageable);
	}

	@Override
	public Long deleteMovieByGenre(Genre genre) {
		return movieRepo.deleteByGenre(genre);
	}

	@Override
	public Page<Movie> getMovies(Pageable pageable) {
		return movieRepo.findAll(pageable);
	}

	@Override
	public List<Movie> getRecentMovies() {
		return movieRepo.findFirst3ByOrderByIdDesc();
	}

	@Override
	public Page<Movie> movieSearch(Specification<Movie> search, Pageable pageable) {
		// TODO Auto-generated method stub
		return movieRepo.findAll(search, pageable);
	}
	

}
