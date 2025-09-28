package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {

    // Find unit by name
    Optional<Unit> findByName(String name);

    // Find unit by name (case-insensitive)
    Optional<Unit> findByNameIgnoreCase(String name);

    // Check if unit name exists
    boolean existsByName(String name);

    // Check if unit name exists (case insensitive)
    boolean existsByNameIgnoreCase(String name);

    // Find units by name pattern (case insensitive)
    List<Unit> findByNameContainingIgnoreCase(String namePattern);

    // Find units that start with specific text
    List<Unit> findByNameStartingWithIgnoreCase(String prefix);

    // Find units that end with specific text
    List<Unit> findByNameEndingWithIgnoreCase(String suffix);

    // Get all units ordered by name
    List<Unit> findAllByOrderByNameAsc();

    // Get all units ordered by name descending
    List<Unit> findAllByOrderByNameDesc();

    // Count total units
    @Query("SELECT COUNT(u) FROM Unit u")
    long countAllUnits();

    // Find units by multiple names
    List<Unit> findByNameIn(List<String> names);


}