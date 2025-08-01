package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UnitRepository unitRepository;

    // ==================== STAFF OPERATIONS ====================

    /**
     * Create a new staff member with validation
     */
    public Staff createStaff(Staff staff) {
        validateStaffUniqueness(staff);
        return staffRepository.save(staff);
    }

    /**
     * Update staff with validation
     */
    public Staff updateStaff(Integer id, Staff updatedStaff) {
        Staff existingStaff = getStaffById(id);
        validateStaffUniquenessForUpdate(id, updatedStaff);

        // Update fields
        existingStaff.setFullName(updatedStaff.getFullName());
        existingStaff.setEmail(updatedStaff.getEmail());
        existingStaff.setEmployeeId(updatedStaff.getEmployeeId());
        existingStaff.setPhone(updatedStaff.getPhone());
        existingStaff.setDob(updatedStaff.getDob());
        existingStaff.setGender(updatedStaff.getGender());
        existingStaff.setRole(updatedStaff.getRole());
        existingStaff.setUnit(updatedStaff.getUnit());
        existingStaff.setPassportPath(updatedStaff.getPassportPath());

        return staffRepository.save(existingStaff);
    }

    public Staff getStaffById(Integer id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));
    }

    public Staff getStaffByEmail(String email) {
        return staffRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Staff not found with email: " + email));
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public List<Staff> searchStaffByName(String name) {
        return staffRepository.findByFullNameContainingIgnoreCase(name);
    }

    public List<Staff> getStaffByUnit(Unit unit) {
        return staffRepository.findByUnit(unit);
    }

    public List<Staff> getStaffByRole(Role role) {
        return staffRepository.findByRole(role);
    }

    public void deleteStaff(Integer id) {
        Staff staff = getStaffById(id);
        staffRepository.delete(staff);
    }

    // ==================== ROLE OPERATIONS ====================

    /**
     * Create role with validation
     */
    public Role createRole(Role role) {
        if (roleRepository.findByName(role.getName()).isPresent()) {
            throw new RuntimeException("Role with name '" + role.getName() + "' already exists");
        }
        return roleRepository.save(role);
    }

    public Role getRoleById(Integer id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
    }

    public Role getRoleByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role not found with name: " + name));
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role updateRole(Integer id, Role updatedRole) {
        Role existingRole = getRoleById(id);

        // Check name uniqueness if changing
        if (!existingRole.getName().equals(updatedRole.getName())) {
            Optional<Role> roleWithName = roleRepository.findByName(updatedRole.getName());
            if (roleWithName.isPresent() && roleWithName.get().getRoleId() != id) {
                throw new RuntimeException("Role with name '" + updatedRole.getName() + "' already exists");
            }
        }

        existingRole.setName(updatedRole.getName());
        return roleRepository.save(existingRole);
    }

    public void deleteRole(Integer id) {
        Role role = getRoleById(id);

        // Check if role is in use
        long staffCount = roleRepository.countStaffByRole(role);
        if (staffCount > 0) {
            throw new RuntimeException("Cannot delete role '" + role.getName() +
                    "' because it is assigned to " + staffCount + " staff member(s)");
        }

        roleRepository.delete(role);
    }

    // ==================== UNIT OPERATIONS ====================

    /**
     * Create unit with validation
     */
    public Unit createUnit(Unit unit) {
        if (unitRepository.findByName(unit.getName()).isPresent()) {
            throw new RuntimeException("Unit with name '" + unit.getName() + "' already exists");
        }
        return unitRepository.save(unit);
    }

    public Unit getUnitById(Integer id) {
        return unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found with id: " + id));
    }

    public Unit getUnitByName(String name) {
        return unitRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Unit not found with name: " + name));
    }

    public List<Unit> getAllUnits() {
        return unitRepository.findAll();
    }

    public Unit updateUnit(Integer id, Unit updatedUnit) {
        Unit existingUnit = getUnitById(id);

        // Check name uniqueness if changing
        if (!existingUnit.getName().equals(updatedUnit.getName())) {
            Optional<Unit> unitWithName = unitRepository.findByName(updatedUnit.getName());
            if (unitWithName.isPresent() && unitWithName.get().getUnitId() != id) {
                throw new RuntimeException("Unit with name '" + updatedUnit.getName() + "' already exists");
            }
        }

        existingUnit.setName(updatedUnit.getName());
        return unitRepository.save(existingUnit);
    }

    public void deleteUnit(Integer id) {
        Unit unit = getUnitById(id);

        // Check if unit is in use (simplified check)
        List<Staff> staffInUnit = staffRepository.findByUnit(unit);
        if (!staffInUnit.isEmpty()) {
            throw new RuntimeException("Cannot delete unit '" + unit.getName() +
                    "' because it has " + staffInUnit.size() + " staff member(s)");
        }

        unitRepository.delete(unit);
    }

    public List<Unit> searchUnitsByName(String name) {
        return unitRepository.findByNameContainingIgnoreCase(name);
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Get dashboard statistics
     */
    public DashboardStats getDashboardStats() {
        long totalStaff = staffRepository.count();
        long totalRoles = roleRepository.count();
        long totalUnits = unitRepository.count();

        return new DashboardStats(totalStaff, totalRoles, totalUnits);
    }

    // ==================== PRIVATE VALIDATION METHODS ====================

    private void validateStaffUniqueness(Staff staff) {
        if (staffRepository.findByEmail(staff.getEmail()).isPresent()) {
            throw new RuntimeException("Staff with email " + staff.getEmail() + " already exists");
        }
        if (staffRepository.findByEmployeeId(staff.getEmployeeId()).isPresent()) {
            throw new RuntimeException("Staff with employee ID " + staff.getEmployeeId() + " already exists");
        }
        if (staffRepository.findByPhone(staff.getPhone()).isPresent()) {
            throw new RuntimeException("Staff with phone " + staff.getPhone() + " already exists");
        }
    }

    private void validateStaffUniquenessForUpdate(Integer id, Staff staff) {
        Optional<Staff> emailConflict = staffRepository.findByEmail(staff.getEmail());
        if (emailConflict.isPresent() && emailConflict.get().getStaffId() != id) {
            throw new RuntimeException("Staff with email " + staff.getEmail() + " already exists");
        }

        Optional<Staff> employeeIdConflict = staffRepository.findByEmployeeId(staff.getEmployeeId());
        if (employeeIdConflict.isPresent() && employeeIdConflict.get().getStaffId() != id) {
            throw new RuntimeException("Staff with employee ID " + staff.getEmployeeId() + " already exists");
        }

        Optional<Staff> phoneConflict = staffRepository.findByPhone(staff.getPhone());
        if (phoneConflict.isPresent() && phoneConflict.get().getStaffId() != id) {
            throw new RuntimeException("Staff with phone " + staff.getPhone() + " already exists");
        }
    }

    // ==================== INNER CLASSES ====================

    public static class DashboardStats {
        private long totalStaff;
        private long totalRoles;
        private long totalUnits;

        public DashboardStats(long totalStaff, long totalRoles, long totalUnits) {
            this.totalStaff = totalStaff;
            this.totalRoles = totalRoles;
            this.totalUnits = totalUnits;
        }

        // Getters
        public long getTotalStaff() { return totalStaff; }
        public long getTotalRoles() { return totalRoles; }
        public long getTotalUnits() { return totalUnits; }
    }
}