package com.Folio.attendance_app.config;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.repository.*;
import com.Folio.attendance_app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private AuthService authService;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            loadInitialData();
        }
    }

    @Transactional
    protected void loadInitialData() {
        System.out.println("Loading initial data...");

        // Create and save Roles
        Role adminRole = new Role();
        adminRole.setName("ADMIN");
        adminRole = roleRepository.save(adminRole);

        Role managerRole = new Role();
        managerRole.setName("MANAGER");
        managerRole = roleRepository.save(managerRole);

        Role staffRole = new Role();
        staffRole.setName("STAFF");
        staffRole = roleRepository.save(staffRole);

        // Create and save Units
        Unit itUnit = new Unit();
        itUnit.setName("IT Department");
        itUnit = unitRepository.save(itUnit);

        Unit hrUnit = new Unit();
        hrUnit.setName("HR Department");
        hrUnit = unitRepository.save(hrUnit);

        Unit financeUnit = new Unit();
        financeUnit.setName("Finance Department");
        financeUnit = unitRepository.save(financeUnit);

        // Flush and clear to ensure entities are persisted
        roleRepository.flush();
        unitRepository.flush();

        // Retrieve fresh managed entities to avoid detached entity issues
        Role managedAdminRole = roleRepository.findByName("ADMIN").orElseThrow();
        Role managedManagerRole = roleRepository.findByName("MANAGER").orElseThrow();
        Role managedStaffRole = roleRepository.findByName("STAFF").orElseThrow();

        Unit managedItUnit = unitRepository.findByName("IT Department").orElseThrow();
        Unit managedHrUnit = unitRepository.findByName("HR Department").orElseThrow();
        Unit managedFinanceUnit = unitRepository.findByName("Finance Department").orElseThrow();

        // Create Staff Members using fresh managed entities
        Staff admin = new Staff();
        admin.setEmployeeId("EMP001");
        admin.setFullName("Admin User");
        admin.setEmail("admin@company.com");
        admin.setPhone("1234567890");
        admin.setDob(LocalDate.of(1985, 1, 1));
        admin.setGender(Gender.MALE);
        admin.setHashedPassword(authService.hashPassword("admin123"));
        admin.setRole(managedAdminRole);
        admin.setUnit(managedItUnit);
        staffRepository.save(admin);

        Staff manager = new Staff();
        manager.setEmployeeId("EMP002");
        manager.setFullName("Manager User");
        manager.setEmail("manager@company.com");
        manager.setPhone("1234567891");
        manager.setDob(LocalDate.of(1988, 2, 2));
        manager.setGender(Gender.FEMALE);
        manager.setHashedPassword(authService.hashPassword("manager123"));
        manager.setRole(managedManagerRole);
        manager.setUnit(managedHrUnit);
        staffRepository.save(manager);

        Staff staffMember = new Staff();
        staffMember.setEmployeeId("EMP003");
        staffMember.setFullName("Staff User");
        staffMember.setEmail("staff@company.com");
        staffMember.setPhone("1234567892");
        staffMember.setDob(LocalDate.of(1990, 3, 3));
        staffMember.setGender(Gender.MALE);
        staffMember.setHashedPassword(authService.hashPassword("staff123"));
        staffMember.setRole(managedStaffRole);
        staffMember.setUnit(managedFinanceUnit);
        staffRepository.save(staffMember);

        System.out.println("Initial data loaded successfully!");
        System.out.println("Login credentials:");
        System.out.println("Admin: admin@company.com / admin123 or EMP001 / admin123");
        System.out.println("Manager: manager@company.com / manager123 or EMP002 / manager123");
        System.out.println("Staff: staff@company.com / staff123 or EMP003 / staff123");
    }
}