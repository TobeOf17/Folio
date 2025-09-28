package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Shift;
import com.Folio.attendance_app.model.ShiftType;
import com.Folio.attendance_app.model.Unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {

@Query("SELECT s FROM Shift s WHERE s.unit.unitId = :unitId")
List<Shift> findByUnitId(@Param("unitId") Long unitId);

@Query("SELECT s FROM Shift s WHERE s.shiftType.id = :shiftTypeId")
List<Shift> findByShiftTypeId(@Param("shiftTypeId") Long shiftTypeId);

List<Shift> findByUnit(Unit unit);
List<Shift> findByShiftType(ShiftType shiftType);
Optional<Shift> findByUnitAndShiftType(Unit unit, ShiftType shiftType);

}