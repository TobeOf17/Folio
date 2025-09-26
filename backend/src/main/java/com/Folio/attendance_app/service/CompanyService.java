package com.Folio.attendance_app.service;

import com.Folio.attendance_app.model.Company;
import com.Folio.attendance_app.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    /**
     * Create a new company
     */
    public Company createCompany(Company company) {
        // Check if company name already exists
        if (companyRepository.findByName(company.getName()).isPresent()) {
            throw new RuntimeException("Company with name '" + company.getName() + "' already exists");
        }
        return companyRepository.save(company);
    }

    /**
     * Get company by ID
     */
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    /**
     * Get company by name
     */
    public Company getCompanyByName(String name) {
        return companyRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Company not found with name: " + name));
    }

    /**
     * Get all companies
     */
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /**
     * Update company
     */
    public Company updateCompany(Long id, Company updatedCompany) {
        Company existingCompany = getCompanyById(id);

        // Check name uniqueness if changing
        if (!existingCompany.getName().equals(updatedCompany.getName())) {
            Optional<Company> companyWithName = companyRepository.findByName(updatedCompany.getName());
            if (companyWithName.isPresent() && !companyWithName.get().getId().equals(id)) {
                throw new RuntimeException("Company with name '" + updatedCompany.getName() + "' already exists");
            }
        }

        existingCompany.setName(updatedCompany.getName());
        existingCompany.setIndustry(updatedCompany.getIndustry());
        return companyRepository.save(existingCompany);
    }

    /**
     * Delete company
     */
    public void deleteCompany(Long id) {
        Company company = getCompanyById(id);
        
        // Check if company has staff members
        if (!company.getStaff().isEmpty()) {
            throw new RuntimeException("Cannot delete company '" + company.getName() + 
                    "' because it has " + company.getStaff().size() + " staff member(s)");
        }
        
        companyRepository.delete(company);
    }
}