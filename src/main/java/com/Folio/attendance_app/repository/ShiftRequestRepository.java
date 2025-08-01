package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.ShiftRequest;
import com.Folio.attendance_app.model.Shift;
import com.Folio.attendance_app.model.ShiftRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftRequestRepository extends JpaRepository<ShiftRequest, Integer> {

    // Find requests by requester email
    List<ShiftRequest> findByRequesterEmail(String requesterEmail);

    // Find requests by the person being requested to swap with
    List<ShiftRequest> findByRequestedWithEmail(String requestedWithEmail);

    // Find requests by status
    List<ShiftRequest> findByStatus(ShiftRequestStatus status);

    // Find pending requests for a specific user
    List<ShiftRequest> findByRequestedWithEmailAndStatus(String requestedWithEmail, ShiftRequestStatus status);

    // Find requests made by a user with specific status
    List<ShiftRequest> findByRequesterEmailAndStatus(String requesterEmail, ShiftRequestStatus status);

    // Find requests for a specific date
    List<ShiftRequest> findByRequestDate(LocalDate requestDate);

    // Find requests within date range
    List<ShiftRequest> findByRequestDateBetween(LocalDate startDate, LocalDate endDate);

    // Find requests involving a specific shift (from or to)
    @Query("SELECT sr FROM ShiftRequest sr WHERE sr.fromShift = :shift OR sr.toShift = :shift")
    List<ShiftRequest> findByShift(@Param("shift") Shift shift);

    // Find requests from a specific shift
    List<ShiftRequest> findByFromShift(Shift fromShift);

    // Find requests to a specific shift
    List<ShiftRequest> findByToShift(Shift toShift);

    // Find all pending requests (for admin dashboard)
    List<ShiftRequest> findByStatusOrderByRequestDateAsc(ShiftRequestStatus status);

    // Find requests between two specific users
    @Query("SELECT sr FROM ShiftRequest sr WHERE " +
            "(sr.requesterEmail = :email1 AND sr.requestedWithEmail = :email2) OR " +
            "(sr.requesterEmail = :email2 AND sr.requestedWithEmail = :email1)")
    List<ShiftRequest> findRequestsBetweenUsers(@Param("email1") String email1, @Param("email2") String email2);

    // Check if there's already a pending request between users for same shifts
    @Query("SELECT sr FROM ShiftRequest sr WHERE " +
            "sr.requesterEmail = :requesterEmail AND " +
            "sr.requestedWithEmail = :requestedWithEmail AND " +
            "sr.fromShift = :fromShift AND " +
            "sr.toShift = :toShift AND " +
            "sr.status = :status")
    Optional<ShiftRequest> findExistingRequest(@Param("requesterEmail") String requesterEmail,
                                               @Param("requestedWithEmail") String requestedWithEmail,
                                               @Param("fromShift") Shift fromShift,
                                               @Param("toShift") Shift toShift,
                                               @Param("status") ShiftRequestStatus status);

    // Find requests that need action from a user (pending requests to them)
    @Query("SELECT sr FROM ShiftRequest sr WHERE " +
            "sr.requestedWithEmail = :email AND sr.status = 'PENDING' " +
            "ORDER BY sr.requestDate ASC")
    List<ShiftRequest> findPendingRequestsForUser(@Param("email") String email);

    // Find recent requests (last 30 days)
    @Query("SELECT sr FROM ShiftRequest sr WHERE " +
            "sr.requestDate >= :date ORDER BY sr.requestDate DESC")
    List<ShiftRequest> findRecentRequests(@Param("date") LocalDate date);

    // Count requests by status
    long countByStatus(ShiftRequestStatus status);

    // Count requests by user
    long countByRequesterEmail(String requesterEmail);

    // Count pending requests for a user
    long countByRequestedWithEmailAndStatus(String requestedWithEmail, ShiftRequestStatus status);

    // Find requests involving specific users (either as requester or requested with)
    @Query("SELECT sr FROM ShiftRequest sr WHERE " +
            "sr.requesterEmail = :email OR sr.requestedWithEmail = :email")
    List<ShiftRequest> findRequestsInvolvingUser(@Param("email") String email);

    // Find approved requests for reporting
    List<ShiftRequest> findByStatusAndRequestDateBetween(ShiftRequestStatus status,
                                                         LocalDate startDate,
                                                         LocalDate endDate);

    // Custom search for admin panel
    @Query("SELECT sr FROM ShiftRequest sr WHERE " +
            "(:requesterEmail IS NULL OR LOWER(sr.requesterEmail) LIKE LOWER(CONCAT('%', :requesterEmail, '%'))) AND " +
            "(:requestedWithEmail IS NULL OR LOWER(sr.requestedWithEmail) LIKE LOWER(CONCAT('%', :requestedWithEmail, '%'))) AND " +
            "(:status IS NULL OR sr.status = :status) AND " +
            "(:fromDate IS NULL OR sr.requestDate >= :fromDate) AND " +
            "(:toDate IS NULL OR sr.requestDate <= :toDate)")
    List<ShiftRequest> searchRequests(@Param("requesterEmail") String requesterEmail,
                                      @Param("requestedWithEmail") String requestedWithEmail,
                                      @Param("status") ShiftRequestStatus status,
                                      @Param("fromDate") LocalDate fromDate,
                                      @Param("toDate") LocalDate toDate);

    // Get all requests ordered by date (newest first)
    List<ShiftRequest> findAllByOrderByRequestDateDesc();
}