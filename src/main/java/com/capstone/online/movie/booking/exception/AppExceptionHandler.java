package com.capstone.online.movie.booking.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.capstone.online.movie.booking.entity.APIErrorMessage;

@RestControllerAdvice
public class AppExceptionHandler {
@ExceptionHandler(GenreNotFoundException.class)
public ResponseEntity<APIErrorMessage> handleGenreException(GenreNotFoundException ex) {
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIErrorMessage(ex.getMessage(),HttpStatus.BAD_REQUEST.toString() ));
}

@ExceptionHandler(CustomerNotFoundException.class)
public ResponseEntity<APIErrorMessage> handleUserException(CustomerNotFoundException ex) {
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIErrorMessage(ex.getMessage(),HttpStatus.BAD_REQUEST.toString() ));
}

@ExceptionHandler(MovieNotFoundException.class)
public ResponseEntity<APIErrorMessage> handleMovieException(MovieNotFoundException ex) {
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIErrorMessage(ex.getMessage(),HttpStatus.BAD_REQUEST.toString() ));
}

@ExceptionHandler(TheatreNotFoundException.class)
public ResponseEntity<APIErrorMessage> handleTheatreException(TheatreNotFoundException ex) {
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIErrorMessage(ex.getMessage(),HttpStatus.BAD_REQUEST.toString() ));
}

@ExceptionHandler(EmailAlreadyExistsException.class)
public ResponseEntity<APIErrorMessage> handleEmailExistException(EmailAlreadyExistsException ex) {
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIErrorMessage(ex.getMessage(),HttpStatus.BAD_REQUEST.toString() ));
}

@ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, String>> handleValidationExceptions(
  MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
    });
    errors.put("status","400");
    errors.put("message",HttpStatus.BAD_REQUEST.toString());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
}
}
