package com.capstone.online.movie.booking.entity;


import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
@Column(name="cust_role")
private String role = "USER";
@NotNull(message = "Name can't be empty")
@Size(min=2, max=30,message = "Should be min 2 and max 30")
@Pattern(regexp = "^[a-zA-Z\s]*$",message = "Only space and characters allowed")
@Column(name="cust_name")
private String name;
@Email(message = "Invalid email address")
@Column(name="cust_email")
private String email;
//@JsonIgnore
@NotNull(message = "Password can't be empty")
@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$",message="Should match the password pattern")
@Column(name="cust_password")
private String password;
@NotNull(message="phone number required")
@Pattern(regexp="^[+]?(\\d{1,2})?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",message="should match the phone pattern")
@Column(name="cust_phone")
private String phoneNo;
@NotNull(message="location required")
@Size(min=5,message="should contain atleast min 5 characters")
@Column(name="cust_loc")
private String location;
}
