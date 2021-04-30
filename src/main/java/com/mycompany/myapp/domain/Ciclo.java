package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ciclo.
 */
@Entity
@Table(name = "ciclo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ciclo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "clave")
    private String clave;

    @OneToMany(mappedBy = "ciclo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tutor", "centro", "empresa", "ciclo" }, allowSetters = true)
    private Set<Alumno> alumnos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "director", "tutors", "ciclos", "alumnos" }, allowSetters = true)
    private Centro centro;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ciclo id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Ciclo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClave() {
        return this.clave;
    }

    public Ciclo clave(String clave) {
        this.clave = clave;
        return this;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public Set<Alumno> getAlumnos() {
        return this.alumnos;
    }

    public Ciclo alumnos(Set<Alumno> alumnos) {
        this.setAlumnos(alumnos);
        return this;
    }

    public Ciclo addAlumno(Alumno alumno) {
        this.alumnos.add(alumno);
        alumno.setCiclo(this);
        return this;
    }

    public Ciclo removeAlumno(Alumno alumno) {
        this.alumnos.remove(alumno);
        alumno.setCiclo(null);
        return this;
    }

    public void setAlumnos(Set<Alumno> alumnos) {
        if (this.alumnos != null) {
            this.alumnos.forEach(i -> i.setCiclo(null));
        }
        if (alumnos != null) {
            alumnos.forEach(i -> i.setCiclo(this));
        }
        this.alumnos = alumnos;
    }

    public Centro getCentro() {
        return this.centro;
    }

    public Ciclo centro(Centro centro) {
        this.setCentro(centro);
        return this;
    }

    public void setCentro(Centro centro) {
        this.centro = centro;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ciclo)) {
            return false;
        }
        return id != null && id.equals(((Ciclo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ciclo{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", clave='" + getClave() + "'" +
            "}";
    }
}
