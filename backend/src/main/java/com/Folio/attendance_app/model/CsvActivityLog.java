package com.Folio.attendance_app.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "csv_activity_log")
public class CsvActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_by_staff_id", nullable = false)
    private Staff performedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CsvAction action;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    private String statusMessage;

    public CsvActivityLog() {}

    public CsvActivityLog(Staff performedBy, CsvAction action, String fileName, LocalDateTime timestamp, String statusMessage) {
        this.performedBy = performedBy;
        this.action = action;
        this.fileName = fileName;
        this.timestamp = timestamp;
        this.statusMessage = statusMessage;
    }

    public CsvActivityLog(Long logId, Staff performedBy, CsvAction action, String fileName, LocalDateTime timestamp, String statusMessage) {
        this.logId = logId;
        this.performedBy = performedBy;
        this.action = action;
        this.fileName = fileName;
        this.timestamp = timestamp;
        this.statusMessage = statusMessage;
    }

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public Staff getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(Staff performedBy) {
        this.performedBy = performedBy;
    }

    public CsvAction getAction() {
        return action;
    }

    public void setAction(CsvAction action) {
        this.action = action;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    @Override
    public String toString() {
        return "CsvActivityLog{" +
                "logId=" + logId +
                ", performedBy=" + performedBy +
                ", action=" + action +
                ", fileName='" + fileName + '\'' +
                ", timestamp=" + timestamp +
                ", statusMessage='" + statusMessage + '\'' +
                '}';
    }
}
