package com.Folio.attendance_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shift")
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift_id")
    private Long shiftId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shift_type_id", nullable = false)
    private ShiftType shiftType;



    public Shift() {
    }

    public Shift(ShiftType shiftType, Unit unit) {
        this.shiftType = shiftType;
        this.unit = unit;
    }

    public Shift(Long shiftId, Unit unit, ShiftType shiftType) {
        this.shiftId = shiftId;
        this.unit = unit;
        this.shiftType = shiftType;
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public ShiftType getShiftType() {
        return shiftType;
    }

    public void setShiftType(ShiftType shiftType) {
        this.shiftType = shiftType;
    }

    @Override
    public String toString() {
        return "Shift{" +
                "shiftId=" + shiftId +
                ", unit=" + unit +
                ", shiftType=" + shiftType +
                '}';
    }
}
