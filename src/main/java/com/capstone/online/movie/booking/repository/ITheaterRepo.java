package com.capstone.online.movie.booking.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.Theater;

@Repository
public interface ITheaterRepo extends JpaRepository<Theater, Integer> {
	Page<Theater> findAll(Pageable pageable);
}
