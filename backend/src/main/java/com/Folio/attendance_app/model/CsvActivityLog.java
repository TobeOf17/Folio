package com.Folio.attendance_app.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "csv_activity_log")
public class CsvActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;

    @Column(nullable = false)
    private String performedByEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CsvAction action;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    private String statusMessage;

    public CsvActivityLog() {}

    public CsvActivityLog(String performedByEmail, CsvAction action, String fileName, LocalDateTime timestamp, String statusMessage) {
        this.performedByEmail = performedByEmail;
        this.action = action;
        this.fileName = fileName;
        this.timestamp = timestamp;
        this.statusMessage = statusMessage;
    }

    public CsvActivityLog(int logId, String performedByEmail, CsvAction action, String fileName, LocalDateTime timestamp, String statusMessage) {
        this.logId = logId;
        this.performedByEmail = performedByEmail;
        this.action = action;
        this.fileName = fileName;
        this.timestamp = timestamp;
        this.statusMessage = statusMessage;
    }

    public int getLogId() {
        return logId;
    }

    public void setLogId(int logId) {
        this.logId = logId;
    }

    public String getPerformedByEmail() {
        return performedByEmail;
    }

    public void setPerformedByEmail(String performedByEmail) {
        this.performedByEmail = performedByEmail;
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
                ", performedByEmail='" + performedByEmail + '\'' +
                ", action=" + action +
                ", fileName='" + fileName + '\'' +
                ", timestamp=" + timestamp +
                ", statusMessage='" + statusMessage + '\'' +
                '}';
    }
}
