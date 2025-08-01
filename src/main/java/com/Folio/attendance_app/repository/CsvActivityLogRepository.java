package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.CsvActivityLog;
import com.Folio.attendance_app.model.CsvAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CsvActivityLogRepository extends JpaRepository<CsvActivityLog, Integer> {

    // Find logs by user email
    List<CsvActivityLog> findByPerformedByEmail(String performedByEmail);

    // Find logs by action type
    List<CsvActivityLog> findByAction(CsvAction action);

    // Find logs by file name
    List<CsvActivityLog> findByFileName(String fileName);

    // Find logs by user and action
    List<CsvActivityLog> findByPerformedByEmailAndAction(String performedByEmail, CsvAction action);

    // Find logs within timestamp range
    List<CsvActivityLog> findByTimestampBetween(LocalDateTime startTime, LocalDateTime endTime);

    // Find logs by user within timestamp range
    List<CsvActivityLog> findByPerformedByEmailAndTimestampBetween(String performedByEmail,
                                                                   LocalDateTime startTime,
                                                                   LocalDateTime endTime);

    // Find logs by action within timestamp range
    List<CsvActivityLog> findByActionAndTimestampBetween(CsvAction action,
                                                         LocalDateTime startTime,
                                                         LocalDateTime endTime);

    // Find recent logs (last 24 hours)
    @Query("SELECT c FROM CsvActivityLog c WHERE c.timestamp >= :since ORDER BY c.timestamp DESC")
    List<CsvActivityLog> findRecentLogs(@Param("since") LocalDateTime since);

    // Find recent logs by user
    @Query("SELECT c FROM CsvActivityLog c WHERE c.performedByEmail = :email AND " +
            "c.timestamp >= :since ORDER BY c.timestamp DESC")
    List<CsvActivityLog> findRecentLogsByUser(@Param("email") String email,
                                              @Param("since") LocalDateTime since);

    // Find logs with specific status message pattern
    List<CsvActivityLog> findByStatusMessageContainingIgnoreCase(String statusPattern);

    // Find failed operations (logs with error messages)
    @Query("SELECT c FROM CsvActivityLog c WHERE " +
            "LOWER(c.statusMessage) LIKE '%error%' OR LOWER(c.statusMessage) LIKE '%failed%' " +
            "ORDER BY c.timestamp DESC")
    List<CsvActivityLog> findFailedOperations();

    // Find successful operations
    @Query("SELECT c FROM CsvActivityLog c WHERE " +
            "LOWER(c.statusMessage) LIKE '%success%' OR LOWER(c.statusMessage) LIKE '%completed%' " +
            "ORDER BY c.timestamp DESC")
    List<CsvActivityLog> findSuccessfulOperations();

    // Get all logs ordered by timestamp (newest first)
    List<CsvActivityLog> findAllByOrderByTimestampDesc();

    // Get all logs ordered by timestamp (oldest first)
    List<CsvActivityLog> findAllByOrderByTimestampAsc();

    // Count logs by action
    long countByAction(CsvAction action);

    // Count logs by user
    long countByPerformedByEmail(String performedByEmail);

    // Count logs within timestamp range
    long countByTimestampBetween(LocalDateTime startTime, LocalDateTime endTime);

    // Find logs for today
    @Query("SELECT c FROM CsvActivityLog c WHERE DATE(c.timestamp) = CURRENT_DATE ORDER BY c.timestamp DESC")
    List<CsvActivityLog> findTodaysLogs();

    // Find logs by user for today
    @Query("SELECT c FROM CsvActivityLog c WHERE c.performedByEmail = :email AND " +
            "DATE(c.timestamp) = CURRENT_DATE ORDER BY c.timestamp DESC")
    List<CsvActivityLog> findTodaysLogsByUser(@Param("email") String email);

    // Get activity summary by action (count per action type)
    @Query("SELECT c.action, COUNT(c) FROM CsvActivityLog c GROUP BY c.action")
    List<Object[]> getActivitySummaryByAction();

    // Get activity summary by user (count per user)
    @Query("SELECT c.performedByEmail, COUNT(c) FROM CsvActivityLog c GROUP BY c.performedByEmail ORDER BY COUNT(c) DESC")
    List<Object[]> getActivitySummaryByUser();

    // Get hourly activity for today
    @Query("SELECT HOUR(c.timestamp), COUNT(c) FROM CsvActivityLog c WHERE " +
            "DATE(c.timestamp) = CURRENT_DATE GROUP BY HOUR(c.timestamp) ORDER BY HOUR(c.timestamp)")
    List<Object[]> getTodaysHourlyActivity();

    // Find most active users
    @Query("SELECT c.performedByEmail, COUNT(c) as activityCount FROM CsvActivityLog c " +
            "GROUP BY c.performedByEmail ORDER BY activityCount DESC")
    List<Object[]> findMostActiveUsers();

    // Find most processed files
    @Query("SELECT c.fileName, COUNT(c) as processCount FROM CsvActivityLog c " +
            "GROUP BY c.fileName ORDER BY processCount DESC")
    List<Object[]> findMostProcessedFiles();

    // Custom search for logs
    @Query("SELECT c FROM CsvActivityLog c WHERE " +
            "(:email IS NULL OR LOWER(c.performedByEmail) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "(:action IS NULL OR c.action = :action) AND " +
            "(:fileName IS NULL OR LOWER(c.fileName) LIKE LOWER(CONCAT('%', :fileName, '%'))) AND " +
            "(:fromTime IS NULL OR c.timestamp >= :fromTime) AND " +
            "(:toTime IS NULL OR c.timestamp <= :toTime) AND " +
            "(:statusMessage IS NULL OR LOWER(c.statusMessage) LIKE LOWER(CONCAT('%', :statusMessage, '%'))) " +
            "ORDER BY c.timestamp DESC")
    List<CsvActivityLog> searchLogs(@Param("email") String email,
                                    @Param("action") CsvAction action,
                                    @Param("fileName") String fileName,
                                    @Param("fromTime") LocalDateTime fromTime,
                                    @Param("toTime") LocalDateTime toTime,
                                    @Param("statusMessage") String statusMessage);

    // Delete old logs (cleanup utility)
    @Modifying
    @Query("DELETE FROM CsvActivityLog c WHERE c.timestamp < :cutoffTime")
    void deleteLogsOlderThan(@Param("cutoffTime") LocalDateTime cutoffTime);
}