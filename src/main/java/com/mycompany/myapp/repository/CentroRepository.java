package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Centro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Centro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CentroRepository extends JpaRepository<Centro, Long> {}
