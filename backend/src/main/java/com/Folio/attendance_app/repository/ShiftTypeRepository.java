package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftTypeRepository extends JpaRepository<ShiftType, Integer> {

    // Find by shift name
    Optional<ShiftType> findByName(String name);

    // Check if shift name exists
    boolean existsByName(String name);

    // Find by shift name (case-insensitive)
    Optional<ShiftType> findByNameIgnoreCase(String name);

    // Find shifts that start at a specific time
    List<ShiftType> findByStartTime(LocalTime startTime);

    // Find shifts that end at a specific time
    List<ShiftType> findByEndTime(LocalTime endTime);

    // Find shifts within a time range
    List<ShiftType> findByStartTimeBetween(LocalTime startTime, LocalTime endTime);

    // Find shifts that start before a certain time
    List<ShiftType> findByStartTimeBefore(LocalTime time);

    // Find shifts that start after a certain time
    List<ShiftType> findByStartTimeAfter(LocalTime time);

    // Find shifts that end before a certain time
    List<ShiftType> findByEndTimeBefore(LocalTime time);

    // Find shifts that end after a certain time
    List<ShiftType> findByEndTimeAfter(LocalTime time);

    // Custom query to find shifts by duration (useful for filtering)
    @Query(value = "SELECT * FROM shift_type s WHERE " +
            "EXTRACT(EPOCH FROM (s.end_time::time - s.start_time::time)) = :durationInSeconds",
            nativeQuery = true)
    List<ShiftType> findByDuration(@Param("durationInSeconds") long durationInSeconds);

    // Find shifts that overlap with a given time range
    @Query("SELECT s FROM ShiftType s WHERE " +
            "s.startTime < :endTime AND s.endTime > :startTime")
    List<ShiftType> findOverlappingShifts(@Param("startTime") LocalTime startTime,
                                          @Param("endTime") LocalTime endTime);

    // Find shifts that are currently active (current time falls within shift)
    @Query("SELECT s FROM ShiftType s WHERE " +
            "CURRENT_TIME BETWEEN s.startTime AND s.endTime")
    List<ShiftType> findCurrentActiveShifts();

    // Find night shifts (shifts that cross midnight)
    @Query("SELECT s FROM ShiftType s WHERE s.startTime > s.endTime")
    List<ShiftType> findNightShifts();

    // Search shifts by name pattern
    List<ShiftType> findByNameContainingIgnoreCase(String namePattern);

    // Get all shifts ordered by start time
    List<ShiftType> findAllByOrderByStartTimeAsc();

    // Count total number of shifts
    @Query("SELECT COUNT(s) FROM ShiftType s")
    long countAllShifts();
}