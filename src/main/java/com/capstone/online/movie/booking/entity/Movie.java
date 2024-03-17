package com.capstone.online.movie.booking.entity;

import java.io.Serializable;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="movie_tab")
public class Movie implements Serializable{
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
@Column(name="movie_Id")
private int id;
@Column(name="movie_name")
private String name;
@Column(name="movie_lang")
private String language;
@Column(name="movie_desc")
private String description;
@ManyToOne(cascade=CascadeType.MERGE)
@JoinColumn(name = "genre_Id")
private Genre genre;
@ManyToMany
@JoinTable(name = "movie_theater_db", 
joinColumns = { @JoinColumn(name = "movie_Id") },
inverseJoinColumns = { @JoinColumn(name = "theater_Id") })
private Set<Theater> movieTheater;
}
