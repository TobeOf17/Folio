package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.ShiftRequest;
import com.Folio.attendance_app.model.ShiftRequestStatus;
import com.Folio.attendance_app.repository.ShiftRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShiftRequestService {

    @Autowired
    private ShiftRequestRepository shiftRequestRepository;

    /**
     * Get all shift requests
     */
    public List<ShiftRequest> findAll() {
        return shiftRequestRepository.findAll();
    }

    /**
     * Get shift request by ID
     */
    public ShiftRequest findById(Long requestId) {
        return shiftRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Shift request not found with id: " + requestId));
    }

    /**
     * Get shift requests by status
     */
    public List<ShiftRequest> findByStatus(ShiftRequestStatus status) {
        return shiftRequestRepository.findByStatus(status);
    }

    /**
     * Get shift requests for a specific staff member (as requester)
     */
    public List<ShiftRequest> findByRequester(Long staffId) {
        return shiftRequestRepository.findByRequester_StaffId(staffId);
    }

    /**
     * Get shift requests for a specific staff member (as requested with)
     */
    public List<ShiftRequest> findByRequestedWith(Long staffId) {
        return shiftRequestRepository.findByRequestedWith_StaffId(staffId);
    }

    /**
     * Get all shift requests involving a specific staff member
     */
    public List<ShiftRequest> findByStaffId(Long staffId) {
        return shiftRequestRepository.findByRequester_StaffIdOrRequestedWith_StaffId(staffId, staffId);
    }

    /**
     * Create a new shift request (initial status: PENDING)
     */
    @Transactional
    public ShiftRequest createRequest(ShiftRequest shiftRequest) {
        // Set initial status to PENDING
        shiftRequest.setStatus(ShiftRequestStatus.PENDING);

        // Set request date if not provided
        if (shiftRequest.getRequestDate() == null) {
            shiftRequest.setRequestDate(LocalDate.now());
        }

        return shiftRequestRepository.save(shiftRequest);
    }

    /**
     * Staff accepts shift swap request (PENDING -> WAITING)
     * Called by the staff member who was requested to swap
     */
    @Transactional
    public ShiftRequest acceptRequest(Long requestId) {
        ShiftRequest request = findById(requestId);

        if (request.getStatus() != ShiftRequestStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending requests can be accepted. Current status: " + request.getStatus()
            );
        }

        request.setStatus(ShiftRequestStatus.WAITING);
        return shiftRequestRepository.save(request);
    }

    /**
     * Staff rejects shift swap request (PENDING -> DECLINED)
     * Called by the staff member who was requested to swap
     */
    @Transactional
    public ShiftRequest rejectRequest(Long requestId) {
        ShiftRequest request = findById(requestId);

        if (request.getStatus() != ShiftRequestStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending requests can be rejected. Current status: " + request.getStatus()
            );
        }

        request.setStatus(ShiftRequestStatus.DECLINED);
        return shiftRequestRepository.save(request);
    }

    /**
     * Admin approves shift swap request (WAITING -> APPROVED)
     * Called by admin after staff has accepted
     */
    @Transactional
    public ShiftRequest approveRequest(Long requestId) {
        ShiftRequest request = findById(requestId);

        if (request.getStatus() != ShiftRequestStatus.WAITING) {
            throw new IllegalStateException(
                    "Only waiting requests can be approved. Current status: " + request.getStatus()
            );
        }

        request.setStatus(ShiftRequestStatus.APPROVED);

        // TODO: Implement actual shift swap logic here
        // - Update shift assignments in the database
        // - Swap the shifts between the two staff members

        return shiftRequestRepository.save(request);
    }

    /**
     * Admin declines shift swap request (WAITING -> DECLINED)
     * Called by admin after staff has accepted
     */
    @Transactional
    public ShiftRequest declineRequest(Long requestId) {
        ShiftRequest request = findById(requestId);

        if (request.getStatus() != ShiftRequestStatus.WAITING) {
            throw new IllegalStateException(
                    "Only waiting requests can be declined. Current status: " + request.getStatus()
            );
        }

        request.setStatus(ShiftRequestStatus.DECLINED);
        return shiftRequestRepository.save(request);
    }

    /**
     * Cancel a shift request (requester can cancel if status is PENDING or WAITING)
     */
    @Transactional
    public ShiftRequest cancelRequest(Long requestId) {
        ShiftRequest request = findById(requestId);

        if (request.getStatus() == ShiftRequestStatus.APPROVED ||
                request.getStatus() == ShiftRequestStatus.DECLINED) {
            throw new IllegalStateException(
                    "Cannot cancel request with status: " + request.getStatus()
            );
        }

        request.setStatus(ShiftRequestStatus.DECLINED);
        return shiftRequestRepository.save(request);
    }

    /**
     * Update shift request
     */
    @Transactional
    public ShiftRequest updateRequest(Long requestId, ShiftRequest updatedRequest) {
        ShiftRequest request = findById(requestId);

        // Only allow updates if status is PENDING
        if (request.getStatus() != ShiftRequestStatus.PENDING) {
            throw new IllegalStateException(
                    "Can only update pending requests. Current status: " + request.getStatus()
            );
        }

        // Update fields
        if (updatedRequest.getFromShift() != null) {
            request.setFromShift(updatedRequest.getFromShift());
        }
        if (updatedRequest.getToShift() != null) {
            request.setToShift(updatedRequest.getToShift());
        }
        if (updatedRequest.getRequestedWith() != null) {
            request.setRequestedWith(updatedRequest.getRequestedWith());
        }

        return shiftRequestRepository.save(request);
    }

    /**
     * Delete shift request
     */
    @Transactional
    public void deleteRequest(Long requestId) {
        ShiftRequest request = findById(requestId);
        shiftRequestRepository.delete(request);
    }

    /**
     * Get pending requests for a staff member (requests they need to respond to)
     */
    public List<ShiftRequest> getPendingRequestsForStaff(Long staffId) {
        return shiftRequestRepository.findByRequestedWith_StaffIdAndStatus(staffId, ShiftRequestStatus.PENDING);
    }

    /**
     * Get waiting requests (for admin to review)
     */
    public List<ShiftRequest> getWaitingRequests() {
        return shiftRequestRepository.findByStatus(ShiftRequestStatus.WAITING);
    }
}