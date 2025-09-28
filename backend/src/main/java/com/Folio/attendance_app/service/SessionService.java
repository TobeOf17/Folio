package com.Folio.attendance_app.service;

import com.Folio.attendance_app.constants.SessionConstants;
import com.Folio.attendance_app.model.Staff;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    private final UserManagementService userManagementService;

    public SessionService(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    public void createUserSession(HttpSession session, Staff staff) {
        session.setAttribute(SessionConstants.STAFF_ID, staff.getStaffId());
        session.setAttribute(SessionConstants.STAFF_ROLE, staff.getRole().getName());
        session.setAttribute(SessionConstants.STAFF_NAME, staff.getFullName());
    }

    public boolean isAdmin(HttpSession session) {
    Long staffId = (Long) session.getAttribute(SessionConstants.STAFF_ID);
    if (staffId == null) return false;
    Staff staff = userManagementService.getStaffById(staffId);
    return staff != null && staff.isAdmin();
    }
}