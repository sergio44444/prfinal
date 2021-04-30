package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Director;
import com.mycompany.myapp.repository.DirectorRepository;
import com.mycompany.myapp.service.DirectorService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Director}.
 */
@Service
@Transactional
public class DirectorServiceImpl implements DirectorService {

    private final Logger log = LoggerFactory.getLogger(DirectorServiceImpl.class);

    private final DirectorRepository directorRepository;

    public DirectorServiceImpl(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    @Override
    public Director save(Director director) {
        log.debug("Request to save Director : {}", director);
        return directorRepository.save(director);
    }

    @Override
    public Optional<Director> partialUpdate(Director director) {
        log.debug("Request to partially update Director : {}", director);

        return directorRepository
            .findById(director.getId())
            .map(
                existingDirector -> {
                    if (director.getDni() != null) {
                        existingDirector.setDni(director.getDni());
                    }
                    if (director.getNombre() != null) {
                        existingDirector.setNombre(director.getNombre());
                    }
                    if (director.getApellido() != null) {
                        existingDirector.setApellido(director.getApellido());
                    }

                    return existingDirector;
                }
            )
            .map(directorRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Director> findAll(Pageable pageable) {
        log.debug("Request to get all Directors");
        return directorRepository.findAll(pageable);
    }

    /**
     *  Get all the directors where Centro is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Director> findAllWhereCentroIsNull() {
        log.debug("Request to get all directors where Centro is null");
        return StreamSupport
            .stream(directorRepository.findAll().spliterator(), false)
            .filter(director -> director.getCentro() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Director> findOne(Long id) {
        log.debug("Request to get Director : {}", id);
        return directorRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Director : {}", id);
        directorRepository.deleteById(id);
    }
}
