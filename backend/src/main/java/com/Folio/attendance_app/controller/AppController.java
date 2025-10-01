package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.constants.SessionConstants;
import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.repository.ShiftRequestRepository;
import com.Folio.attendance_app.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AppController {

    @Autowired private AttendanceService attendanceService;
    @Autowired private StaffService staffService;
    @Autowired private RoleService roleService;
    @Autowired private UnitService unitService;
    @Autowired private SessionService sessionService;

    // ==================== ATTENDANCE ====================
    
    @PostMapping("/attendance/sign-in")
    public ResponseEntity<?> signIn(HttpSession session) {
        try {
            Long staffId = getStaffId(session);
            attendanceService.signIn(staffId);
            return ResponseEntity.ok(Map.of("message", "Signed in successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/attendance/sign-out")
    public ResponseEntity<?> signOut(HttpSession session) {
        try {
            Long staffId = getStaffId(session);
            attendanceService.signOut(staffId);
            return ResponseEntity.ok(Map.of("message", "Signed out successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/attendance/my-records")
    public ResponseEntity<?> getMyAttendance(HttpSession session) {
        try {
            Long staffId = getStaffId(session);
            List<AttendanceLog> records = attendanceService.getStaffAttendance(staffId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/attendance/summary")
    public ResponseEntity<?> getMyAttendanceSummary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            HttpSession session) {
        try {
            Long staffId = getStaffId(session);
            AttendanceService.AttendanceSummary summary = 
                attendanceService.getAttendanceSummary(staffId, startDate, endDate);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== ADMIN FUNCTIONS ====================

    @GetMapping("/admin/dashboard")
    public ResponseEntity<?> getDashboard(HttpSession session) {
        try {
            if (!isAdmin(session)) return forbidden();
            
            long totalStaff = staffService.getStaffCount();
            long totalRoles = roleService.getRoleCount();
            long totalUnits = unitService.getUnitCount();
            
            return ResponseEntity.ok(Map.of(
                "totalStaff", totalStaff,
                "totalRoles", totalRoles,
                "totalUnits", totalUnits
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/admin/staff")
    public ResponseEntity<?> getAllStaff(HttpSession session) {
        if (!isAdmin(session)) return forbidden();
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @PostMapping("/admin/staff")
    public ResponseEntity<?> createStaff(@Valid @RequestBody Staff staff, HttpSession session) {
        try {
            if (!isAdmin(session)) return forbidden();
            staffService.createStaff(staff);
            return ResponseEntity.ok(Map.of("message", "Staff created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/admin/roles")
    public ResponseEntity<?> getAllRoles(HttpSession session) {
        if (!isAdmin(session)) return forbidden();
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @PostMapping("/admin/roles")
    public ResponseEntity<?> createRole(@Valid @RequestBody Role role, HttpSession session) {
        try {
            if (!isAdmin(session)) return forbidden();
            roleService.createRole(role);
            return ResponseEntity.ok(Map.of("message", "Role created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/admin/units")
    public ResponseEntity<?> getAllUnits(HttpSession session) {
        if (!isAdmin(session)) return forbidden();
        return ResponseEntity.ok(unitService.getAllUnits());
    }

    @PostMapping("/admin/units")
    public ResponseEntity<?> createUnit(@Valid @RequestBody Unit unit, HttpSession session) {
        try {
            if (!isAdmin(session)) return forbidden();
            unitService.createUnit(unit);
            return ResponseEntity.ok(Map.of("message", "Unit created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/admin/attendance-report")
    public ResponseEntity<?> getAttendanceReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            HttpSession session) {
        try {
            if (!isAdmin(session)) return forbidden();
            List<AttendanceLog> logs = attendanceService.getAttendanceBetweenDates(startDate, endDate);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/staff/count")
    public ResponseEntity<?> getStaffCount(HttpSession session) {
        try {
            getStaffId(session); // Verify user is logged in
            return ResponseEntity.ok(staffService.getStaffCount());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/attendance/date/{date}")
    public ResponseEntity<?> getAttendanceByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            HttpSession session) {
        try {
            if (!isAdmin(session)) return forbidden();
            List<AttendanceLog> logs = attendanceService.getAttendanceByDate(date);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Autowired 
private ShiftRequestRepository shiftRequestRepository;

@GetMapping("/shift-requests/pending")
public ResponseEntity<?> getPendingShiftRequests(HttpSession session) {
    try {
        Long staffId = getStaffId(session);
        Staff staff = staffService.getStaffById(staffId);
        
        List<ShiftRequest> pendingRequests = shiftRequestRepository
            .findByRequestedWithAndStatus(staff, ShiftRequestStatus.PENDING);
        
        return ResponseEntity.ok(pendingRequests);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
}

@PostMapping("/shift-requests/{requestId}/approve")
public ResponseEntity<?> approveShiftRequest(
        @PathVariable Long requestId,
        HttpSession session) {
    try {
        Long staffId = getStaffId(session);
        Staff currentStaff = staffService.getStaffById(staffId);
        
        ShiftRequest request = shiftRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Shift request not found"));
        
        if (!request.getRequestedWith().getStaffId().equals(currentStaff.getStaffId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", "You can only approve requests made to you"));
        }
        
        request.setStatus(ShiftRequestStatus.APPROVED);
        shiftRequestRepository.save(request);
        
        return ResponseEntity.ok(Map.of("message", "Shift request approved successfully"));
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
}

    @PostMapping("/shift-requests/{requestId}/decline")
    public ResponseEntity<?> declineShiftRequest(
            @PathVariable Long requestId,
            HttpSession session) {
        try {
            Long staffId = getStaffId(session);
            Staff currentStaff = staffService.getStaffById(staffId);
            
            ShiftRequest request = shiftRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Shift request not found"));
            
            if (!request.getRequestedWith().getStaffId().equals(currentStaff.getStaffId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "You can only decline requests made to you"));
            }
            
            request.setStatus(ShiftRequestStatus.DECLINED);
            shiftRequestRepository.save(request);
            
            return ResponseEntity.ok(Map.of("message", "Shift request declined"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== UTILITY METHODS ====================
    
    private Long getStaffId(HttpSession session) {
        Long staffId = (Long) session.getAttribute(SessionConstants.STAFF_ID);
        if (staffId == null) {
            throw new RuntimeException("Please login first");
        }
        return staffId;
    }

    private boolean isAdmin(HttpSession session) {
        return sessionService.isAdmin(session);
    }

    private ResponseEntity<?> forbidden() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(Map.of("message", "Admin access required"));
    }
}