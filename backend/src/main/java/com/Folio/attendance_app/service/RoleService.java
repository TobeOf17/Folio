package com.Folio.attendance_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Folio.attendance_app.model.Role;
import com.Folio.attendance_app.model.Staff;
import com.Folio.attendance_app.repository.RoleRepository;
import com.Folio.attendance_app.repository.StaffRepository;


@Service  
public class RoleService {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private StaffRepository staffRepository;

    public Role createRole(Role role) {
        if (roleRepository.existsByNameIgnoreCase(role.getName())) {
            throw new RuntimeException("Role with name '" + role.getName() + "' already exists");
        }
        return roleRepository.save(role);
    }

    public long getRoleCount() {
    return roleRepository.count();
}

    public Role getRoleById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
    }

    public Role getRoleByName(String name) {
        return roleRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Role not found with name: " + name));
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAllByOrderByNameAsc();
    }

    public Role updateRole(Long id, Role updatedRole) {
        Role existingRole = getRoleById(id);

        if (!existingRole.getName().equalsIgnoreCase(updatedRole.getName())) {
            if (roleRepository.existsByNameIgnoreCase(updatedRole.getName())) {
                throw new RuntimeException("Role with name '" + updatedRole.getName() + "' already exists");
            }
        }

        existingRole.setName(updatedRole.getName());
        return roleRepository.save(existingRole);
    }

    public void deleteRole(Long id) {
        Role role = getRoleById(id);

        List<Staff> staffWithRole = staffRepository.findByRole(role);
        if (!staffWithRole.isEmpty()) {
            throw new RuntimeException("Cannot delete role '" + role.getName() +
                    "' because it is assigned to " + staffWithRole.size() + " staff member(s)");
        }

        roleRepository.delete(role);
    }

}
