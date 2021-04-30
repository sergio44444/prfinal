package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Centro;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Centro}.
 */
public interface CentroService {
    /**
     * Save a centro.
     *
     * @param centro the entity to save.
     * @return the persisted entity.
     */
    Centro save(Centro centro);

    /**
     * Partially updates a centro.
     *
     * @param centro the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Centro> partialUpdate(Centro centro);

    /**
     * Get all the centros.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Centro> findAll(Pageable pageable);

    /**
     * Get the "id" centro.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Centro> findOne(Long id);

    /**
     * Delete the "id" centro.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
