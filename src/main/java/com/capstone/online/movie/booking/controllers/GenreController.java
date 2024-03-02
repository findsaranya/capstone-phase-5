package com.capstone.online.movie.booking.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.online.movie.booking.dto.GenrePageDTO;
import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.services.IGenreService;
import com.capstone.online.movie.booking.services.IMovieService;

@Controller
@RequestMapping("/genre")
public class GenreController {
	@Autowired
	private IGenreService genreService;

	@Autowired
	private IMovieService movieService;

	@PostMapping(value = "/create")
	public ResponseEntity<?> createGenre(@RequestBody Genre genre) {
		if (genre == null)
			return ResponseEntity.badRequest().body("The provided movie is not valid");
		return ResponseEntity.status(HttpStatus.CREATED).body(genreService.createGenre(genre));
	}

	@GetMapping(value = "/get/{id}")
	public ResponseEntity<APIResponse> getGenreById(@PathVariable int id) {
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");
		response.setData(genreService.getGenreById(id));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping(value = "/getAllGenres")
	public ResponseEntity<APIResponse> getAllGenres() {
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");
		response.setData(genreService.getAllGenreList());
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping(value = "/getAll")
	public ResponseEntity<APIResponse> getAllGenre(@RequestBody GenrePageDTO genre) {
		APIResponse response = new APIResponse();
		Pageable paging = PageRequest.of(genre.getPage(), genre.getSize(), Sort.by("id").descending());
		Page<Genre> genres = genreService.getGenreList(paging);
		Map<String, Object> responseMovie = new HashMap<>();
		responseMovie.put("genreList", genres.getContent());
		responseMovie.put("currentPage", genres.getNumber());
		responseMovie.put("totalItems", genres.getTotalElements());
		responseMovie.put("totalPages", genres.getTotalPages());
		response.setStatus(200);
		response.setMessage("SUCCESS");
		response.setData(responseMovie);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping(value = "/getRecent")
	public ResponseEntity<List<Genre>> getRecentGenre() {
		return ResponseEntity.status(HttpStatus.OK).body(genreService.getRecentGenreList());
	}

	@PostMapping(value = "/delete")
	public ResponseEntity<String> deleteGenre(@RequestBody Genre genre) {
		Long count = movieService.deleteMovieByGenre(genre);
		System.out.println(count);
		return ResponseEntity.status(HttpStatus.OK).body(genreService.deleteGenre(genre.getId()));
	}

	@GetMapping(value = "/getCount/{name}")
	public ResponseEntity<APIResponse> getCountByName(@PathVariable String name) {
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");
		response.setData(genreService.countByName(name));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

}
