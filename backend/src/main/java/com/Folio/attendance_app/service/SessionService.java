package com.Folio.attendance_app.service;

import com.Folio.attendance_app.constants.SessionConstants;
import com.Folio.attendance_app.model.Staff;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    public void createUserSession(HttpSession session, Staff staff) {
        session.setAttribute(SessionConstants.STAFF_ID, staff.getStaffId());
        session.setAttribute(SessionConstants.STAFF_ROLE, staff.getRole().getName());
        session.setAttribute(SessionConstants.STAFF_NAME, staff.getFullName());
    }

    public boolean isAdmin(HttpSession session) {
        String currentRole = (String) session.getAttribute(SessionConstants.STAFF_ROLE);
        return currentRole != null && currentRole.toLowerCase().contains("admin");
    }
}