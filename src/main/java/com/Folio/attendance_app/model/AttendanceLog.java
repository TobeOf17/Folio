package com.Folio.attendance_app.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance_log")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})  // Add this line
public class AttendanceLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "staff_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Staff staff;

    private LocalDate date;
    private LocalTime signInTime;
    private LocalTime signOutTime;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    public AttendanceLog() {
    }

    public AttendanceLog(Staff staff, LocalDate date, LocalTime signInTime, LocalTime signOutTime, AttendanceStatus status) {
        this.staff = staff;
        this.date = date;
        this.signInTime = signInTime;
        this.signOutTime = signOutTime;
        this.status = status;
    }

    public AttendanceLog(int logId, Staff staff, LocalDate date, LocalTime signInTime, LocalTime signOutTime, AttendanceStatus status) {
        this.logId = logId;
        this.staff = staff;
        this.date = date;
        this.signInTime = signInTime;
        this.signOutTime = signOutTime;
        this.status = status;
    }

    public int getLogId() {
        return logId;
    }

    public void setLogId(int logId) {
        this.logId = logId;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getSignInTime() {
        return signInTime;
    }

    public void setSignInTime(LocalTime signInTime) {
        this.signInTime = signInTime;
    }

    public LocalTime getSignOutTime() {
        return signOutTime;
    }

    public void setSignOutTime(LocalTime signOutTime) {
        this.signOutTime = signOutTime;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "AttendanceLog{" +
                "logId=" + logId +
                ", staff=" + staff +
                ", date=" + date +
                ", signInTime=" + signInTime +
                ", signOutTime=" + signOutTime +
                ", status='" + status + '\'' +
                '}';
    }
}