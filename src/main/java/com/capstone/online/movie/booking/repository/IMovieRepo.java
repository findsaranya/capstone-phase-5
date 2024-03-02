package com.capstone.online.movie.booking.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.entity.Movie;
@Repository
public interface IMovieRepo extends JpaRepository<Movie, Integer> {
	 Page<Movie> findByGenre(Genre genre, Pageable pageable);
	 long deleteByGenre(Genre genre);
	 Page<Movie> findAll(Pageable page);
}
