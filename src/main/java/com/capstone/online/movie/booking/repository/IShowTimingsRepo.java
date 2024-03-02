package com.capstone.online.movie.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.online.movie.booking.entity.ShowTimings;

@Repository
public interface IShowTimingsRepo extends JpaRepository<ShowTimings, Integer> {

}
