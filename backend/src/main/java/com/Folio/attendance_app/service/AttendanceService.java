package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.AttendanceLog;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.AttendanceStatus;
import com.Folio.attendance_app.model.Schedule;
import com.Folio.attendance_app.repository.AttendanceLogRepository;
import com.Folio.attendance_app.repository.ScheduleRepository;
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

    @Autowired
    private ScheduleRepository scheduleRepository;

    private AttendanceStatus determineAttendanceStatus(Staff staff, LocalTime signInTime) {
    Optional<Schedule> todaysSchedule = scheduleRepository.findTodaysScheduleForStaff(staff);
    
    if (todaysSchedule.isEmpty()) {
        // No schedule means staff shouldn't be working today
        return AttendanceStatus.ABSENT;
    }
    
    LocalTime shiftStart = todaysSchedule.get().getShift().getShiftType().getStartTime();
    return signInTime.isAfter(shiftStart) ? AttendanceStatus.LATE : AttendanceStatus.ON_TIME;
    
    }

/**
     * Sign in a staff member
     */
    public AttendanceLog signIn(Long staffId) {
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

     AttendanceStatus status = determineAttendanceStatus(staff, now);

        AttendanceLog log = new AttendanceLog(staff, today, now, null, status);
        return attendanceLogRepository.save(log);

    
    }

    /**
     * Sign out a staff member
     */
    public AttendanceLog signOut(Long staffId) {
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
     * Mark staff as absent (for admin use)
     */
    public AttendanceLog markAbsent(Long staffId, LocalDate date) {
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