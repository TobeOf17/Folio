package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    @Autowired
    private UserManagementService userManagementService;

    /**
     * Get all staff (admin/manager only)
     */
    @GetMapping
    public ResponseEntity<?> getAllStaff(HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            List<Staff> staff = userManagementService.getAllStaff();
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get staff by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable Integer id, HttpSession session) {
        try {
            Integer currentStaffId = (Integer) session.getAttribute("staffId");

            if (currentStaffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Please login first"));
            }

            // Staff can view their own profile, admins/managers can view anyone's
            if (!currentStaffId.equals(id) && !isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. You can only view your own profile."));
            }

            Staff staff = userManagementService.getStaffById(id);
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Create new staff (admin only)
     */
    @PostMapping
    public ResponseEntity<?> createStaff(@Valid @RequestBody Staff staff, HttpSession session) {
        try {
            // Check if current user is admin
            String currentRole = (String) session.getAttribute("staffRole");
            if (currentRole == null || !currentRole.toLowerCase().contains("admin")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin privileges required."));
            }

            Staff createdStaff = userManagementService.createStaff(staff);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStaff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Update staff
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Integer id, @Valid @RequestBody Staff staff, HttpSession session) {
        try {
            Integer currentStaffId = (Integer) session.getAttribute("staffId");

            if (currentStaffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Please login first"));
            }

            // Staff can update their own profile (limited fields), admins can update anyone's
            if (!currentStaffId.equals(id) && !isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. You can only update your own profile."));
            }

            // If not admin, restrict what fields can be updated
            if (!isAdmin(session) && currentStaffId.equals(id)) {
                // For self-update, allow only certain fields
                Staff existingStaff = userManagementService.getStaffById(id);
                staff.setRole(existingStaff.getRole()); // Can't change own role
                staff.setUnit(existingStaff.getUnit()); // Can't change own unit
                staff.setEmployeeId(existingStaff.getEmployeeId()); // Can't change employee ID
            }

            Staff updatedStaff = userManagementService.updateStaff(id, staff);
            return ResponseEntity.ok(updatedStaff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Delete staff (admin only)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Integer id, HttpSession session) {
        try {
            // Check if current user is admin
            if (!isAdmin(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin privileges required."));
            }

            userManagementService.deleteStaff(id);
            return ResponseEntity.ok(Map.of("message", "Staff deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Search staff by name (admin/manager only)
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchStaffByName(@RequestParam String name, HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            List<Staff> staff = userManagementService.searchStaffByName(name);
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get staff by unit (admin/manager only)
     */
    @GetMapping("/unit/{unitId}")
    public ResponseEntity<?> getStaffByUnit(@PathVariable Integer unitId, HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            Unit unit = userManagementService.getUnitById(unitId);
            List<Staff> staff = userManagementService.getStaffByUnit(unit);
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get staff by role (admin/manager only)
     */
    @GetMapping("/role/{roleId}")
    public ResponseEntity<?> getStaffByRole(@PathVariable Integer roleId, HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            Role role = userManagementService.getRoleById(roleId);
            List<Staff> staff = userManagementService.getStaffByRole(role);
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get my profile
     */
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(HttpSession session) {
        try {
            Integer staffId = (Integer) session.getAttribute("staffId");

            if (staffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Please login first"));
            }

            Staff staff = userManagementService.getStaffById(staffId);
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Update my profile (limited fields)
     */
    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(@RequestBody UpdateProfileRequest request, HttpSession session) {
        try {
            Integer staffId = (Integer) session.getAttribute("staffId");

            if (staffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Please login first"));
            }

            // Get existing staff and update only allowed fields
            Staff existingStaff = userManagementService.getStaffById(staffId);

            // Update only personal information, not role/unit/employeeId
            existingStaff.setFullName(request.getFullName());
            existingStaff.setEmail(request.getEmail());
            existingStaff.setPhone(request.getPhone());
            existingStaff.setDob(request.getDob());
            existingStaff.setGender(request.getGender());

            if (request.getPassportPath() != null) {
                existingStaff.setPassportPath(request.getPassportPath());
            }

            Staff updatedStaff = userManagementService.updateStaff(staffId, existingStaff);
            return ResponseEntity.ok(updatedStaff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Check if current user is authorized (admin or manager)
     */
    private boolean isAuthorized(HttpSession session) {
        String currentRole = (String) session.getAttribute("staffRole");
        return currentRole != null && (currentRole.toLowerCase().contains("admin") || currentRole.toLowerCase().contains("manager"));
    }

    /**
     * Check if current user is admin
     */
    private boolean isAdmin(HttpSession session) {
        String currentRole = (String) session.getAttribute("staffRole");
        return currentRole != null && currentRole.toLowerCase().contains("admin");
    }

    // ==================== REQUEST CLASSES ====================

    public static class UpdateProfileRequest {
        private String fullName;
        private String email;
        private String phone;
        private java.time.LocalDate dob;
        private Gender gender;
        private String passportPath;

        // Constructors
        public UpdateProfileRequest() {}

        // Getters and Setters
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public java.time.LocalDate getDob() { return dob; }
        public void setDob(java.time.LocalDate dob) { this.dob = dob; }

        public Gender getGender() { return gender; }
        public void setGender(Gender gender) { this.gender = gender; }

        public String getPassportPath() { return passportPath; }
        public void setPassportPath(String passportPath) { this.passportPath = passportPath; }
    }
}