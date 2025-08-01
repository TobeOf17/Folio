package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer> {

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

    // Custom search query for units
    @Query("SELECT u FROM Unit u WHERE " +
            "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Unit> searchUnits(@Param("name") String name);

    // Find units with staff count (useful for reporting)
    @Query("SELECT u, COUNT(s) FROM Unit u LEFT JOIN Staff s ON s.unit = u GROUP BY u")
    List<Object[]> findUnitsWithStaffCount();

    // Find units that have staff
    @Query("SELECT DISTINCT u FROM Unit u JOIN Staff s ON s.unit = u")
    List<Unit> findUnitsWithStaff();

    // Find units that have no staff
    @Query("SELECT u FROM Unit u WHERE u NOT IN (SELECT DISTINCT s.unit FROM Staff s WHERE s.unit IS NOT NULL)")
    List<Unit> findUnitsWithoutStaff();

    // Find units that have shifts assigned
    @Query("SELECT DISTINCT u FROM Unit u JOIN Shift sh ON sh.unit = u")
    List<Unit> findUnitsWithShifts();

    // Find units without shifts
    @Query("SELECT u FROM Unit u WHERE u NOT IN (SELECT DISTINCT sh.unit FROM Shift sh WHERE sh.unit IS NOT NULL)")
    List<Unit> findUnitsWithoutShifts();

    // Get unit names only (for dropdowns)
    @Query("SELECT u.name FROM Unit u ORDER BY u.name ASC")
    List<String> findAllUnitNames();
}