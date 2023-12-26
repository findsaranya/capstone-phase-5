package com.capstone.online.movie.booking.services;

import java.util.List;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.exception.GenreNotFoundException;

public interface IGenreService {
Genre createGenre(Genre genre);
Genre updateGenre(Genre genre);
Genre getGenreById(int id) throws GenreNotFoundException;
List<Genre> getGenreList();
String deleteGenre(int id)  throws GenreNotFoundException;
Long countByName(String name);
}
