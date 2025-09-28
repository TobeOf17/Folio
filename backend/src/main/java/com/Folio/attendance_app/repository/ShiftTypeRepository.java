package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftTypeRepository extends JpaRepository<ShiftType, Long> {
Optional<ShiftType> findByNameIgnoreCase(String name);
List<ShiftType> findAllByOrderByStartTimeAsc();

@Query("SELECT s FROM ShiftType s WHERE CURRENT_TIME BETWEEN s.startTime AND s.endTime")
List<ShiftType> findCurrentActiveShifts();
}