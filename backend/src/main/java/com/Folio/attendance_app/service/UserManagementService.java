package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserManagementService {

    @Autowired
    private StaffService staffService;
    
    @Autowired
    private RoleService roleService;
    
    @Autowired
    private UnitService unitService;

    // Delegate to individual services
    public Staff getStaffById(Long id) {
        return staffService.getStaffById(id);
    }

 public DashboardStats getDashboardStats() {
    long totalStaff = staffService.getStaffCount();
    long totalRoles = roleService.getRoleCount(); 
    long totalUnits = unitService.getUnitCount();

        return new DashboardStats(totalStaff, totalRoles, totalUnits);
    }

    // ==================== INNER CLASSES ====================

    public static class DashboardStats {
        private long totalStaff;
        private long totalRoles;
        private long totalUnits;

        public DashboardStats(long totalStaff, long totalRoles, long totalUnits) {
            this.totalStaff = totalStaff;
            this.totalRoles = totalRoles;
            this.totalUnits = totalUnits;
        }

        // Getters
        public long getTotalStaff() { return totalStaff; }
        public long getTotalRoles() { return totalRoles; }
        public long getTotalUnits() { return totalUnits; }
    }
}