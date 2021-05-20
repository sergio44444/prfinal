package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Alumno;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

/**
 * Service Interface for managing {@link Alumno}.
 */
public interface AlumnoService {
    /**
     * Save a alumno.
     *
     * @param alumno the entity to save.
     * @return the persisted entity.
     */
    Alumno save(Alumno alumno);

    /**
     * Partially updates a alumno.
     *
     * @param alumno the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Alumno> partialUpdate(Alumno alumno);

    /**
     * Get all the alumnos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Alumno> findAll(String clave, Pageable pageable);

    /**
     * Get the "id" alumno.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Alumno> findOne(Long id);

    /**
     * Delete the "id" alumno.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Page<Alumno> findByDni(Pageable pageable, @Param("dni") String dni);
}
