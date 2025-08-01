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
     * Change password for a staff member
     */
    public void changePassword(Integer staffId, String currentPassword, String newPassword) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        // Verify current password
        if (!passwordEncoder.matches(currentPassword, staff.getHashedPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Validate new password (minimum 8 characters)
        if (newPassword.length() < 8) {
            throw new RuntimeException("New password must be at least 8 characters long");
        }

        // Hash and save new password
        staff.setHashedPassword(hashPassword(newPassword));
        staffRepository.save(staff);
    }

    /**
     * Reset password (admin function)
     */
    public String resetPassword(Integer staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + staffId));

        // Generate temporary password (you might want to make this more sophisticated)
        String tempPassword = generateTemporaryPassword();

        // Hash and save new password
        staff.setHashedPassword(hashPassword(tempPassword));
        staffRepository.save(staff);

        return tempPassword; // Return plain password to admin (should be sent to user securely)
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
     * Generate temporary password
     */
    private String generateTemporaryPassword() {
        // Simple temporary password generator
        // In production, use a more secure method
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            int index = (int) (Math.random() * chars.length());
            password.append(chars.charAt(index));
        }

        return password.toString();
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