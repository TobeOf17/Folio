package com.Folio.attendance_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.Unit;
import com.Folio.attendance_app.repository.StaffRepository;
import com.Folio.attendance_app.repository.UnitRepository;


@Service
public class UnitService {
    
    @Autowired
    private UnitRepository unitRepository;
    
    @Autowired  
    private StaffRepository staffRepository;

    public Unit createUnit(Unit unit) {
        if (unitRepository.existsByNameIgnoreCase(unit.getName())) {
            throw new RuntimeException("Unit with name '" + unit.getName() + "' already exists");
        }
        return unitRepository.save(unit);
    }

    public Unit getUnitById(Long id) {
        return unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found with id: " + id));
    }

    public Unit getUnitByName(String name) {
        return unitRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Unit not found with name: " + name));
    }

    public long getUnitCount() {
    return unitRepository.count();
    }

    public List<Unit> getAllUnits() {
        return unitRepository.findAllByOrderByNameAsc();
    }

    public Unit updateUnit(Long id, Unit updatedUnit) {
        Unit existingUnit = getUnitById(id);

        if (!existingUnit.getName().equalsIgnoreCase(updatedUnit.getName())) {
            if (unitRepository.existsByNameIgnoreCase(updatedUnit.getName())) {
                throw new RuntimeException("Unit with name '" + updatedUnit.getName() + "' already exists");
            }
        }

        existingUnit.setName(updatedUnit.getName());
        return unitRepository.save(existingUnit);
    }

    public void deleteUnit(Long id) {
        Unit unit = getUnitById(id);

        List<Staff> staffInUnit = staffRepository.findByUnit(unit);
        if (!staffInUnit.isEmpty()) {
            throw new RuntimeException("Cannot delete unit '" + unit.getName() +
                    "' because it has " + staffInUnit.size() + " staff member(s)");
        }

        unitRepository.delete(unit);
    }

    public List<Unit> searchUnitsByName(String name) {
        return unitRepository.findByNameContainingIgnoreCase(name);
    }

}
