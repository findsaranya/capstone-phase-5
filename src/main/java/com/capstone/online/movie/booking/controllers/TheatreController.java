package com.capstone.online.movie.booking.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import com.capstone.online.movie.booking.dto.ShowTimingDto;
import com.capstone.online.movie.booking.dto.TheatreDto;
import com.capstone.online.movie.booking.dto.TheatreRequestDTO;
import com.capstone.online.movie.booking.dto.TicketPriceDto;
import com.capstone.online.movie.booking.entity.APIResponse;
import com.capstone.online.movie.booking.entity.ShowTimings;
import com.capstone.online.movie.booking.entity.Theater;
import com.capstone.online.movie.booking.entity.TicketPrice;
import com.capstone.online.movie.booking.services.ITheaterService;

@Controller
@RequestMapping("/theatre")
public class TheatreController {

	@Autowired
	ITheaterService theatreService;
	
	@PostMapping(value = "/create")
	public ResponseEntity<?> createTheater(@RequestBody TheatreDto theatre){
		 if (theatre == null)
		        return ResponseEntity.badRequest().body("The provided theater is not valid");
		        Theater thert = new Theater();
		        APIResponse responseFinal = new APIResponse();
		        thert.setCity(theatre.getCity());
		        thert.setLoc(theatre.getLoc());
		        thert.setName(theatre.getName());
		        thert.setPhoneNo(theatre.getPhoneNo());
		        thert.setAddress(theatre.getAddress());
		        thert.setId(theatre.getId() == 0 ? 0 : theatre.getId());
		        List<TicketPrice> priceList = theatre.getTicketPrice().stream().map(x -> {
		        	TicketPrice newPrice = new TicketPrice();
		        	newPrice.setTicketTheatre(thert);
		        	newPrice.setPrice(x.getPrice());
		        	newPrice.setTotalSeats(x.getTotalSeats());
		        	newPrice.setType(x.getType());
		        	newPrice.setId(x.getId() == 0 ? 0 : x.getId());
		        	return newPrice;
		        }).collect(Collectors.toList());
		        thert.setTicketPrice(priceList);
		        List<ShowTimings> showTimeList = theatre.getShowTimings().stream().map(y -> {
		        	ShowTimings newShowTime = new ShowTimings();
		        	newShowTime.setTheatre(thert);
		        	newShowTime.setShowTime(y.getShowTime());
		        	newShowTime.setId(y.getId() == 0 ? 0 : y.getId());
		        	return newShowTime;
		        }).collect(Collectors.toList());
		        thert.setShowTimings(showTimeList);
		        
		      
		        theatreService.createTheater(thert);
		    	responseFinal.setStatus(200);
				responseFinal.setMessage("SUCCESS");
				responseFinal.setData("Created Successfully");
		    return ResponseEntity.status(HttpStatus.CREATED).body(responseFinal);
	}
	
	@PostMapping(value="/getAll")
	public ResponseEntity<APIResponse> getAllTheatres(@RequestBody TheatreRequestDTO request ){
		   APIResponse responseFinal = new APIResponse();
		   Pageable paging = PageRequest.of(request.getPage(), request.getSize(),Sort.by("id").descending());
		   Page<Theater> theatreList = theatreService.getAllTheater(paging);
			  Map<String, Object> responseTheatre = new HashMap<>();
		List<TheatreDto> theatreFinalList =	  theatreList.getContent().stream().map(x -> {
				  TheatreDto response = new TheatreDto();
					response.setId(x.getId());
					response.setName(x.getName());
					response.setCity(x.getCity());
					response.setLoc(x.getLoc());
					response.setAddress(x.getAddress());
					response.setPhoneNo(x.getLoc());
					response.setTicketPrice(transformTicketPrice(x.getTicketPrice()));
					response.setShowTimings(transformShowTimings(x.getShowTimings()));
					return response;
			  }).collect(Collectors.toList());
			  responseTheatre.put("theatreList", theatreFinalList);
			  responseTheatre.put("currentPage", theatreList.getNumber());
			  responseTheatre.put("totalItems", theatreList.getTotalElements());
			  responseTheatre.put("totalPages",  theatreList.getTotalPages());
		   			responseFinal.setStatus(200);
					responseFinal.setMessage("SUCCESS");
					responseFinal.setData(responseTheatre);
					return ResponseEntity.status(HttpStatus.OK).body(responseFinal);
	}
	
	@GetMapping(value="/getTheaters")
	public ResponseEntity<APIResponse> getTheaters(){
		 APIResponse responseFinal = new APIResponse();
		 List<Theater> theaterList = theatreService.getTheaters();
		 List<TheatreDto> theatreFinalList =	 theaterList.stream().map(x -> {
			  TheatreDto response = new TheatreDto();
				response.setId(x.getId());
				response.setName(x.getName());
				response.setCity(x.getCity());
				response.setLoc(x.getLoc());
				response.setAddress(x.getAddress());
				response.setPhoneNo(x.getLoc());
				response.setTicketPrice(transformTicketPrice(x.getTicketPrice()));
				response.setShowTimings(transformShowTimings(x.getShowTimings()));
				return response;
		  }).collect(Collectors.toList());
		 responseFinal.setStatus(200);
			responseFinal.setMessage("SUCCESS");
			responseFinal.setData(theatreFinalList);
			return ResponseEntity.status(HttpStatus.OK).body(responseFinal);
	}
	
	@GetMapping(value = "/get/{id}")
	public ResponseEntity<APIResponse> getTheaterById(@PathVariable int id){
		Theater result = theatreService.getTheaterById(id);
		TheatreDto response = new TheatreDto();
		response.setId(result.getId());
		response.setName(result.getName());
		response.setCity(result.getCity());
		response.setLoc(result.getLoc());
		response.setPhoneNo(result.getLoc());
		response.setAddress(result.getAddress());
	     response.setShowTimings(transformShowTimings(result.getShowTimings()));
	     response.setTicketPrice(transformTicketPrice(result.getTicketPrice()));
	     
	     APIResponse responseFinal = new APIResponse();
			responseFinal.setStatus(200);
			responseFinal.setMessage("SUCCESS");
			responseFinal.setData(response);
			return ResponseEntity.status(HttpStatus.OK).body(responseFinal);
	}
	
	@GetMapping(value="/delete/{id}")
	public ResponseEntity<APIResponse> deleteGenre(@PathVariable int id){
		APIResponse response = new APIResponse();
		response.setStatus(200);
		response.setMessage("SUCCESS");
		response.setData(theatreService.deleteTheater(id));
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
