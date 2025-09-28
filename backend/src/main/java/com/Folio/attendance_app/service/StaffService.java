package com.Folio.attendance_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Folio.attendance_app.model.Role;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.Unit;
import com.Folio.attendance_app.repository.StaffRepository;

@Service
public class StaffService {
    
    @Autowired
    private StaffRepository staffRepository;
    
    public Staff createStaff(Staff staff) {
        validateStaffUniqueness(staff);
        return staffRepository.save(staff);
    }

    public long getStaffCount() {
    return staffRepository.count();
}
    
    public Staff updateStaff(Long id, Staff updatedStaff) {
        Staff existingStaff = getStaffById(id);
        validateStaffUniquenessForUpdate(id, updatedStaff);

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

    public Staff getStaffById(Long id) {
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

    public void deleteStaff(Long id) {
        Staff staff = getStaffById(id);
        staffRepository.delete(staff);
    }

    // Private validation methods...
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

    private void validateStaffUniquenessForUpdate(Long id, Staff staff) {
        Optional<Staff> emailConflict = staffRepository.findByEmail(staff.getEmail());
        if (emailConflict.isPresent() && !emailConflict.get().getStaffId().equals(id)) {
            throw new RuntimeException("Staff with email " + staff.getEmail() + " already exists");
        }

        Optional<Staff> employeeIdConflict = staffRepository.findByEmployeeId(staff.getEmployeeId());
        if (employeeIdConflict.isPresent() && !employeeIdConflict.get().getStaffId().equals(id)) {
            throw new RuntimeException("Staff with employee ID " + staff.getEmployeeId() + " already exists");
        }

        Optional<Staff> phoneConflict = staffRepository.findByPhone(staff.getPhone());
        if (phoneConflict.isPresent() && !phoneConflict.get().getStaffId().equals(id)) {
            throw new RuntimeException("Staff with phone " + staff.getPhone() + " already exists");
        }
    }
}


