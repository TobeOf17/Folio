package com.Folio.attendance_app.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shift_id", nullable = false)
    private Shift shift;

    @Column(name = "shift_date", nullable = false)
    private LocalDate shiftDate;


    public Schedule() {
    }

    public Schedule(Staff staff, Shift shift, LocalDate shiftDate) {
        this.staff = staff;
        this.shift = shift;
        this.shiftDate = shiftDate;
    }

    public Schedule(Long scheduleId, Staff staff, Shift shift, LocalDate shiftDate) {
        this.scheduleId = scheduleId;
        this.staff = staff;
        this.shift = shift;
        this.shiftDate = shiftDate;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public Shift getShift() {
        return shift;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }

    public LocalDate getShiftDate() {
        return shiftDate;
    }

    public void setShiftDate(LocalDate shiftDate) {
        this.shiftDate = shiftDate;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "scheduleId=" + scheduleId +
                ", staff=" + staff +
                ", shift=" + shift +
                ", shiftDate=" + shiftDate +
                '}';
    }
}
