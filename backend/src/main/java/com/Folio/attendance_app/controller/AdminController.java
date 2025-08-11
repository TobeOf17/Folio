package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.service.SessionService;
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
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private SessionService sessionService;
    @Autowired
    private UserManagementService userManagementService;

    // ==================== DASHBOARD ====================

    /**
     * Get dashboard statistics
     */

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            UserManagementService.DashboardStats stats = userManagementService.getDashboardStats();
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== ROLE MANAGEMENT ====================

    /**
     * Get all roles
     */
    @GetMapping("/roles")
    public ResponseEntity<?> getAllRoles(HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            List<Role> roles = userManagementService.getAllRoles();
            return ResponseEntity.ok(roles);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get role by ID
     */
    @GetMapping("/roles/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable Integer id, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            Role role = userManagementService.getRoleById(id);
            return ResponseEntity.ok(role);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Create new role
     */
    @PostMapping("/roles")
    public ResponseEntity<?> createRole(@Valid @RequestBody Role role, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            Role createdRole = userManagementService.createRole(role);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Update role
     */
    @PutMapping("/roles/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Integer id, @Valid @RequestBody Role role, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            Role updatedRole = userManagementService.updateRole(id, role);
            return ResponseEntity.ok(updatedRole);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Delete role
     */
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Integer id, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            userManagementService.deleteRole(id);
            return ResponseEntity.ok(Map.of("message", "Role deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== UNIT MANAGEMENT ====================

    /**
     * Get all units
     */
    @GetMapping("/units")
    public ResponseEntity<?> getAllUnits(HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            List<Unit> units = userManagementService.getAllUnits();
            return ResponseEntity.ok(units);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get unit by ID
     */
    @GetMapping("/units/{id}")
    public ResponseEntity<?> getUnitById(@PathVariable Integer id, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            Unit unit = userManagementService.getUnitById(id);
            return ResponseEntity.ok(unit);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Create new unit
     */
    @PostMapping("/units")
    public ResponseEntity<?> createUnit(@Valid @RequestBody Unit unit, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            Unit createdUnit = userManagementService.createUnit(unit);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUnit);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Update unit
     */
    @PutMapping("/units/{id}")
    public ResponseEntity<?> updateUnit(@PathVariable Integer id, @Valid @RequestBody Unit unit, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            Unit updatedUnit = userManagementService.updateUnit(id, unit);
            return ResponseEntity.ok(updatedUnit);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Delete unit
     */
    @DeleteMapping("/units/{id}")
    public ResponseEntity<?> deleteUnit(@PathVariable Integer id, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            userManagementService.deleteUnit(id);
            return ResponseEntity.ok(Map.of("message", "Unit deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Search units by name
     */
    @GetMapping("/units/search")
    public ResponseEntity<?> searchUnits(@RequestParam String name, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            List<Unit> units = userManagementService.searchUnitsByName(name);
            return ResponseEntity.ok(units);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== BULK OPERATIONS ====================

    /**
     * Bulk create staff
     */
    @PostMapping("/staff/bulk")
    public ResponseEntity<?> bulkCreateStaff(@RequestBody BulkStaffRequest request, HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            List<StaffCreationResult> results = new java.util.ArrayList<>();

            for (Staff staff : request.getStaffList()) {
                try {
                    Staff createdStaff = userManagementService.createStaff(staff);
                    results.add(new StaffCreationResult(true, "Success", createdStaff));
                } catch (Exception e) {
                    results.add(new StaffCreationResult(false, e.getMessage(), staff));
                }
            }

            return ResponseEntity.ok(Map.of(
                    "message", "Bulk operation completed",
                    "results", results
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get system statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getSystemStatistics(HttpSession session) {
        try {
            ResponseEntity<?> adminCheck = validateAdminAccess(session);
            if (adminCheck != null) return adminCheck;

            // Get basic stats
            UserManagementService.DashboardStats stats = userManagementService.getDashboardStats();

            // Get additional statistics
            List<Role> roles = userManagementService.getAllRoles();
            List<Unit> units = userManagementService.getAllUnits();
            List<Staff> allStaff = userManagementService.getAllStaff();

            // Calculate gender distribution
            long maleCount = allStaff.stream()
                    .filter(staff -> staff.getGender() == Gender.MALE)
                    .count();
            long femaleCount = allStaff.stream()
                    .filter(staff -> staff.getGender() == Gender.FEMALE)
                    .count();

            return ResponseEntity.ok(Map.of(
                    "totalStaff", stats.getTotalStaff(),
                    "totalRoles", stats.getTotalRoles(),
                    "totalUnits", stats.getTotalUnits(),
                    "genderDistribution", Map.of(
                            "male", maleCount,
                            "female", femaleCount
                    ),
                    "roles", roles,
                    "units", units
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Check if current user is admin
     */
    private boolean isAdmin(HttpSession session) {
        return sessionService.isAdmin(session);
    }

    private ResponseEntity<?> validateAdminAccess(HttpSession session) {
        if (!isAdmin(session)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Access denied. Admin privileges required."));
        }
        return null;
    }

    // ==================== REQUEST/RESPONSE CLASSES ====================

    public static class BulkStaffRequest {
        private List<Staff> staffList;

        public BulkStaffRequest() {}
        public BulkStaffRequest(List<Staff> staffList) {
            this.staffList = staffList;
        }

        public List<Staff> getStaffList() { return staffList; }
        public void setStaffList(List<Staff> staffList) { this.staffList = staffList; }
    }

    public static class StaffCreationResult {
        private boolean success;
        private String message;
        private Staff staff;

        public StaffCreationResult(boolean success, String message, Staff staff) {
            this.success = success;
            this.message = message;
            this.staff = staff;
        }

        // Getters
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Staff getStaff() { return staff; }
    }
}