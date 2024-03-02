package com.capstone.online.movie.booking.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name="theater_tab")
public class Theater {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="theater_Id")
private int id;
@Column(name="theater_name")
private String name;
@Column(name="theater_city")
private String city;
@Column(name="theater_loc")
private String loc;
@Column(name="theater_phone")
private String phoneNo;
@Column(name="theater_add")
private String address;
@OneToMany(mappedBy = "ticketTheatre",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
private List<TicketPrice> ticketPrice;
@OneToMany(mappedBy = "theatre",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
private List<ShowTimings> showTimings;
}
