package com.mycompany.myapp.criteriaAlumno;

import com.mycompany.myapp.domain.Alumno;
import com.mycompany.myapp.domain.Alumno_;
import com.mycompany.myapp.domain.Ciclo;
import com.mycompany.myapp.domain.Ciclo_;
import javax.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public class CriteriaAlumno {

    public static Specification<Alumno> getAlumnosxciclo(String clave) {
        if (clave == null) {
            return null;
        }
        return new Specification<Alumno>() {
            @Override
            public Predicate toPredicate(Root<Alumno> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Join<Alumno, Ciclo> cicloxclave = root.join(Alumno_.ciclo);

                Predicate equalPredicate = criteriaBuilder.like(cicloxclave.get(Ciclo_.CLAVE), "%" + clave + "%");

                return equalPredicate;
            }
        };
    }
}
