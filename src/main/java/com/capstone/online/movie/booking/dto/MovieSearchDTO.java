package com.capstone.online.movie.booking.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class MovieSearchDTO{
   private int page;
   private int size;
   private String name = "";
   private int genreId = 0;
}
