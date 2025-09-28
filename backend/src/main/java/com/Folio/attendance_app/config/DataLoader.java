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

    @Autowired private RoleRepository roleRepository;
    @Autowired private UnitRepository unitRepository;
    @Autowired private StaffRepository staffRepository;
    @Autowired private CompanyRepository companyRepository;
    @Autowired private AuthService authService;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            loadInitialData();
        }
    }

    @Transactional
    protected void loadInitialData() {
        System.out.println("Loading initial data...");

        // Create Company
        Company company = new Company();
        company.setName("Demo Company");
        company.setIndustry("Technology");
        company = companyRepository.save(company);

        // Create Roles
        Role adminRole = new Role("ADMIN");
        Role managerRole = new Role("MANAGER");
        Role staffRole = new Role("STAFF");
        
        roleRepository.save(adminRole);
        roleRepository.save(managerRole);
        roleRepository.save(staffRole);

        // Create Units
        Unit itUnit = new Unit("IT Department");
        Unit hrUnit = new Unit("HR Department");
        Unit financeUnit = new Unit("Finance Department");
        
        unitRepository.save(itUnit);
        unitRepository.save(hrUnit);
        unitRepository.save(financeUnit);

        // Create Admin User
        Staff admin = new Staff();
        admin.setEmployeeId("EMP001");
        admin.setFullName("Admin User");
        admin.setEmail("admin@company.com");
        admin.setPhone("1234567890");
        admin.setDob(LocalDate.of(1985, 1, 1));
        admin.setGender(Gender.MALE);
        admin.setHashedPassword(authService.hashPassword("admin123"));
        admin.setRole(adminRole);
        admin.setUnit(itUnit);
        admin.setCompany(company);
        admin.setAdmin(true);
        staffRepository.save(admin);

        // Create Manager User
        Staff manager = new Staff();
        manager.setEmployeeId("EMP002");
        manager.setFullName("Manager User");
        manager.setEmail("manager@company.com");
        manager.setPhone("1234567891");
        manager.setDob(LocalDate.of(1988, 2, 2));
        manager.setGender(Gender.FEMALE);
        manager.setHashedPassword(authService.hashPassword("manager123"));
        manager.setRole(managerRole);
        manager.setUnit(hrUnit);
        manager.setCompany(company);
        staffRepository.save(manager);

        // Create Staff User
        Staff employee = new Staff();
        employee.setEmployeeId("EMP003");
        employee.setFullName("Staff User");
        employee.setEmail("staff@company.com");
        employee.setPhone("1234567892");
        employee.setDob(LocalDate.of(1990, 3, 3));
        employee.setGender(Gender.MALE);
        employee.setHashedPassword(authService.hashPassword("staff123"));
        employee.setRole(staffRole);
        employee.setUnit(financeUnit);
        employee.setCompany(company);
        staffRepository.save(employee);

        System.out.println("Initial data loaded successfully!");
        System.out.println("Login credentials:");
        System.out.println("Admin: admin@company.com / admin123");
        System.out.println("Manager: manager@company.com / manager123");
        System.out.println("Staff: staff@company.com / staff123");
    }
}