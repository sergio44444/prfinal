package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Alumno;
import com.mycompany.myapp.service.mapper.GenerarPDFService;
import com.mysql.cj.log.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GenerarPDFServiceImpl implements GenerarPDFService {

    private final Logger log = LoggerFactory.getLogger(GenerarPDFService.class);

    @Override
    public void generar(Alumno alumno) {
        log.debug("REST request to save Alumno : {}", alumno);
    }
}
