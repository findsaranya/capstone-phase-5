package com.capstone.online.movie.booking.entity;

import java.math.BigDecimal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="ticket_price_tab")
public class TicketPrice {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="ticket_price_Id")
private int id;
@Column(name="total_seats")
private int totalSeats;
@Column(name="seat_price")
private BigDecimal price;
@Column(name="seat_type")
private String type;
@ToString.Exclude
@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
@JoinColumn(name="TheaterId")
private Theater ticketTheatre;
}
