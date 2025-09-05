package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.constants.SessionConstants;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.service.AuthService;
import com.Folio.attendance_app.service.SessionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private SessionService sessionService;
    @Autowired
    private AuthService authService;

    // ----- LOGIN -----
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            AuthService.LoginResult result = authService.login(request.getIdentifier(), request.getPassword());

            if (result.isSuccess()) {
                Staff staff = result.getStaff();
                sessionService.createUserSession(session, staff);

                return ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "staff", Map.of(
                                "id", staff.getEmployeeId(),
                                "name", staff.getFullName(),
                                "email", staff.getEmail(),
                                "employeeId", staff.getEmployeeId(),
                                "role", staff.getRole()
                        )
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", result.getMessage()));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Login failed: " + e.getMessage()));
        }
    }

    // ----- SIGNUP -----
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // For portfolio demo - just return success
            // In a real app, you'd create the user in the database
            return ResponseEntity.ok(Map.of(
                    "message", "Signup successful! You can now log in."
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Signup failed: " + e.getMessage()));
        }
    }

    // ----- LOGOUT -----
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        try {
            session.invalidate();
            return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Logout failed"));
        }
    }

    // ----- CHECK AUTH STATUS -----
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        try {
            Integer staffId = (Integer) session.getAttribute("STAFF_ID");
            String staffName = (String) session.getAttribute("STAFF_NAME");
            String staffRole = (String) session.getAttribute("STAFF_ROLE");

            if (staffId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Not authenticated"));
            }

            return ResponseEntity.ok(Map.of(
                    "staff", Map.of(
                            "id", staffId,
                            "name", staffName,
                            "role", staffRole
                    )
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Not authenticated"));
        }
    }

    // ----- Request classes -----
    public static class LoginRequest {
        private String identifier; // email or employee ID
        private String password;

        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class SignupRequest {
        private String name;
        private String email;
        private String password;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}