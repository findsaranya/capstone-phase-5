package com.capstone.online.movie.booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
@NotNull(message = "Name can't be empty")
@Size(min=2, max=30,message = "Should be min 2 and max 30")
@Column(name="cust_name")
private String name;
@Email(message = "Invalid email address")
@Column(name="cust_email")
private String email;
@NotNull(message = "Password can't be empty")
@Size(min=2, max=30,message = "Should be min 2 and max 30")
@Column(name="cust_password")
private String password;
@Column(name="cust_phone")
private String phoneNo;
@Column(name="cust_loc")
private String location;
}
