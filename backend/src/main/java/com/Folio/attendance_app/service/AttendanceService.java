package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.AttendanceLog;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.AttendanceStatus;
import com.Folio.attendance_app.repository.AttendanceLogRepository;
import com.Folio.attendance_app.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceLogRepository attendanceLogRepository;

    @Autowired
    private StaffRepository staffRepository;

    /**
     * Sign in a staff member
     */
    public AttendanceLog signIn(Integer staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // Check if already signed in today
        Optional<AttendanceLog> existingLog = attendanceLogRepository
                .findByStaffAndDate(staff, today);

        if (existingLog.isPresent()) {
            throw new RuntimeException("Staff already signed in today");
        }

        // Determine status based on time (assuming 9 AM is start time)
        AttendanceStatus status = now.isAfter(LocalTime.of(9, 0)) ?
                AttendanceStatus.LATE : AttendanceStatus.ON_TIME;

        AttendanceLog log = new AttendanceLog(staff, today, now, null, status);
        return attendanceLogRepository.save(log);
    }

    /**
     * Sign out a staff member
     */
    public AttendanceLog signOut(Integer staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // Find today's attendance record
        AttendanceLog log = attendanceLogRepository.findByStaffAndDate(staff, today)
                .orElseThrow(() -> new RuntimeException("No sign-in record found for today"));

        if (log.getSignOutTime() != null) {
            throw new RuntimeException("Staff already signed out today");
        }

        log.setSignOutTime(now);
        return attendanceLogRepository.save(log);
    }

    /**
     * Get attendance records for a staff member
     */
    public List<AttendanceLog> getStaffAttendance(Integer staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        return attendanceLogRepository.findByStaffOrderByDateDesc(staff);
    }

    /**
     * Get attendance records for a specific date
     */
    public List<AttendanceLog> getAttendanceByDate(LocalDate date) {
        return attendanceLogRepository.findByDate(date);
    }

    /**
     * Get attendance records between dates
     */
    public List<AttendanceLog> getAttendanceBetweenDates(LocalDate startDate, LocalDate endDate) {
        return attendanceLogRepository.findByDateBetween(startDate, endDate);
    }

    /**
     * Get attendance summary for a staff member in a date range
     */
    public AttendanceSummary getAttendanceSummary(Integer staffId, LocalDate startDate, LocalDate endDate) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        List<AttendanceLog> logs = attendanceLogRepository
                .findByStaffAndDateBetween(staff, startDate, endDate);

        long onTimeDays = logs.stream()
                .filter(log -> log.getStatus() == AttendanceStatus.ON_TIME)
                .count();

        long lateDays = logs.stream()
                .filter(log -> log.getStatus() == AttendanceStatus.LATE)
                .count();

        long absentDays = logs.stream()
                .filter(log -> log.getStatus() == AttendanceStatus.ABSENT)
                .count();

        long earlySignOutDays = logs.stream()
                .filter(log -> log.getStatus() == AttendanceStatus.EARLY_SIGN_OUT)
                .count();

        return new AttendanceSummary(staff.getFullName(), onTimeDays, lateDays, absentDays, earlySignOutDays, logs.size());
    }

    /**
     * Mark staff as absent (for admin use)
     */
    public AttendanceLog markAbsent(Integer staffId, LocalDate date) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        // Check if record already exists
        Optional<AttendanceLog> existingLog = attendanceLogRepository.findByStaffAndDate(staff, date);
        if (existingLog.isPresent()) {
            throw new RuntimeException("Attendance record already exists for this date");
        }

        AttendanceLog log = new AttendanceLog(staff, date, null, null, AttendanceStatus.ABSENT);
        return attendanceLogRepository.save(log);
    }

    /**
     * Inner class for attendance summary
     */
    public static class AttendanceSummary {
        private String staffName;
        private long onTimeDays;
        private long lateDays;
        private long absentDays;
        private long earlySignOutDays;
        private long totalRecords;

        public AttendanceSummary(String staffName, long onTimeDays, long lateDays, long absentDays, long earlySignOutDays, long totalRecords) {
            this.staffName = staffName;
            this.onTimeDays = onTimeDays;
            this.lateDays = lateDays;
            this.absentDays = absentDays;
            this.earlySignOutDays = earlySignOutDays;
            this.totalRecords = totalRecords;
        }

        // Getters
        public String getStaffName() { return staffName; }
        public long getOnTimeDays() { return onTimeDays; }
        public long getLateDays() { return lateDays; }
        public long getAbsentDays() { return absentDays; }
        public long getEarlySignOutDays() { return earlySignOutDays; }
        public long getTotalRecords() { return totalRecords; }
    }
}