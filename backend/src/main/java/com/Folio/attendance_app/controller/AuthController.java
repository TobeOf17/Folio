package com.Folio.attendance_app.controller;

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
                // keep your existing session behavior
                sessionService.createUserSession(session, staff);

                // also return a token for the FE (dummy for now; swap for real JWT later)
                return ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "staff", staff,
                        "token", "dummy.jwt.token"
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

    // ----- SIGNUP (minimal stub for now) -----
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // TODO: create user via authService (email/password hashing) later
            return ResponseEntity.noContent().build(); // 204 so FE navigates to /login
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
