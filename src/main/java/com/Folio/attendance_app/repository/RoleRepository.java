package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    // Find role by name
    Optional<Role> findByName(String name);

    // Find role by name (case insensitive)
    Optional<Role> findByNameIgnoreCase(String name);

    // Check if role name exists
    boolean existsByName(String name);

    // Check if role name exists (case insensitive)
    boolean existsByNameIgnoreCase(String name);

    // Find roles by name pattern (case insensitive)
    List<Role> findByNameContainingIgnoreCase(String namePattern);

    // Find roles that start with specific text
    List<Role> findByNameStartingWithIgnoreCase(String prefix);

    // Find roles that end with specific text
    List<Role> findByNameEndingWithIgnoreCase(String suffix);

    // Get all roles ordered by name
    List<Role> findAllByOrderByNameAsc();

    // Get all roles ordered by name descending
    List<Role> findAllByOrderByNameDesc();

    // Count total roles
    @Query("SELECT COUNT(r) FROM Role r")
    long countAllRoles();

    // Find roles by multiple names
    List<Role> findByNameIn(List<String> names);

    // Custom search query for roles
    @Query("SELECT r FROM Role r WHERE " +
            "(:name IS NULL OR LOWER(r.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Role> searchRoles(@Param("name") String name);

    // Find roles with staff count (useful for reporting)
    @Query("SELECT r, COUNT(s) FROM Role r LEFT JOIN Staff s ON s.role = r GROUP BY r")
    List<Object[]> findRolesWithStaffCount();

    // Find roles that have staff
    @Query("SELECT DISTINCT r FROM Role r JOIN Staff s ON s.role = r")
    List<Role> findRolesWithStaff();

    // Find roles that have no staff
    @Query("SELECT r FROM Role r WHERE r NOT IN (SELECT DISTINCT s.role FROM Staff s WHERE s.role IS NOT NULL)")
    List<Role> findRolesWithoutStaff();

    // Get role names only (for dropdowns)
    @Query("SELECT r.name FROM Role r ORDER BY r.name ASC")
    List<String> findAllRoleNames();

    // Find admin roles (useful for permission checking)
    @Query("SELECT r FROM Role r WHERE LOWER(r.name) LIKE '%admin%' OR LOWER(r.name) LIKE '%manager%'")
    List<Role> findAdminRoles();

    // Find employee roles (non-admin)
    @Query("SELECT r FROM Role r WHERE LOWER(r.name) NOT LIKE '%admin%' AND LOWER(r.name) NOT LIKE '%manager%'")
    List<Role> findEmployeeRoles();

    // Count staff by role
    @Query("SELECT COUNT(s) FROM Staff s WHERE s.role = :role")
    long countStaffByRole(@Param("role") Role role);

    // Find most common roles (by staff count)
    @Query("SELECT r, COUNT(s) as staffCount FROM Role r LEFT JOIN Staff s ON s.role = r " +
            "GROUP BY r ORDER BY staffCount DESC")
    List<Object[]> findRolesByPopularity();

    // Find roles with specific staff count
    @Query("SELECT r FROM Role r WHERE " +
            "(SELECT COUNT(s) FROM Staff s WHERE s.role = r) = :staffCount")
    List<Role> findRolesWithExactStaffCount(@Param("staffCount") long staffCount);

    // Find roles with staff count greater than
    @Query("SELECT r FROM Role r WHERE " +
            "(SELECT COUNT(s) FROM Staff s WHERE s.role = r) > :minStaffCount")
    List<Role> findRolesWithMinStaffCount(@Param("minStaffCount") long minStaffCount);
}