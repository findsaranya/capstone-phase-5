package com.capstone.online.movie.booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name="admin_tab")
public class Admin {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="admin_Id")
private int id;
@NotNull(message = "Name can't be empty")
@Size(min=2, max=30,message = "Should be min 2 and max 30")
@Pattern(regexp = "^[a-zA-Z\s]*$",message = "Only space and characters allowed")
@Column(name="username")
private String username;
@NotNull(message = "Password can't be empty")
@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$",message="Should match the password pattern")
@Column(name="password")
private String password;
}
