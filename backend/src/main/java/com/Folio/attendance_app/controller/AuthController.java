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
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private CompanyService companyService; // You'll need to create this

    /**
     * Register new company with admin user
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            // Create company first
            Company company = new Company();
            company.setName(request.getCompanyName());
            company.setIndustry(request.getIndustry());
            Company savedCompany = companyService.createCompany(company);

            // Create default admin role if it doesn't exist
            Role adminRole;
            try {
                adminRole = userManagementService.getRoleByName("Admin");
            } catch (RuntimeException e) {
                adminRole = new Role();
                adminRole.setName("Admin");
                adminRole = userManagementService.createRole(adminRole);
            }

            // Create default unit if it doesn't exist
            Unit defaultUnit;
            try {
                defaultUnit = userManagementService.getUnitByName("Management");
            } catch (RuntimeException e) {
                defaultUnit = new Unit();
                defaultUnit.setName("Management");
                defaultUnit = userManagementService.createUnit(defaultUnit);
            }

            // Create admin staff
            Staff adminStaff = new Staff();
            adminStaff.setFullName(request.getAdminName());
            adminStaff.setEmail(request.getAdminEmail());
            adminStaff.setHashedPassword(authService.hashPassword(request.getAdminPassword()));
            adminStaff.setRole(adminRole);
            adminStaff.setUnit(defaultUnit);
            adminStaff.setCompany(savedCompany);
            adminStaff.setAdmin(true);
            
            // Set required fields with defaults
            adminStaff.setDob(LocalDate.now().minusYears(30)); // Default DOB
            adminStaff.setPhone("000-000-0000"); // Placeholder phone
            adminStaff.setGender(Gender.OTHER); // Default gender
            adminStaff.setEmployeeId("EMP" + System.currentTimeMillis()); // Auto-generated employee ID

            Staff savedStaff = userManagementService.createStaff(adminStaff);

            return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                    "message", "Company and admin account created successfully",
                    "companyId", savedCompany.getId(),
                    "adminId", savedStaff.getStaffId()
                ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            AuthService.LoginResult result = authService.login(request.getIdentifier(), request.getPassword());

            if (result.isSuccess()) {
                sessionService.createUserSession(session, result.getStaff());
                
                return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "staff", result.getStaff(),
                    "sessionId", session.getId()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", result.getMessage()));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * Logout endpoint
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        try {
            session.invalidate();
            return ResponseEntity.ok(Map.of("message", "Logout successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Logout failed"));
        }
    }

    /**
     * Check authentication status
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        try {
            Integer staffId = (Integer) session.getAttribute("staffId");

            if (staffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Not authenticated"));
            }

            Staff staff = userManagementService.getStaffById(staffId);
            return ResponseEntity.ok(staff);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ==================== REQUEST CLASSES ====================

    public static class SignupRequest {
        private String companyName;
        private String companyEmail;
        private String industry;
        private String adminName;
        private String adminEmail;
        private String adminPassword;

        // Constructors
        public SignupRequest() {}

        // Getters and Setters
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }

        public String getCompanyEmail() { return companyEmail; }
        public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }

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
        private String identifier; // Can be email or employee ID
        private String password;

        // Constructors
        public LoginRequest() {}

        // Getters and Setters
        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}