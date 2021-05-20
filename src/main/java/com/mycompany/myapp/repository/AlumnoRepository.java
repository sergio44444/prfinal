package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Alumno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Alumno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long>, JpaSpecificationExecutor<Alumno> {
    @Query("from Alumno u where u.dni=:dni")
    Page<Alumno> findByDni(Pageable pageable, @Param("dni") String dni);
}
