package com.capstone.online.movie.booking.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@Table(name="genre_tab")
public class Genre implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
@Id
@Column(name="genere_id")
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
@Column(name="genre_name")
private String name;
}
