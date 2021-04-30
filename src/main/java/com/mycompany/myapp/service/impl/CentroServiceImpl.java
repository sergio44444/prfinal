package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Centro;
import com.mycompany.myapp.repository.CentroRepository;
import com.mycompany.myapp.service.CentroService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Centro}.
 */
@Service
@Transactional
public class CentroServiceImpl implements CentroService {

    private final Logger log = LoggerFactory.getLogger(CentroServiceImpl.class);

    private final CentroRepository centroRepository;

    public CentroServiceImpl(CentroRepository centroRepository) {
        this.centroRepository = centroRepository;
    }

    @Override
    public Centro save(Centro centro) {
        log.debug("Request to save Centro : {}", centro);
        return centroRepository.save(centro);
    }

    @Override
    public Optional<Centro> partialUpdate(Centro centro) {
        log.debug("Request to partially update Centro : {}", centro);

        return centroRepository
            .findById(centro.getId())
            .map(
                existingCentro -> {
                    if (centro.getDenominacion() != null) {
                        existingCentro.setDenominacion(centro.getDenominacion());
                    }
                    if (centro.getCodigo() != null) {
                        existingCentro.setCodigo(centro.getCodigo());
                    }
                    if (centro.getDomicilio() != null) {
                        existingCentro.setDomicilio(centro.getDomicilio());
                    }
                    if (centro.getLocalidad() != null) {
                        existingCentro.setLocalidad(centro.getLocalidad());
                    }
                    if (centro.getMunicipio() != null) {
                        existingCentro.setMunicipio(centro.getMunicipio());
                    }
                    if (centro.getProvincia() != null) {
                        existingCentro.setProvincia(centro.getProvincia());
                    }
                    if (centro.getCodigoPostal() != null) {
                        existingCentro.setCodigoPostal(centro.getCodigoPostal());
                    }

                    return existingCentro;
                }
            )
            .map(centroRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Centro> findAll(Pageable pageable) {
        log.debug("Request to get all Centros");
        return centroRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Centro> findOne(Long id) {
        log.debug("Request to get Centro : {}", id);
        return centroRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Centro : {}", id);
        centroRepository.deleteById(id);
    }
}
