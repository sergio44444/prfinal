package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Centro.
 */
@Entity
@Table(name = "centro")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Centro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "denominacion")
    private String denominacion;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "domicilio")
    private String domicilio;

    @Column(name = "localidad")
    private String localidad;

    @Column(name = "municipio")
    private String municipio;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "codigo_postal")
    private Integer codigoPostal;

    @JsonIgnoreProperties(value = { "centro" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Director director;

    @OneToMany(mappedBy = "centro")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "centro", "alumnos" }, allowSetters = true)
    private Set<Tutor> tutors = new HashSet<>();

    @OneToMany(mappedBy = "centro")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "alumnos", "centro" }, allowSetters = true)
    private Set<Ciclo> ciclos = new HashSet<>();

    @OneToMany(mappedBy = "centro")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tutor", "centro", "empresa", "ciclo" }, allowSetters = true)
    private Set<Alumno> alumnos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Centro id(Long id) {
        this.id = id;
        return this;
    }

    public String getDenominacion() {
        return this.denominacion;
    }

    public Centro denominacion(String denominacion) {
        this.denominacion = denominacion;
        return this;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Centro codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDomicilio() {
        return this.domicilio;
    }

    public Centro domicilio(String domicilio) {
        this.domicilio = domicilio;
        return this;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getLocalidad() {
        return this.localidad;
    }

    public Centro localidad(String localidad) {
        this.localidad = localidad;
        return this;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getMunicipio() {
        return this.municipio;
    }

    public Centro municipio(String municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getProvincia() {
        return this.provincia;
    }

    public Centro provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public Integer getCodigoPostal() {
        return this.codigoPostal;
    }

    public Centro codigoPostal(Integer codigoPostal) {
        this.codigoPostal = codigoPostal;
        return this;
    }

    public void setCodigoPostal(Integer codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public Director getDirector() {
        return this.director;
    }

    public Centro director(Director director) {
        this.setDirector(director);
        return this;
    }

    public void setDirector(Director director) {
        this.director = director;
    }

    public Set<Tutor> getTutors() {
        return this.tutors;
    }

    public Centro tutors(Set<Tutor> tutors) {
        this.setTutors(tutors);
        return this;
    }

    public Centro addTutor(Tutor tutor) {
        this.tutors.add(tutor);
        tutor.setCentro(this);
        return this;
    }

    public Centro removeTutor(Tutor tutor) {
        this.tutors.remove(tutor);
        tutor.setCentro(null);
        return this;
    }

    public void setTutors(Set<Tutor> tutors) {
        if (this.tutors != null) {
            this.tutors.forEach(i -> i.setCentro(null));
        }
        if (tutors != null) {
            tutors.forEach(i -> i.setCentro(this));
        }
        this.tutors = tutors;
    }

    public Set<Ciclo> getCiclos() {
        return this.ciclos;
    }

    public Centro ciclos(Set<Ciclo> ciclos) {
        this.setCiclos(ciclos);
        return this;
    }

    public Centro addCiclo(Ciclo ciclo) {
        this.ciclos.add(ciclo);
        ciclo.setCentro(this);
        return this;
    }

    public Centro removeCiclo(Ciclo ciclo) {
        this.ciclos.remove(ciclo);
        ciclo.setCentro(null);
        return this;
    }

    public void setCiclos(Set<Ciclo> ciclos) {
        if (this.ciclos != null) {
            this.ciclos.forEach(i -> i.setCentro(null));
        }
        if (ciclos != null) {
            ciclos.forEach(i -> i.setCentro(this));
        }
        this.ciclos = ciclos;
    }

    public Set<Alumno> getAlumnos() {
        return this.alumnos;
    }

    public Centro alumnos(Set<Alumno> alumnos) {
        this.setAlumnos(alumnos);
        return this;
    }

    public Centro addAlumno(Alumno alumno) {
        this.alumnos.add(alumno);
        alumno.setCentro(this);
        return this;
    }

    public Centro removeAlumno(Alumno alumno) {
        this.alumnos.remove(alumno);
        alumno.setCentro(null);
        return this;
    }

    public void setAlumnos(Set<Alumno> alumnos) {
        if (this.alumnos != null) {
            this.alumnos.forEach(i -> i.setCentro(null));
        }
        if (alumnos != null) {
            alumnos.forEach(i -> i.setCentro(this));
        }
        this.alumnos = alumnos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Centro)) {
            return false;
        }
        return id != null && id.equals(((Centro) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Centro{" +
            "id=" + getId() +
            ", denominacion='" + getDenominacion() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", domicilio='" + getDomicilio() + "'" +
            ", localidad='" + getLocalidad() + "'" +
            ", municipio='" + getMunicipio() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", codigoPostal=" + getCodigoPostal() +
            "}";
    }
}
