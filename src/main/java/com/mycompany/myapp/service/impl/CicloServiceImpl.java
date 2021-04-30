package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Ciclo;
import com.mycompany.myapp.repository.CicloRepository;
import com.mycompany.myapp.service.CicloService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Ciclo}.
 */
@Service
@Transactional
public class CicloServiceImpl implements CicloService {

    private final Logger log = LoggerFactory.getLogger(CicloServiceImpl.class);

    private final CicloRepository cicloRepository;

    public CicloServiceImpl(CicloRepository cicloRepository) {
        this.cicloRepository = cicloRepository;
    }

    @Override
    public Ciclo save(Ciclo ciclo) {
        log.debug("Request to save Ciclo : {}", ciclo);
        return cicloRepository.save(ciclo);
    }

    @Override
    public Optional<Ciclo> partialUpdate(Ciclo ciclo) {
        log.debug("Request to partially update Ciclo : {}", ciclo);

        return cicloRepository
            .findById(ciclo.getId())
            .map(
                existingCiclo -> {
                    if (ciclo.getNombre() != null) {
                        existingCiclo.setNombre(ciclo.getNombre());
                    }
                    if (ciclo.getClave() != null) {
                        existingCiclo.setClave(ciclo.getClave());
                    }

                    return existingCiclo;
                }
            )
            .map(cicloRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Ciclo> findAll(Pageable pageable) {
        log.debug("Request to get all Ciclos");
        return cicloRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Ciclo> findOne(Long id) {
        log.debug("Request to get Ciclo : {}", id);
        return cicloRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ciclo : {}", id);
        cicloRepository.deleteById(id);
    }
}
