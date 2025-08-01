package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Schedule;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    // Find schedules by staff member
    List<Schedule> findByStaff(Staff staff);

    // Find schedules by shift
    List<Schedule> findByShift(Shift shift);

    // Find schedules for a specific date
    List<Schedule> findByShiftDate(LocalDate shiftDate);

    // Find schedule for specific staff on specific date
    Optional<Schedule> findByStaffAndShiftDate(Staff staff, LocalDate shiftDate);

    // Find schedule for specific staff and shift on specific date
    Optional<Schedule> findByStaffAndShiftAndShiftDate(Staff staff, Shift shift, LocalDate shiftDate);

    // Check if staff is scheduled for a specific date
    boolean existsByStaffAndShiftDate(Staff staff, LocalDate shiftDate);

    // Find schedules within date range
    List<Schedule> findByShiftDateBetween(LocalDate startDate, LocalDate endDate);

    // Find schedules for staff within date range
    List<Schedule> findByStaffAndShiftDateBetween(Staff staff, LocalDate startDate, LocalDate endDate);

    // Find schedules for shift within date range
    List<Schedule> findByShiftAndShiftDateBetween(Shift shift, LocalDate startDate, LocalDate endDate);

    // Find today's schedules
    @Query("SELECT s FROM Schedule s WHERE s.shiftDate = CURRENT_DATE")
    List<Schedule> findTodaysSchedules();

    // Find today's schedules for specific staff
    @Query("SELECT s FROM Schedule s WHERE s.staff = :staff AND s.shiftDate = CURRENT_DATE")
    Optional<Schedule> findTodaysScheduleForStaff(@Param("staff") Staff staff);

    // Find schedules by staff email
    @Query("SELECT s FROM Schedule s WHERE s.staff.email = :email")
    List<Schedule> findByStaffEmail(@Param("email") String email);

    // Find today's schedule by staff email
    @Query("SELECT s FROM Schedule s WHERE s.staff.email = :email AND s.shiftDate = CURRENT_DATE")
    Optional<Schedule> findTodaysScheduleByStaffEmail(@Param("email") String email);

    // Find schedules by staff ID
    @Query("SELECT s FROM Schedule s WHERE s.staff.staffId = :staffId")
    List<Schedule> findByStaffId(@Param("staffId") int staffId);

    // Find schedules by shift ID
    @Query("SELECT s FROM Schedule s WHERE s.shift.shiftId = :shiftId")
    List<Schedule> findByShiftId(@Param("shiftId") int shiftId);

    // Find upcoming schedules (from today onwards)
    @Query("SELECT s FROM Schedule s WHERE s.shiftDate >= CURRENT_DATE ORDER BY s.shiftDate ASC")
    List<Schedule> findUpcomingSchedules();

    // Find upcoming schedules for staff
    @Query("SELECT s FROM Schedule s WHERE s.staff = :staff AND s.shiftDate >= CURRENT_DATE ORDER BY s.shiftDate ASC")
    List<Schedule> findUpcomingSchedulesForStaff(@Param("staff") Staff staff);

    // Find past schedules for staff (for attendance history)
    @Query("SELECT s FROM Schedule s WHERE s.staff = :staff AND s.shiftDate < CURRENT_DATE ORDER BY s.shiftDate DESC")
    List<Schedule> findPastSchedulesForStaff(@Param("staff") Staff staff);

    // Find schedules by unit (through shift relationship)
    @Query("SELECT s FROM Schedule s WHERE s.shift.unit.unitId = :unitId")
    List<Schedule> findByUnitId(@Param("unitId") int unitId);

    // Find today's schedules by unit
    @Query("SELECT s FROM Schedule s WHERE s.shift.unit.unitId = :unitId AND s.shiftDate = CURRENT_DATE")
    List<Schedule> findTodaysSchedulesByUnit(@Param("unitId") int unitId);

    // Find schedules by shift type
    @Query("SELECT s FROM Schedule s WHERE s.shift.shiftType.id = :shiftTypeId")
    List<Schedule> findByShiftTypeId(@Param("shiftTypeId") int shiftTypeId);

    // Count schedules for staff in date range (for workload analysis)
    @Query("SELECT COUNT(s) FROM Schedule s WHERE s.staff = :staff AND s.shiftDate BETWEEN :startDate AND :endDate")
    long countSchedulesForStaffInDateRange(@Param("staff") Staff staff,
                                           @Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);

    // Find conflicting schedules (staff scheduled multiple times on same date)
    @Query("SELECT s1 FROM Schedule s1 WHERE EXISTS " +
            "(SELECT s2 FROM Schedule s2 WHERE s1.staff = s2.staff AND s1.shiftDate = s2.shiftDate AND s1.scheduleId <> s2.scheduleId)")
    List<Schedule> findConflictingSchedules();

    // Find weekly schedule for staff
    @Query("SELECT s FROM Schedule s WHERE s.staff = :staff AND " +
            "s.shiftDate BETWEEN :weekStart AND :weekEnd ORDER BY s.shiftDate ASC")
    List<Schedule> findWeeklyScheduleForStaff(@Param("staff") Staff staff,
                                              @Param("weekStart") LocalDate weekStart,
                                              @Param("weekEnd") LocalDate weekEnd);

    // Find monthly schedule for staff
    @Query("SELECT s FROM Schedule s WHERE s.staff = :staff AND " +
            "YEAR(s.shiftDate) = :year AND MONTH(s.shiftDate) = :month ORDER BY s.shiftDate ASC")
    List<Schedule> findMonthlyScheduleForStaff(@Param("staff") Staff staff,
                                               @Param("year") int year,
                                               @Param("month") int month);

    // Get all schedules ordered by date and shift start time
    @Query("SELECT s FROM Schedule s ORDER BY s.shiftDate ASC, s.shift.shiftType.startTime ASC")
    List<Schedule> findAllOrderedByDateAndTime();

    // Custom search for schedules
    @Query("SELECT s FROM Schedule s WHERE " +
            "(:staffEmail IS NULL OR LOWER(s.staff.email) LIKE LOWER(CONCAT('%', :staffEmail, '%'))) AND " +
            "(:unitName IS NULL OR LOWER(s.shift.unit.name) LIKE LOWER(CONCAT('%', :unitName, '%'))) AND " +
            "(:fromDate IS NULL OR s.shiftDate >= :fromDate) AND " +
            "(:toDate IS NULL OR s.shiftDate <= :toDate)")
    List<Schedule> searchSchedules(@Param("staffEmail") String staffEmail,
                                   @Param("unitName") String unitName,
                                   @Param("fromDate") LocalDate fromDate,
                                   @Param("toDate") LocalDate toDate);

    // Find staff scheduled for multiple shifts on same date (overtime detection)
    @Query("SELECT s.staff, s.shiftDate, COUNT(s) FROM Schedule s " +
            "GROUP BY s.staff, s.shiftDate HAVING COUNT(s) > 1")
    List<Object[]> findStaffWithMultipleShiftsPerDay();
}