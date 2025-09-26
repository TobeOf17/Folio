package com.Folio.attendance_app.repository;

import com.Folio.attendance_app.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    /**
     * Find company by name
     */
    Optional<Company> findByName(String name);

    /**
     * Find company by name (case-insensitive)
     */
    Optional<Company> findByNameIgnoreCase(String name);

    /**
     * Check if company exists by name
     */
    boolean existsByName(String name);

    /**
     * Check if company exists by name (case-insensitive)
     */
    boolean existsByNameIgnoreCase(String name);
}