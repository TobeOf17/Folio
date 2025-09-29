package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.model.*;
import com.Folio.attendance_app.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private StaffService staffService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UnitService unitService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private SessionService sessionService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            // Create company
            Company company = new Company(request.getCompanyName(), request.getIndustry());
            Company savedCompany = companyService.createCompany(company);

            // Create default role and unit
            Role adminRole = roleService.createRole(new Role("Admin"));
            Unit defaultUnit = unitService.createUnit(new Unit("Management"));

            // Create admin staff
            Staff adminStaff = new Staff();
            adminStaff.setFullName(request.getAdminName());
            adminStaff.setEmail(request.getAdminEmail());
            adminStaff.setHashedPassword(authService.hashPassword(request.getAdminPassword()));
            adminStaff.setRole(adminRole);
            adminStaff.setUnit(defaultUnit);
            adminStaff.setCompany(savedCompany);
            adminStaff.setAdmin(true);
            adminStaff.setDob(LocalDate.now().minusYears(30));
            adminStaff.setPhone("000-000-0000");
            adminStaff.setGender(Gender.OTHER);
            adminStaff.setEmployeeId("EMP" + System.currentTimeMillis());

            staffService.createStaff(adminStaff);

            return ResponseEntity.ok(Map.of("message", "Account created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            Staff staff = authService.authenticate(request.getIdentifier(), request.getPassword());
            sessionService.createUserSession(session, staff);
            
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "isAdmin", staff.isAdmin()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        try {
            Long staffId = (Long) session.getAttribute("staffId");
            if (staffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Not authenticated"));
            }
            Staff staff = staffService.getStaffById(staffId);
            return ResponseEntity.ok(staff);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Session expired"));
        }
    }

    // Request DTOs
    public static class SignupRequest {
        private String companyName;
        private String industry;
        private String adminName;
        private String adminEmail;
        private String adminPassword;
        
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getIndustry() { return industry; }
        public void setIndustry(String industry) { this.industry = industry; }
        public String getAdminName() { return adminName; }
        public void setAdminName(String adminName) { this.adminName = adminName; }
        public String getAdminEmail() { return adminEmail; }
        public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }
        public String getAdminPassword() { return adminPassword; }
        public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }
    }

    public static class LoginRequest {
        private String identifier;
        private String password;
        
        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}