package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.Role;
import com.Folio.attendance_app.model.Unit;
import com.Folio.attendance_app.model.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    // Find staff by email
    Optional<Staff> findByEmail(String email);

    // Find staff by employee ID
    Optional<Staff> findByEmployeeId(String employeeId);

    // Find staff by full name (case-insensitive partial match)
    List<Staff> findByFullNameContainingIgnoreCase(String fullName);

    // Find staff by role
    List<Staff> findByRole(Role role);

    // Find staff by unit
    List<Staff> findByUnit(Unit unit);

    // Find staff by gender
    List<Staff> findByGender(Gender gender);

    // Find staff by role and unit
    List<Staff> findByRoleAndUnit(Role role, Unit unit);

    // Find staff by phone
    Optional<Staff> findByPhone(String phone);

    // Find staff ordered by full name
    List<Staff> findAllByOrderByFullNameAsc();

    // Find staff by unit ordered by full name
    List<Staff> findByUnitOrderByFullNameAsc(Unit unit);

    // Find staff by role ordered by full name
    List<Staff> findByRoleOrderByFullNameAsc(Role role);
}