package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Schedule;
import com.Folio.attendance_app.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
@Query("SELECT s FROM Schedule s WHERE s.shiftDate = CURRENT_DATE")
List<Schedule> findTodaysSchedules();

@Query("SELECT s FROM Schedule s WHERE s.staff = :staff AND s.shiftDate = CURRENT_DATE")
Optional<Schedule> findTodaysScheduleForStaff(@Param("staff") Staff staff);

@Query("SELECT s FROM Schedule s WHERE s.shiftDate >= CURRENT_DATE ORDER BY s.shiftDate ASC")
List<Schedule> findUpcomingSchedules();

@Query("SELECT s FROM Schedule s WHERE s.staff.staffId = :staffId")
List<Schedule> findByStaffId(@Param("staffId") Long staffId);

@Query("SELECT s FROM Schedule s WHERE s.shift.shiftId = :shiftId")
List<Schedule> findByShiftId(@Param("shiftId") Long shiftId);

@Query("SELECT s FROM Schedule s WHERE s.shift.unit.unitId = :unitId")
List<Schedule> findByUnitId(@Param("unitId") Long unitId);
}