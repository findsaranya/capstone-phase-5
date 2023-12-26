package com.capstone.online.movie.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.online.movie.booking.entity.Language;

public interface ILanguageRepo extends  JpaRepository<Language, Integer>{

}
