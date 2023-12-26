package com.capstone.online.movie.booking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.exception.GenreNotFoundException;
import com.capstone.online.movie.booking.repository.IGenreRepo;

@Service
public class GenreServiceImpl implements IGenreService {

	@Autowired
	IGenreRepo genreRepo;
	@Override
	public Genre createGenre(Genre genre) {
		return genreRepo.save(genre);
	}

	@Override
	public Genre updateGenre(Genre genre) {
		return genreRepo.save(genre);
	}

	@Override
	public List<Genre> getGenreList() {
		return genreRepo.findAll();
	}

	@Override
	public String deleteGenre(int id) {
		Genre genre = genreRepo.findById(id).orElse(null);
		    if (genre == null)
		        throw new GenreNotFoundException("Genre ID " + id + " not found");
		genreRepo.deleteById(id);
		return "Genre Id "+id+" deleted Successfully";
	}

	@Override
	public Genre getGenreById(int id)throws GenreNotFoundException {
		Genre genre = genreRepo.findById(id).orElse(null);
		if(genre == null) {
			throw new GenreNotFoundException("Genre ID " + id + " not found");
		}
		return genre;
	}

	@Override
	public Long countByName(String name) {
		return genreRepo.countByName(name);
	}

}
 