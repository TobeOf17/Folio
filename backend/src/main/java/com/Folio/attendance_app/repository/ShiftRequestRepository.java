package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.ShiftRequest;
import com.Folio.attendance_app.model.ShiftRequestStatus;
import com.Folio.attendance_app.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShiftRequestRepository extends JpaRepository<ShiftRequest, Long> {

    /**
     * Find shift requests by status
     */
    List<ShiftRequest> findByStatus(ShiftRequestStatus status);

    /**
     * Find shift requests by requester staff ID
     */
    List<ShiftRequest> findByRequester_StaffId(Long staffId);

    /**
     * Find shift requests by requested with staff ID
     */
    List<ShiftRequest> findByRequestedWith_StaffId(Long staffId);

    /**
     * Find shift requests by requested with staff ID and status
     */
    List<ShiftRequest> findByRequestedWith_StaffIdAndStatus(Long staffId, ShiftRequestStatus status);

    /**
     * Find shift requests involving a specific staff member (either as requester or requested with)
     */
    List<ShiftRequest> findByRequester_StaffIdOrRequestedWith_StaffId(Long requesterId, Long requestedWithId);

    /**
     * Find shift requests by request date
     */
    List<ShiftRequest> findByRequestDate(LocalDate requestDate);

    /**
     * Find shift requests by request date range
     */
    List<ShiftRequest> findByRequestDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Find shift requests by status and request date
     */
    List<ShiftRequest> findByStatusAndRequestDate(ShiftRequestStatus status, LocalDate requestDate);

    /**
     * Find shift requests by requester and status
     */
    List<ShiftRequest> findByRequester_StaffIdAndStatus(Long staffId, ShiftRequestStatus status);

    List<ShiftRequest> findByRequestedWithAndStatus(Staff staff, ShiftRequestStatus shiftRequestStatus);
}