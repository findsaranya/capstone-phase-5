package com.capstone.online.movie.booking.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.entity.Movie;

import jakarta.transaction.Transactional;
@Repository
public interface IMovieRepo extends JpaRepository<Movie, Integer>,JpaSpecificationExecutor<Movie> {
	 Page<Movie> findByGenre(Genre genre, Pageable pageable);
	 @Transactional
	 long deleteByGenre(Genre genre);
	 Page<Movie> findAll(Pageable page);
	 List<Movie> findFirst3ByOrderByIdDesc();
}
