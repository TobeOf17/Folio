package com.Folio.attendance_app.config;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.repository.*;
import com.Folio.attendance_app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired private RoleRepository roleRepository;
    @Autowired private UnitRepository unitRepository;
    @Autowired private StaffRepository staffRepository;
    @Autowired private CompanyRepository companyRepository;
    @Autowired private AuthService authService;
    @Autowired private ShiftTypeRepository shiftTypeRepository;
    @Autowired private ShiftRepository shiftRepository;
    @Autowired private ShiftRequestRepository shiftRequestRepository;

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

        Role adminRole = roleRepository.findByNameIgnoreCase("Admin")
                .orElseGet(() -> roleRepository.save(new Role("Admin")));
        Role managerRole = roleRepository.findByNameIgnoreCase("Manager")
                .orElseGet(() -> roleRepository.save(new Role("Manager")));
        Role staffRole = roleRepository.findByNameIgnoreCase("Staff")
                .orElseGet(() -> roleRepository.save(new Role("Staff")));

        // Check if units exist before creating
        Unit itUnit = unitRepository.findByNameIgnoreCase("IT Department")
                .orElseGet(() -> unitRepository.save(new Unit("IT Department")));
        Unit hrUnit = unitRepository.findByNameIgnoreCase("HR Department")
                .orElseGet(() -> unitRepository.save(new Unit("HR Department")));
        Unit financeUnit = unitRepository.findByNameIgnoreCase("Finance Department")
                .orElseGet(() -> unitRepository.save(new Unit("Finance Department")));

        // Create Admin User
        Staff admin = new Staff();
        admin.setEmployeeId("EMP001");
        admin.setFullName("Sarah Ogunlesi");
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

        // Create additional staff members for shift requests
        Staff john = new Staff();
        john.setEmployeeId("EMP004");
        john.setFullName("John Smith");
        john.setEmail("john@company.com");
        john.setPhone("1234567893");
        john.setDob(LocalDate.of(1992, 5, 15));
        john.setGender(Gender.MALE);
        john.setHashedPassword(authService.hashPassword("john123"));
        john.setRole(staffRole);
        john.setUnit(itUnit);
        john.setCompany(company);
        staffRepository.save(john);

        Staff emily = new Staff();
        emily.setEmployeeId("EMP005");
        emily.setFullName("Emily Chen");
        emily.setEmail("emily@company.com");
        emily.setPhone("1234567894");
        emily.setDob(LocalDate.of(1993, 8, 20));
        emily.setGender(Gender.FEMALE);
        emily.setHashedPassword(authService.hashPassword("emily123"));
        emily.setRole(staffRole);
        emily.setUnit(itUnit);
        emily.setCompany(company);
        staffRepository.save(emily);

        // Create Shift Types
        ShiftType morningShift = new ShiftType();
        morningShift.setName("Morning Shift");
        morningShift.setStartTime(LocalTime.of(8, 0));
        morningShift.setEndTime(LocalTime.of(16, 0));
        shiftTypeRepository.save(morningShift);

        ShiftType afternoonShift = new ShiftType();
        afternoonShift.setName("Afternoon Shift");
        afternoonShift.setStartTime(LocalTime.of(14, 0));
        afternoonShift.setEndTime(LocalTime.of(22, 0));
        shiftTypeRepository.save(afternoonShift);

        ShiftType nightShift = new ShiftType();
        nightShift.setName("Night Shift");
        nightShift.setStartTime(LocalTime.of(22, 0));
        nightShift.setEndTime(LocalTime.of(6, 0));
        shiftTypeRepository.save(nightShift);

        // Create Shifts
        Shift johnMorningShift = new Shift();
        johnMorningShift.setShiftType(morningShift);
        johnMorningShift.setUnit(itUnit);
        shiftRepository.save(johnMorningShift);

        Shift emilyAfternoonShift = new Shift();
        emilyAfternoonShift.setShiftType(afternoonShift);
        emilyAfternoonShift.setUnit(itUnit);
        shiftRepository.save(emilyAfternoonShift);

        Shift managerNightShift = new Shift();
        managerNightShift.setShiftType(nightShift);
        managerNightShift.setUnit(hrUnit);
        shiftRepository.save(managerNightShift);

        // Create Shift Requests (WAITING status - ready for admin approval)
        ShiftRequest request1 = new ShiftRequest();
        request1.setRequester(john);
        request1.setRequestedWith(emily);
        request1.setFromShift(johnMorningShift);
        request1.setToShift(emilyAfternoonShift);
        request1.setStatus(ShiftRequestStatus.WAITING);
        request1.setRequestDate(LocalDate.now());
        shiftRequestRepository.save(request1);

        ShiftRequest request2 = new ShiftRequest();
        request2.setRequester(employee);
        request2.setRequestedWith(manager);
        request2.setFromShift(emilyAfternoonShift);
        request2.setToShift(managerNightShift);
        request2.setStatus(ShiftRequestStatus.WAITING);
        request2.setRequestDate(LocalDate.now().plusDays(2));
        shiftRequestRepository.save(request2);

        System.out.println("Initial data loaded successfully!");
        System.out.println("Login credentials:");
        System.out.println("Admin: admin@company.com / admin123");
        System.out.println("Manager: manager@company.com / manager123");
        System.out.println("Staff: staff@company.com / staff123");
        System.out.println("\nShift requests created:");
        System.out.println("- John Smith → Emily Chen (Morning to Afternoon)");
        System.out.println("- Staff User → Manager User (Afternoon to Night)");
        System.out.println("Both requests are in WAITING status (ready for admin approval)");
    }
}