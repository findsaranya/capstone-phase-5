package com.capstone.online.movie.booking.entity;

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
@Table
public class Language {
@Id
@Column(name="lang_Id")
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
@Column(name="lang_name")
private String name;
}
