package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Ciclo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Ciclo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CicloRepository extends JpaRepository<Ciclo, Long> {}
