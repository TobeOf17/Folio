package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.model.AttendanceLog;
import com.Folio.attendance_app.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(HttpSession session) {
        try {
            Integer staffId = getStaffIdFromSession(session);
            AttendanceLog log = attendanceService.signIn(staffId);

            return ResponseEntity.ok(Map.of(
                    "message", "Signed in successfully",
                    "attendanceLog", log
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(HttpSession session) {
        try {
            Integer staffId = getStaffIdFromSession(session);
            AttendanceLog log = attendanceService.signOut(staffId);

            return ResponseEntity.ok(Map.of(
                    "message", "Signed out successfully",
                    "attendanceLog", log
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/my-records")
    public ResponseEntity<?> getMyAttendanceRecords(HttpSession session) {
        try {
            Integer staffId = getStaffIdFromSession(session);
            List<AttendanceLog> records = attendanceService.getStaffAttendance(staffId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/staff/{staffId}")
    public ResponseEntity<?> getStaffAttendance(@PathVariable Integer staffId, HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            List<AttendanceLog> records = attendanceService.getStaffAttendance(staffId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/summary/{staffId}")
    public ResponseEntity<?> getAttendanceSummary(
            @PathVariable Integer staffId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            HttpSession session) {
        try {
            Integer currentStaffId = getStaffIdFromSession(session);

            // Staff can view their own summary, admins/managers can view anyone's
            if (!currentStaffId.equals(staffId) && !isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. You can only view your own summary."));
            }

            AttendanceService.AttendanceSummary summary = attendanceService.getAttendanceSummary(staffId, startDate, endDate);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // Utility methods
    private Integer getStaffIdFromSession(HttpSession session) {
        Integer staffId = (Integer) session.getAttribute("staffId");
        if (staffId == null) {
            throw new RuntimeException("Please login first");
        }
        return staffId;
    }

    private boolean isAuthorized(HttpSession session) {
        String currentRole = (String) session.getAttribute("staffRole");
        return currentRole != null && (currentRole.contains("ADMIN") || currentRole.contains("MANAGER"));
    }
}