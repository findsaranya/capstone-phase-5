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
@Table(name="customer_tab")
public class Customer {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="cust_Id")
private int id;

@Column(name="cust_name")
private String name;
@Column(name="cust_email")
private String email;
@Column(name="cust_password")
private String password;
@Column(name="cust_phone")
private String phoneNo;
@Column(name="cust_loc")
private String location;
}
