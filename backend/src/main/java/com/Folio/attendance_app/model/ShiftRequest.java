package com.Folio.attendance_app.model;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;

@Entity
@Table(name = "shift_requests")

public class ShiftRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private int requestId;

    @Column(name = "requester_email", nullable = false)
    private String requesterEmail;

    @Column(name = "requested_with_email", nullable = false)
    private String requestedWithEmail;

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

    public ShiftRequest(String requesterEmail, String requestedWithEmail, Shift fromShift, Shift toShift, ShiftRequestStatus status, LocalDate requestDate) {
        this.requesterEmail = requesterEmail;
        this.requestedWithEmail = requestedWithEmail;
        this.fromShift = fromShift;
        this.toShift = toShift;
        this.status = status;
        this.requestDate = requestDate;
    }

    public ShiftRequest(int requestId, String requesterEmail, String requestedWithEmail, Shift fromShift, Shift toShift, ShiftRequestStatus status, LocalDate requestDate) {
        this.requestId = requestId;
        this.requesterEmail = requesterEmail;
        this.requestedWithEmail = requestedWithEmail;
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

    public String getRequestedWithEmail() {
        return requestedWithEmail;
    }

    public void setRequestedWithEmail(String requestedWithEmail) {
        this.requestedWithEmail = requestedWithEmail;
    }

    public String getRequesterEmail() {
        return requesterEmail;
    }

    public void setRequesterEmail(String requesterEmail) {
        this.requesterEmail = requesterEmail;
    }

    @Override
    public String toString() {
        return "ShiftRequest{" +
                "requestId=" + requestId +
                ", requesterEmail='" + requesterEmail + '\'' +
                ", requestedWithEmail='" + requestedWithEmail + '\'' +
                ", fromShift=" + fromShift +
                ", toShift=" + toShift +
                ", status=" + status +
                ", requestDate=" + requestDate +
                '}';
    }
}
