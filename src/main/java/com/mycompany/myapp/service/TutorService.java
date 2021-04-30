package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Tutor;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Tutor}.
 */
public interface TutorService {
    /**
     * Save a tutor.
     *
     * @param tutor the entity to save.
     * @return the persisted entity.
     */
    Tutor save(Tutor tutor);

    /**
     * Partially updates a tutor.
     *
     * @param tutor the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Tutor> partialUpdate(Tutor tutor);

    /**
     * Get all the tutors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Tutor> findAll(Pageable pageable);

    /**
     * Get the "id" tutor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Tutor> findOne(Long id);

    /**
     * Delete the "id" tutor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
