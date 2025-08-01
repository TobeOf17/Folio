package com.Folio.attendance_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "unit")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unit_id") // on the unitId field
    private int unitId;
    private String name;

    public Unit() {
    }

    public Unit(String name) {
        this.name = name;
    }

    public Unit(int unitId, String name) {
        this.unitId = unitId;
        this.name = name;
    }

    public int getUnitId() {
        return unitId;
    }

    public void setUnitId(int unitId) {
        this.unitId = unitId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Unit{" +
                "unitId=" + unitId +
                ", name='" + name + '\'' +
                '}';
    }
}
