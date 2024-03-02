package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.exception.GenreNotFoundException;

public interface IGenreService {
Genre createGenre(Genre genre);
Genre updateGenre(Genre genre);
Genre getGenreById(int id) throws GenreNotFoundException;
Page<Genre> getGenreList(Pageable pageable);
List<Genre> getRecentGenreList();
List<Genre> getAllGenreList();
String deleteGenre(int id)  throws GenreNotFoundException;
Long countByName(String name);
}
