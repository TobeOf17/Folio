package com.Folio.attendance_app.controller;

import com.Folio.attendance_app.model.ShiftRequest;
import com.Folio.attendance_app.model.ShiftRequestStatus;
import com.Folio.attendance_app.service.ShiftRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shift-requests")
@CrossOrigin(origins = "*") // Configure appropriately for production
public class ShiftRequestController {

    @Autowired
    private ShiftRequestService shiftRequestService;

    /**
     * Get all shift requests, optionally filtered by status
     * GET /api/shift-requests?status=WAITING
     */
    @GetMapping
    public ResponseEntity<List<ShiftRequest>> getAllRequests(
            @RequestParam(required = false) ShiftRequestStatus status) {
        try {
            List<ShiftRequest> requests;

            if (status != null) {
                requests = shiftRequestService.findByStatus(status);
            } else {
                requests = shiftRequestService.findAll();
            }

            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get shift request by ID
     * GET /api/shift-requests/1
     */
    @GetMapping("/{requestId}")
    public ResponseEntity<ShiftRequest> getRequestById(@PathVariable Long requestId) {
        try {
            ShiftRequest request = shiftRequestService.findById(requestId);
            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get shift requests for a specific staff member
     * GET /api/shift-requests/staff/1
     */
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<ShiftRequest>> getStaffRequests(@PathVariable Long staffId) {
        try {
            List<ShiftRequest> requests = shiftRequestService.findByStaffId(staffId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get pending requests for a staff member (requests they need to respond to)
     * GET /api/shift-requests/staff/1/pending
     */
    @GetMapping("/staff/{staffId}/pending")
    public ResponseEntity<List<ShiftRequest>> getPendingRequestsForStaff(@PathVariable Long staffId) {
        try {
            List<ShiftRequest> requests = shiftRequestService.getPendingRequestsForStaff(staffId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new shift request
     * POST /api/shift-requests
     */
    @PostMapping
    public ResponseEntity<ShiftRequest> createRequest(@RequestBody ShiftRequest shiftRequest) {
        try {
            ShiftRequest created = shiftRequestService.createRequest(shiftRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Staff accepts a shift request (PENDING -> WAITING)
     * PUT /api/shift-requests/1/accept
     */
    @PutMapping("/{requestId}/accept")
    public ResponseEntity<ShiftRequest> acceptRequest(@PathVariable Long requestId) {
        try {
            ShiftRequest updated = shiftRequestService.acceptRequest(requestId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Staff rejects a shift request (PENDING -> DECLINED)
     * PUT /api/shift-requests/1/reject
     */
    @PutMapping("/{requestId}/reject")
    public ResponseEntity<ShiftRequest> rejectRequest(@PathVariable Long requestId) {
        try {
            ShiftRequest updated = shiftRequestService.rejectRequest(requestId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Admin approves a shift request (WAITING -> APPROVED)
     * PUT /api/shift-requests/1/approve
     */
    @PutMapping("/{requestId}/approve")
    public ResponseEntity<ShiftRequest> approveRequest(@PathVariable Long requestId) {
        try {
            ShiftRequest updated = shiftRequestService.approveRequest(requestId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Admin declines a shift request (WAITING -> DECLINED)
     * PUT /api/shift-requests/1/decline
     */
    @PutMapping("/{requestId}/decline")
    public ResponseEntity<ShiftRequest> declineRequest(@PathVariable Long requestId) {
        try {
            ShiftRequest updated = shiftRequestService.declineRequest(requestId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Cancel a shift request
     * PUT /api/shift-requests/1/cancel
     */
    @PutMapping("/{requestId}/cancel")
    public ResponseEntity<ShiftRequest> cancelRequest(@PathVariable Long requestId) {
        try {
            ShiftRequest updated = shiftRequestService.cancelRequest(requestId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Update a shift request
     * PUT /api/shift-requests/1
     */
    @PutMapping("/{requestId}")
    public ResponseEntity<ShiftRequest> updateRequest(
            @PathVariable Long requestId,
            @RequestBody ShiftRequest shiftRequest) {
        try {
            ShiftRequest updated = shiftRequestService.updateRequest(requestId, shiftRequest);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Delete a shift request
     * DELETE /api/shift-requests/1
     */
    @DeleteMapping("/{requestId}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long requestId) {
        try {
            shiftRequestService.deleteRequest(requestId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}