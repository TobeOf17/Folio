package com.Folio.attendance_app.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "shift_requests")

public class ShiftRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_staff_id", nullable = false)
    private Staff requester;

    @ManyToOne(fetch = FetchType.LAZY)  
    @JoinColumn(name = "requested_with_staff_id", nullable = false)
    private Staff requestedWith;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_shift_id", nullable = false)
    private Shift fromShift;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_shift_id", nullable = false)
    private Shift toShift;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShiftRequestStatus status;

    @Column(name = "request_date", nullable = false)
    private LocalDate requestDate;


    public ShiftRequest() {
    }

    public ShiftRequest(Staff requester, Staff requestedWith, Shift fromShift, Shift toShift, ShiftRequestStatus status, LocalDate requestDate) {
        this.requester = requester;
        this.requestedWith = requestedWith;
        this.fromShift = fromShift;
        this.toShift = toShift;
        this.status = status;
        this.requestDate = requestDate;
    }

    public ShiftRequest(Long requestId, Staff requester, Staff requestedWith, Shift fromShift, Shift toShift, ShiftRequestStatus status, LocalDate requestDate) {
        this.requestId = requestId;
        this.requester = requester;
        this.requestedWith = requestedWith;
        this.fromShift = fromShift;
        this.toShift = toShift;
        this.status = status;
        this.requestDate = requestDate;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public ShiftRequestStatus getStatus() {
        return status;
    }

    public void setStatus(ShiftRequestStatus status) {
        this.status = status;
    }

    public Shift getToShift() {
        return toShift;
    }

    public void setToShift(Shift toShift) {
        this.toShift = toShift;
    }

    public Shift getFromShift() {
        return fromShift;
    }

    public void setFromShift(Shift fromShift) {
        this.fromShift = fromShift;
    }

    public Staff getRequester() {
        return requester;
    }
    public void setRequester(Staff requester) {
        this.requester = requester;
    }
    public Staff getRequestedWith() {
        return requestedWith;
    }
    public void setRequestedWith(Staff requestedWith) {
        this.requestedWith = requestedWith;
    }
    public Long getRequestId() {
        return requestId;
    }
    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    @Override
    public String toString() {
        return "ShiftRequest{" +
                "requestId=" + requestId +
                ", requester=" + requester +
                ", requestedWith=" + requestedWith +
                ", fromShift=" + fromShift +
                ", toShift=" + toShift +
                ", status=" + status +
                ", requestDate=" + requestDate +
                '}';
    }
}
