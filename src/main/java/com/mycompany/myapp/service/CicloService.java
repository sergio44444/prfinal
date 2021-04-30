package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Ciclo;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Ciclo}.
 */
public interface CicloService {
    /**
     * Save a ciclo.
     *
     * @param ciclo the entity to save.
     * @return the persisted entity.
     */
    Ciclo save(Ciclo ciclo);

    /**
     * Partially updates a ciclo.
     *
     * @param ciclo the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Ciclo> partialUpdate(Ciclo ciclo);

    /**
     * Get all the ciclos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Ciclo> findAll(Pageable pageable);

    /**
     * Get the "id" ciclo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Ciclo> findOne(Long id);

    /**
     * Delete the "id" ciclo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
