package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.AttendanceLog;
import com.Folio.attendance_app.model.Staff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {

  @Query("SELECT a FROM AttendanceLog a WHERE a.date = CURRENT_DATE")
List<AttendanceLog> findTodaysAttendance();

Optional<AttendanceLog> findByStaffAndDate(Staff staff, LocalDate date);
List<AttendanceLog> findByStaff(Staff staff);
List<AttendanceLog> findByDate(LocalDate date);
List<AttendanceLog> findByDateBetween(LocalDate startDate, LocalDate endDate);
}