package com.Folio.attendance_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "unit")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unit_id")
    private Long unitId; 

    @Column(nullable = false)
    @NotBlank(message = "Unit name is required")
    @Size(max = 100, message = "Unit name must not exceed 100 characters")
    private String name;

    public Unit() {}

    public Unit(String name) {
        this.name = name;
    }

    public Unit(Long unitId, String name) { 
        this.unitId = unitId;
        this.name = name;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
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
