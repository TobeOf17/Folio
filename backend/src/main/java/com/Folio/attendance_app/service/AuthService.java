package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StaffRepository staffRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Authenticate user with email and password
     */
    public Staff authenticate(String email, String password) {
        Optional<Staff> staffOptional = staffRepository.findByEmail(email);

        if (staffOptional.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        Staff staff = staffOptional.get();

        if (!passwordEncoder.matches(password, staff.getHashedPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return staff;
    }

    /**
     * Authenticate user with employee ID and password
     */
    public Staff authenticateByEmployeeId(String employeeId, String password) {
        Optional<Staff> staffOptional = staffRepository.findByEmployeeId(employeeId);

        if (staffOptional.isEmpty()) {
            throw new RuntimeException("Invalid employee ID or password");
        }

        Staff staff = staffOptional.get();

        if (!passwordEncoder.matches(password, staff.getHashedPassword())) {
            throw new RuntimeException("Invalid employee ID or password");
        }

        return staff;
    }

    /**
     * Hash password for storage
     */
    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    /**
     * Verify if password matches the hashed password
     */
    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }

    /**
     * Validate password strength
     */
    public boolean isPasswordValid(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }

        // Add more password validation rules as needed
        // e.g., must contain uppercase, lowercase, number, special character
        return true;
    }

    /**
     * Check if staff account is active (you might have an 'active' field in Staff)
     */
    public boolean isStaffActive(Staff staff) {
        // Assuming all staff are active for now
        // You can add an 'active' boolean field to Staff model later
        return true;
    }



    /**
     * Login attempt (returns staff info if successful)
     */
    public LoginResult login(String identifier, String password) {
        try {
            Staff staff;

            // Try email first, then employee ID
            if (identifier.contains("@")) {
                staff = authenticate(identifier, password);
            } else {
                staff = authenticateByEmployeeId(identifier, password);
            }

            if (!isStaffActive(staff)) {
                throw new RuntimeException("Account is deactivated");
            }

            return new LoginResult(true, "Login successful", staff);

        } catch (RuntimeException e) {
            return new LoginResult(false, e.getMessage(), null);
        }
    }

    /**
     * Login result class
     */
    public static class LoginResult {
        private boolean success;
        private String message;
        private Staff staff;

        public LoginResult(boolean success, String message, Staff staff) {
            this.success = success;
            this.message = message;
            this.staff = staff;
        }

        // Getters
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Staff getStaff() { return staff; }
    }
}