package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.AttendanceLog;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Integer> {

    // Find attendance by staff and date
    Optional<AttendanceLog> findByStaffAndDate(Staff staff, LocalDate date);

    // Find all attendance records for a staff member, ordered by date descending
    List<AttendanceLog> findByStaffOrderByDateDesc(Staff staff);

    // Find attendance records by date
    List<AttendanceLog> findByDate(LocalDate date);

    // Find attendance records between dates
    List<AttendanceLog> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Find attendance records for a staff member between dates
    List<AttendanceLog> findByStaffAndDateBetween(Staff staff, LocalDate startDate, LocalDate endDate);

    // Find attendance records by status
    List<AttendanceLog> findByStatus(AttendanceStatus status);

    // Find attendance records by staff and status
    List<AttendanceLog> findByStaffAndStatus(Staff staff, AttendanceStatus status);

    // Find attendance records by date and status
    List<AttendanceLog> findByDateAndStatus(LocalDate date, AttendanceStatus status);

    // Custom query to get attendance count by status for a staff member
    @Query("SELECT COUNT(a) FROM AttendanceLog a WHERE a.staff = :staff AND a.status = :status")
    long countByStaffAndStatus(@Param("staff") Staff staff, @Param("status") AttendanceStatus status);

    // Custom query to get attendance count by status for a staff member within date range
    @Query("SELECT COUNT(a) FROM AttendanceLog a WHERE a.staff = :staff AND a.status = :status AND a.date BETWEEN :startDate AND :endDate")
    long countByStaffAndStatusAndDateBetween(@Param("staff") Staff staff,
                                             @Param("status") AttendanceStatus status,
                                             @Param("startDate") LocalDate startDate,
                                             @Param("endDate") LocalDate endDate);

    // Find today's attendance records
    @Query("SELECT a FROM AttendanceLog a WHERE a.date = CURRENT_DATE")
    List<AttendanceLog> findTodaysAttendance();

    // Find staff who haven't signed in today
    @Query("SELECT s FROM Staff s WHERE s NOT IN (SELECT a.staff FROM AttendanceLog a WHERE a.date = CURRENT_DATE)")
    List<Staff> findStaffNotSignedInToday();

    // Find attendance records for current month
    @Query("SELECT a FROM AttendanceLog a WHERE MONTH(a.date) = MONTH(CURRENT_DATE) AND YEAR(a.date) = YEAR(CURRENT_DATE)")
    List<AttendanceLog> findCurrentMonthAttendance();
}