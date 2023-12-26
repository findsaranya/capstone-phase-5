package com.capstone.online.movie.booking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.services.IGenreService;

@Controller
@RequestMapping("/genre")
public class GenreController {
	@Autowired
	private IGenreService genreService;

	@PostMapping(value = "/create")
	public ResponseEntity<?> createGenre(@RequestBody Genre genre){
		 if (genre == null)
		        return ResponseEntity.badRequest().body("The provided movie is not valid");
		    return ResponseEntity.status(HttpStatus.CREATED).body(genreService.createGenre(genre));
	}
	
	@GetMapping(value="/get/{id}")
	public ResponseEntity<Genre> getGenreById(@PathVariable int id){
		    return ResponseEntity.status(HttpStatus.OK).body(genreService.getGenreById(id));
	}
	
	@GetMapping(value="/getAll")
	public ResponseEntity<List<Genre>> getAllGenre(){
		return ResponseEntity.status(HttpStatus.OK).body(genreService.getGenreList());
	}
	
	@GetMapping(value="/delete/{id}")
	public ResponseEntity<String> deleteGenre(@PathVariable int id){
		return ResponseEntity.status(HttpStatus.OK).body(genreService.deleteGenre(id));
	}
	
	@GetMapping(value="/getCount/{name}")
	public ResponseEntity<APIResponse> getCountByName(@PathVariable String name){
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");
		response.setData(genreService.countByName(name));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	
	
	
}
