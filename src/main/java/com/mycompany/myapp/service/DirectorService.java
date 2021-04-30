package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Director;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Director}.
 */
public interface DirectorService {
    /**
     * Save a director.
     *
     * @param director the entity to save.
     * @return the persisted entity.
     */
    Director save(Director director);

    /**
     * Partially updates a director.
     *
     * @param director the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Director> partialUpdate(Director director);

    /**
     * Get all the directors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Director> findAll(Pageable pageable);
    /**
     * Get all the Director where Centro is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Director> findAllWhereCentroIsNull();

    /**
     * Get the "id" director.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Director> findOne(Long id);

    /**
     * Delete the "id" director.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
