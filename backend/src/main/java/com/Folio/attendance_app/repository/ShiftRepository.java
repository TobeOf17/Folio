package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Shift;
import com.Folio.attendance_app.model.Unit;
import com.Folio.attendance_app.model.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Integer> {

    // Find shifts by unit
    List<Shift> findByUnit(Unit unit);

    // Find shifts by shift type
    List<Shift> findByShiftType(ShiftType shiftType);

    // Find specific shift by unit and shift type
    Optional<Shift> findByUnitAndShiftType(Unit unit, ShiftType shiftType);

    // Check if a shift exists for a unit and shift type
    boolean existsByUnitAndShiftType(Unit unit, ShiftType shiftType);

    // Find shifts by unit ID
    @Query("SELECT s FROM Shift s WHERE s.unit.unitId = :unitId")
    List<Shift> findByUnitId(@Param("unitId") int unitId);

    // Find shifts by shift type ID
    @Query("SELECT s FROM Shift s WHERE s.shiftType.id = :shiftTypeId")
    List<Shift> findByShiftTypeId(@Param("shiftTypeId") int shiftTypeId);

    // Find shifts by unit name
    @Query("SELECT s FROM Shift s WHERE s.unit.name = :unitName")
    List<Shift> findByUnitName(@Param("unitName") String unitName);

    // Find shifts by shift type name
    @Query("SELECT s FROM Shift s WHERE s.shiftType.name = :shiftTypeName")
    List<Shift> findByShiftTypeName(@Param("shiftTypeName") String shiftTypeName);

    // Find shifts that start at a specific time
    @Query("SELECT s FROM Shift s WHERE s.shiftType.startTime = :startTime")
    List<Shift> findByStartTime(@Param("startTime") LocalTime startTime);

    // Find shifts that end at a specific time
    @Query("SELECT s FROM Shift s WHERE s.shiftType.endTime = :endTime")
    List<Shift> findByEndTime(@Param("endTime") LocalTime endTime);

    // Find shifts currently active (for attendance checking)
    @Query("SELECT s FROM Shift s WHERE " +
            "CURRENT_TIME BETWEEN s.shiftType.startTime AND s.shiftType.endTime")
    List<Shift> findCurrentActiveShifts();

    // Find shifts for a unit that are currently active
    @Query("SELECT s FROM Shift s WHERE s.unit = :unit AND " +
            "CURRENT_TIME BETWEEN s.shiftType.startTime AND s.shiftType.endTime")
    List<Shift> findCurrentActiveShiftsByUnit(@Param("unit") Unit unit);

    // Find shifts that start within a time range
    @Query("SELECT s FROM Shift s WHERE " +
            "s.shiftType.startTime BETWEEN :startTime AND :endTime")
    List<Shift> findByStartTimeBetween(@Param("startTime") LocalTime startTime,
                                       @Param("endTime") LocalTime endTime);

    // Find all night shifts (cross midnight)
    @Query("SELECT s FROM Shift s WHERE s.shiftType.startTime > s.shiftType.endTime")
    List<Shift> findNightShifts();

    // Count shifts by unit
    long countByUnit(Unit unit);

    // Count shifts by shift type
    long countByShiftType(ShiftType shiftType);

    // Get all shifts ordered by unit name and shift start time
    @Query("SELECT s FROM Shift s ORDER BY s.unit.name ASC, s.shiftType.startTime ASC")
    List<Shift> findAllOrderedByUnitAndStartTime();

    // Find shifts for multiple units
    List<Shift> findByUnitIn(List<Unit> units);

    // Find shifts for multiple shift types
    List<Shift> findByShiftTypeIn(List<ShiftType> shiftTypes);

    // Custom search for shifts
    @Query("SELECT s FROM Shift s WHERE " +
            "(:unitName IS NULL OR LOWER(s.unit.name) LIKE LOWER(CONCAT('%', :unitName, '%'))) AND " +
            "(:shiftTypeName IS NULL OR LOWER(s.shiftType.name) LIKE LOWER(CONCAT('%', :shiftTypeName, '%')))")
    List<Shift> searchShifts(@Param("unitName") String unitName,
                             @Param("shiftTypeName") String shiftTypeName);
}