package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.CsvActivityLog;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.model.CsvAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CsvActivityLogRepository extends JpaRepository<CsvActivityLog, Long> {

List<CsvActivityLog> findByPerformedBy(Staff performedBy);
List<CsvActivityLog> findByPerformedByAndAction(Staff performedBy, CsvAction action);
long countByPerformedBy(Staff performedBy);

// Keep these essential time-based queries:
@Query("SELECT c FROM CsvActivityLog c WHERE c.timestamp >= :since ORDER BY c.timestamp DESC")
List<CsvActivityLog> findRecentLogs(@Param("since") LocalDateTime since);

@Query("SELECT c FROM CsvActivityLog c WHERE DATE(c.timestamp) = CURRENT_DATE ORDER BY c.timestamp DESC")
List<CsvActivityLog> findTodaysLogs();
}