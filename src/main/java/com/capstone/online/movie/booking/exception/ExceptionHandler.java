package com.capstone.online.movie.booking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.capstone.online.movie.booking.entity.APIErrorMessage;

@RestControllerAdvice
public class ExceptionHandler {

@org.springframework.web.bind.annotation.ExceptionHandler(GenreNotFoundException.class)
public ResponseEntity<APIErrorMessage> handleGenreException(GenreNotFoundException ex) {
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIErrorMessage(ex.getMessage(),HttpStatus.BAD_REQUEST.toString() ));
}
}
