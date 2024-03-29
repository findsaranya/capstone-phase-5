package com.capstone.online.movie.booking.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Genre;

@Repository
public interface IGenreRepo extends JpaRepository<Genre, Integer> {
Long countByName(String name);
List<Genre> findFirst3ByOrderByIdDesc();
Page<Genre> findAll(Pageable pageable);
}
