package com.capstone.online.movie.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Genre;

@Repository
public interface IGenreRepo extends JpaRepository<Genre, Integer> {
Long countByName(String name);
}
