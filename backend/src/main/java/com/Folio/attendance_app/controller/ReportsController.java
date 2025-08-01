package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.service.AttendanceService;
import com.Folio.attendance_app.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportsController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private UserManagementService userManagementService;

    /**
     * Generate attendance report for a specific date range
     */
    @GetMapping("/attendance")
    public ResponseEntity<?> getAttendanceReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Integer unitId,
            @RequestParam(required = false) Integer roleId,
            HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            List<AttendanceLog> allLogs = attendanceService.getAttendanceBetweenDates(startDate, endDate);

            // Filter by unit if specified
            if (unitId != null) {
                Unit unit = userManagementService.getUnitById(unitId);
                allLogs = allLogs.stream()
                        .filter(log -> Objects.equals(log.getStaff().getUnit().getUnitId(), unitId))
                        .collect(Collectors.toList());
            }

// Filter by role if specified
            if (roleId != null) {
                Role role = userManagementService.getRoleById(roleId);
                allLogs = allLogs.stream()
                        .filter(log -> Objects.equals(log.getStaff().getRole().getRoleId(), roleId))
                        .collect(Collectors.toList());
            }

            // Calculate summary statistics
            long totalRecords = allLogs.size();
            long onTimeCount = allLogs.stream()
                    .filter(log -> log.getStatus() == AttendanceStatus.ON_TIME)
                    .count();
            long lateCount = allLogs.stream()
                    .filter(log -> log.getStatus() == AttendanceStatus.LATE)
                    .count();
            long absentCount = allLogs.stream()
                    .filter(log -> log.getStatus() == AttendanceStatus.ABSENT)
                    .count();
            long earlySignOutCount = allLogs.stream()
                    .filter(log -> log.getStatus() == AttendanceStatus.EARLY_SIGN_OUT)
                    .count();

            return ResponseEntity.ok(Map.of(
                    "dateRange", Map.of(
                            "startDate", startDate,
                            "endDate", endDate
                    ),
                    "summary", Map.of(
                            "totalRecords", totalRecords,
                            "onTime", onTimeCount,
                            "late", lateCount,
                            "absent", absentCount,
                            "earlySignOut", earlySignOutCount
                    ),
                    "details", allLogs
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Generate individual staff attendance summary
     */
    @GetMapping("/staff-summary/{staffId}")
    public ResponseEntity<?> getStaffAttendanceSummary(
            @PathVariable Integer staffId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            HttpSession session) {
        try {
            Integer currentStaffId = (Integer) session.getAttribute("staffId");

            if (currentStaffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Please login first"));
            }

            // Staff can view their own summary, admins/managers can view anyone's
            if (!currentStaffId.equals(staffId) && !isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. You can only view your own summary."));
            }

            AttendanceService.AttendanceSummary summary = attendanceService.getAttendanceSummary(staffId, startDate, endDate);
            List<AttendanceLog> detailedRecords = attendanceService.getStaffAttendance(staffId).stream()
                    .filter(log -> !log.getDate().isBefore(startDate) && !log.getDate().isAfter(endDate))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(Map.of(
                    "summary", summary,
                    "detailedRecords", detailedRecords
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Generate unit-wise attendance report
     */
    @GetMapping("/unit-summary")
    public ResponseEntity<?> getUnitAttendanceSummary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            List<Unit> allUnits = userManagementService.getAllUnits();
            List<UnitAttendanceSummary> unitSummaries = new java.util.ArrayList<>();

            for (Unit unit : allUnits) {
                List<Staff> unitStaff = userManagementService.getStaffByUnit(unit);

                long totalStaffInUnit = unitStaff.size();
                long totalAttendanceRecords = 0;
                long totalOnTime = 0;
                long totalLate = 0;
                long totalAbsent = 0;

                for (Staff staff : unitStaff) {
                    AttendanceService.AttendanceSummary staffSummary =
                            attendanceService.getAttendanceSummary(staff.getStaffId(), startDate, endDate);

                    totalAttendanceRecords += staffSummary.getTotalRecords();
                    totalOnTime += staffSummary.getOnTimeDays();
                    totalLate += staffSummary.getLateDays();
                    totalAbsent += staffSummary.getAbsentDays();
                }

                unitSummaries.add(new UnitAttendanceSummary(
                        unit.getName(),
                        totalStaffInUnit,
                        totalAttendanceRecords,
                        totalOnTime,
                        totalLate,
                        totalAbsent
                ));
            }

            return ResponseEntity.ok(Map.of(
                    "dateRange", Map.of(
                            "startDate", startDate,
                            "endDate", endDate
                    ),
                    "unitSummaries", unitSummaries
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Generate monthly attendance report
     */
    @GetMapping("/monthly")
    public ResponseEntity<?> getMonthlyAttendanceReport(
            @RequestParam int year,
            @RequestParam int month,
            HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            LocalDate startDate = LocalDate.of(year, month, 1);
            LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

            List<AttendanceLog> monthlyLogs = attendanceService.getAttendanceBetweenDates(startDate, endDate);

            // Group by date for daily summary
            Map<LocalDate, List<AttendanceLog>> dailyGrouping = monthlyLogs.stream()
                    .collect(Collectors.groupingBy(AttendanceLog::getDate));

            List<DailySummary> dailySummaries = new java.util.ArrayList<>();

            for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                List<AttendanceLog> dayLogs = dailyGrouping.getOrDefault(date, new java.util.ArrayList<>());

                long onTime = dayLogs.stream().filter(log -> log.getStatus() == AttendanceStatus.ON_TIME).count();
                long late = dayLogs.stream().filter(log -> log.getStatus() == AttendanceStatus.LATE).count();
                long absent = dayLogs.stream().filter(log -> log.getStatus() == AttendanceStatus.ABSENT).count();

                dailySummaries.add(new DailySummary(date, dayLogs.size(), onTime, late, absent));
            }

            return ResponseEntity.ok(Map.of(
                    "month", month,
                    "year", year,
                    "totalRecords", monthlyLogs.size(),
                    "dailySummaries", dailySummaries
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Get frequent late comers report
     */
    @GetMapping("/late-comers")
    public ResponseEntity<?> getLateComerReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "5") int minLateDays,
            HttpSession session) {
        try {
            if (!isAuthorized(session)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Access denied. Admin/Manager privileges required."));
            }

            List<Staff> allStaff = userManagementService.getAllStaff();
            List<LateComersReport> lateComers = new java.util.ArrayList<>();

            for (Staff staff : allStaff) {
                AttendanceService.AttendanceSummary summary =
                        attendanceService.getAttendanceSummary(staff.getStaffId(), startDate, endDate);

                if (summary.getLateDays() >= minLateDays) {
                    lateComers.add(new LateComersReport(
                            staff.getFullName(),
                            staff.getEmployeeId(),
                            staff.getUnit().getName(),
                            staff.getRole().getName(),
                            summary.getLateDays(),
                            summary.getTotalRecords()
                    ));
                }
            }

            // Sort by late days descending
            lateComers.sort((a, b) -> Long.compare(b.getLateDays(), a.getLateDays()));

            return ResponseEntity.ok(Map.of(
                    "dateRange", Map.of(
                            "startDate", startDate,
                            "endDate", endDate
                    ),
                    "minLateDays", minLateDays,
                    "lateComers", lateComers
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
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

    // ==================== RESPONSE CLASSES ====================

    public static class UnitAttendanceSummary {
        private String unitName;
        private long totalStaff;
        private long totalRecords;
        private long onTimeDays;
        private long lateDays;
        private long absentDays;

        public UnitAttendanceSummary(String unitName, long totalStaff, long totalRecords,
                                     long onTimeDays, long lateDays, long absentDays) {
            this.unitName = unitName;
            this.totalStaff = totalStaff;
            this.totalRecords = totalRecords;
            this.onTimeDays = onTimeDays;
            this.lateDays = lateDays;
            this.absentDays = absentDays;
        }

        // Getters
        public String getUnitName() { return unitName; }
        public long getTotalStaff() { return totalStaff; }
        public long getTotalRecords() { return totalRecords; }
        public long getOnTimeDays() { return onTimeDays; }
        public long getLateDays() { return lateDays; }
        public long getAbsentDays() { return absentDays; }
    }

    public static class DailySummary {
        private LocalDate date;
        private long totalRecords;
        private long onTime;
        private long late;
        private long absent;

        public DailySummary(LocalDate date, long totalRecords, long onTime, long late, long absent) {
            this.date = date;
            this.totalRecords = totalRecords;
            this.onTime = onTime;
            this.late = late;
            this.absent = absent;
        }

        // Getters
        public LocalDate getDate() { return date; }
        public long getTotalRecords() { return totalRecords; }
        public long getOnTime() { return onTime; }
        public long getLate() { return late; }
        public long getAbsent() { return absent; }
    }

    public static class LateComersReport {
        private String staffName;
        private String employeeId;
        private String unitName;
        private String roleName;
        private long lateDays;
        private long totalRecords;

        public LateComersReport(String staffName, String employeeId, String unitName,
                                String roleName, long lateDays, long totalRecords) {
            this.staffName = staffName;
            this.employeeId = employeeId;
            this.unitName = unitName;
            this.roleName = roleName;
            this.lateDays = lateDays;
            this.totalRecords = totalRecords;
        }

        // Getters
        public String getStaffName() { return staffName; }
        public String getEmployeeId() { return employeeId; }
        public String getUnitName() { return unitName; }
        public String getRoleName() { return roleName; }
        public long getLateDays() { return lateDays; }
        public long getTotalRecords() { return totalRecords; }
    }
}