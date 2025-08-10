package com.Folio.attendance_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "staff")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private int staffId;

    @Column(name = "full_name", nullable = false, length = 100)
    @Size(min = 1, max = 100)
    private String fullName;

    @Column(name = "dob", nullable = false)
    @Past
    private LocalDate dob;

    @Column(name = "phone", nullable = false, length = 20)
    @Size(min = 10, max = 20)
    private String phone;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @JsonIgnore
    @Column(name = "password", nullable = false, length = 255)
    @Size(min = 8)
    private String hashedPassword;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Role role;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Unit unit;

    @Column(name = "passport_path", length = 500)
    private String passportPath;

    @Column(name = "employee_id", nullable = false, unique = true, length = 20)
    private String employeeId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;


    public Staff() {
    }

    public Staff(int staffId, String fullName, LocalDate dob, String phone, String email,
                 Gender gender, Role role, Unit unit, String passportPath, String hashedPassword) {
        this.staffId = staffId;
        this.fullName = fullName;
        this.dob = dob;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.role = role;
        this.unit = unit;
        this.passportPath = passportPath;
        this.hashedPassword = hashedPassword;
    }

    public Staff(int staffId, String fullName, LocalDate dob, String phone, String email, Gender gender, String hashedPassword, Role role, Unit unit, String passportPath, String employeeId, LocalDateTime createdAt) {
        this.staffId = staffId;
        this.fullName = fullName;
        this.dob = dob;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.hashedPassword = hashedPassword;
        this.role = role;
        this.unit = unit;
        this.passportPath = passportPath;
        this.employeeId = employeeId;
        this.createdAt = createdAt;
    }

    public Staff(String fullName, LocalDate dob, String phone, String email,
                 Gender gender, Role role, Unit unit, String passportPath, String hashedPassword) {
        this.fullName = fullName;
        this.dob = dob;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.role = role;
        this.unit = unit;
        this.passportPath = passportPath;
        this.hashedPassword = hashedPassword;
    }


    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public String getPassportPath() {
        return passportPath;
    }

    public void setPassportPath(String passportPath) {
        this.passportPath = passportPath;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "Staff{" +
                "staffId=" + staffId +
                ", fullName='" + fullName + '\'' +
                ", dob=" + dob +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                ", role=" + role +
                ", unit=" + unit +
                ", passportPath='" + passportPath + '\'' +
                '}';
    }
}