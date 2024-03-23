package com.capstone.online.movie.booking.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Entity
@Table(name="seats_tab")
public class Seats {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private int theaterId;
private int movieId;
private String seatNo;
private String showTime;
@Temporal(TemporalType.DATE)
private Date showDate;
private String seatType;
}
