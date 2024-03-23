package com.capstone.online.movie.booking.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.capstone.online.movie.booking.dto.SearchDTO;
import com.capstone.online.movie.booking.entity.Genre;
import com.capstone.online.movie.booking.entity.Movie;
import com.capstone.online.movie.booking.entity.Seats;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class FilterSpecification {
//public Specification<T> getSearchSpecification(List<SearchDTO> searchDTO){
//
//	return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
//		 List<Predicate> predicates = new ArrayList<>();
//		 	 System.out.println(searchDTO);
//	        for (SearchDTO field : searchDTO) {
//	        	if(field.getColumn() =="genre") {
//	        		//predicates.add((Predicate)hasGenreWithTitle((int) field.getValue()));
//	        		   predicates.add(criteriaBuilder.equal(root.get(field.getColumn()).get("id"), field.getValue()));
//	        	}else {
//	        		 predicates.add(criteriaBuilder.equal(root.get(field.getColumn()), field.getValue()));
//	        	}
//	           
//	        }
//	        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
//	
//		
//	};
//}

public static Specification<Movie> nameLike(String nameLike) {
    return (root, query, builder) -> builder.like(root.get("name"), "%" + nameLike + "%");
}

public static Specification<Movie> hasGenreWithTitle(int genreId) {
    return (root, query, criteriaBuilder) -> {
        Join< Movie,Genre> genreMovies = root.join("genre",JoinType.INNER);
        return criteriaBuilder.equal(genreMovies.get("id"),genreId);
    };
}

public static Specification<Seats> hasTheaterId(int theaterId) {
    return (root, query, builder) -> builder.equal(root.get("theaterId"),theaterId);
}
public static Specification<Seats> hasMovieId(int movieId) {
    return (root, query, builder) -> builder.equal(root.get("movieId"),movieId);
}
public static Specification<Seats> hasShowTime(String showTime) {
    return (root, query, builder) -> builder.equal(root.get("showTime"),showTime);
}
public static Specification<Seats> hasShowDate(Date showDate) {
    return (root, query, builder) -> builder.equal(root.get("showDate"),showDate);
}
}
