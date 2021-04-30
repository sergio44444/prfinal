package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.criteriaAlumno.CriteriaAlumno;
import com.mycompany.myapp.domain.Alumno;
import com.mycompany.myapp.repository.AlumnoRepository;
import com.mycompany.myapp.service.AlumnoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Alumno}.
 */
@Service
@Transactional
public class AlumnoServiceImpl implements AlumnoService {

    private final Logger log = LoggerFactory.getLogger(AlumnoServiceImpl.class);

    private final AlumnoRepository alumnoRepository;

    public AlumnoServiceImpl(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    @Override
    public Alumno save(Alumno alumno) {
        log.debug("Request to save Alumno : {}", alumno);
        return alumnoRepository.save(alumno);
    }

    @Override
    public Optional<Alumno> partialUpdate(Alumno alumno) {
        log.debug("Request to partially update Alumno : {}", alumno);

        return alumnoRepository
            .findById(alumno.getId())
            .map(
                existingAlumno -> {
                    if (alumno.getDni() != null) {
                        existingAlumno.setDni(alumno.getDni());
                    }
                    if (alumno.getNombre() != null) {
                        existingAlumno.setNombre(alumno.getNombre());
                    }
                    if (alumno.getApellido() != null) {
                        existingAlumno.setApellido(alumno.getApellido());
                    }

                    return existingAlumno;
                }
            )
            .map(alumnoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Alumno> findAll(String clave, Pageable pageable) {
        log.debug("Request to get all Alumnos");
        return alumnoRepository.findAll(CriteriaAlumno.getAlumnosxciclo(clave), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Alumno> findOne(Long id) {
        log.debug("Request to get Alumno : {}", id);
        return alumnoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Alumno : {}", id);
        alumnoRepository.deleteById(id);
    }
}
