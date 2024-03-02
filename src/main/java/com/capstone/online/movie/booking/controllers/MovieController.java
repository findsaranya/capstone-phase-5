package com.capstone.online.movie.booking.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.online.movie.booking.dto.GenrePageDTO;
import com.capstone.online.movie.booking.dto.MovieDto;
import com.capstone.online.movie.booking.dto.MovieGenreDto;
import com.capstone.online.movie.booking.dto.ShowTimingDto;
import com.capstone.online.movie.booking.dto.TheatreDto;
import com.capstone.online.movie.booking.dto.TicketPriceDto;
import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.Movie;
import com.capstone.online.movie.booking.entity.ShowTimings;
import com.capstone.online.movie.booking.entity.TicketPrice;
import com.capstone.online.movie.booking.services.IMovieService;

@Controller
@RequestMapping("/movie")
public class MovieController {
@Autowired
private IMovieService movieService;

@PostMapping(value = "/create")
public ResponseEntity<?> createMovie(@RequestBody Movie movie){
	if(movie == null) return ResponseEntity.badRequest().body("The provided movie is not valid");
	   APIResponse responseFinal = new APIResponse();
	   responseFinal.setStatus(200);
		responseFinal.setMessage("SUCCESS");
		movieService.createMovie(movie);
		
		responseFinal.setData("Created Successfully" );
	
	return ResponseEntity.status(HttpStatus.CREATED).body(responseFinal);
}

@PostMapping(value="/getGenre")
public ResponseEntity<APIResponse> getByGenre(@RequestBody MovieGenreDto genre){
	APIResponse response = new APIResponse();
	 Pageable paging = PageRequest.of(genre.getPage(), genre.getSize());
     List<MovieDto> movieDto = new ArrayList<MovieDto>();
     Page<Movie> movies = movieService.getMoviesByGenre(genre.getGenre(), paging);
     movieDto = movies.getContent().stream().map(x -> {
    	 MovieDto mv = new MovieDto();
    	 mv.setId(x.getId());
    	 mv.setName(x.getName());
    	 mv.setLanguage(x.getLanguage());
    	 mv.setGenre(x.getGenre());
    	 mv.setDescription(x.getDescription());
    	 List<TheatreDto> theatreFinalList =	 x.getMovieTheater().stream().map(item -> {
   		  TheatreDto res = new TheatreDto();
   			res.setId(item.getId());
   			res.setName(item.getName());
   			res.setCity(item.getCity());
   			res.setLoc(item.getLoc());
   			res.setAddress(item.getAddress());
   			res.setPhoneNo(item.getLoc());
   			res.setTicketPrice(transformTicketPrice(item.getTicketPrice()));
   			res.setShowTimings(transformShowTimings(item.getShowTimings()));
   			return res;
   	  }).collect(Collectors.toList());
      	 mv.setMovieTheater(theatreFinalList);
    	 return mv;
     }).toList();
     Map<String, Object> responseMovie = new HashMap<>();
     responseMovie.put("movies", movieDto);
     responseMovie.put("currentPage", movies.getNumber());
     responseMovie.put("totalItems", movies.getTotalElements());
     responseMovie.put("totalPages", movies.getTotalPages());
     response.setStatus(200);
	response.setMessage("SUCCESS");
	response.setData(responseMovie);
	return ResponseEntity.status(HttpStatus.OK).body(response);
	
}

@PostMapping(value="/getMovies")
public ResponseEntity<APIResponse> getMovies(@RequestBody GenrePageDTO genre){
	APIResponse response = new APIResponse();
	 Pageable paging = PageRequest.of(genre.getPage(), genre.getSize());
    List<MovieDto> movieDto = new ArrayList<MovieDto>();
    Page<Movie> movies = movieService.getMovies( paging);
    movieDto = movies.getContent().stream().map(x -> {
   	 MovieDto mv = new MovieDto();
   	 mv.setId(x.getId());
   	 mv.setName(x.getName());
   	 mv.setLanguage(x.getLanguage());
   	 mv.setGenre(x.getGenre());
   	 mv.setDescription(x.getDescription());
   	 
   	 List<TheatreDto> theatreFinalList =	 x.getMovieTheater().stream().map(item -> {
		  TheatreDto res = new TheatreDto();
			res.setId(item.getId());
			res.setName(item.getName());
			res.setCity(item.getCity());
			res.setLoc(item.getLoc());
			res.setAddress(item.getAddress());
			res.setPhoneNo(item.getLoc());
			res.setTicketPrice(transformTicketPrice(item.getTicketPrice()));
			res.setShowTimings(transformShowTimings(item.getShowTimings()));
			return res;
	  }).collect(Collectors.toList());
   	 mv.setMovieTheater(theatreFinalList);
   	 return mv;
    }).toList();
    Map<String, Object> responseMovie = new HashMap<>();
    responseMovie.put("movies", movieDto);
    responseMovie.put("currentPage", movies.getNumber());
    responseMovie.put("totalItems", movies.getTotalElements());
    responseMovie.put("totalPages", movies.getTotalPages());
    response.setStatus(200);
	response.setMessage("SUCCESS");
	response.setData(responseMovie);
	return ResponseEntity.status(HttpStatus.OK).body(response);
}
	


@GetMapping(value="/delete/{id}")
public ResponseEntity<APIResponse> deleteMovie(@PathVariable int id){
	APIResponse response = new APIResponse();
	response.setStatus(200);
	response.setMessage("SUCCESS");
	response.setData(movieService.deleteMovie(id));
	return ResponseEntity.status(HttpStatus.OK).body(response);
}


private List<TicketPriceDto> transformTicketPrice(List<TicketPrice> ticketPrice){
	  List<TicketPriceDto> priceList = ticketPrice.stream().map(x -> {
      	TicketPriceDto newPrice = new TicketPriceDto();
      	newPrice.setId(x.getId());
      	newPrice.setPrice(x.getPrice());
      	newPrice.setTotalSeats(x.getTotalSeats());
      	newPrice.setType(x.getType());
      	return newPrice;
      }).collect(Collectors.toList());
	  return priceList;
}

private List<ShowTimingDto> transformShowTimings(List<ShowTimings> showTimingsList){
	 List<ShowTimingDto> showTimeList = showTimingsList.stream().map(y -> {
      	ShowTimingDto newShowTime = new ShowTimingDto();
      	newShowTime.setId(y.getId());
      	newShowTime.setShowTime(y.getShowTime());
      	return newShowTime;
      }).collect(Collectors.toList());
	 return showTimeList;
}
}
