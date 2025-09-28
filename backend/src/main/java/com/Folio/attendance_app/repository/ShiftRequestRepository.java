package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.ShiftRequest;
import com.Folio.attendance_app.model.ShiftRequestStatus;
import com.Folio.attendance_app.model.Staff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ShiftRequestRepository extends JpaRepository<ShiftRequest, Long> {
List<ShiftRequest> findByRequester(Staff requester);
List<ShiftRequest> findByRequestedWith(Staff requestedWith);
List<ShiftRequest> findByRequesterAndStatus(Staff requester, ShiftRequestStatus status);
List<ShiftRequest> findByRequestedWithAndStatus(Staff requestedWith, ShiftRequestStatus status);

@Query("SELECT sr FROM ShiftRequest sr WHERE sr.requestedWith = :staff AND sr.status = 'PENDING' ORDER BY sr.requestDate ASC")
List<ShiftRequest> findPendingRequestsForStaff(@Param("staff") Staff staff);

@Query("SELECT sr FROM ShiftRequest sr WHERE sr.requester = :staff OR sr.requestedWith = :staff")
List<ShiftRequest> findRequestsInvolvingStaff(@Param("staff") Staff staff);
}