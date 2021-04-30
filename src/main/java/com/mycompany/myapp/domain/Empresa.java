package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Empresa.
 */
@Entity
@Table(name = "empresa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_convenio")
    private String numeroConvenio;

    @Column(name = "localidad")
    private String localidad;

    @Column(name = "tutor")
    private String tutor;

    @OneToMany(mappedBy = "empresa")
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

    public Empresa id(Long id) {
        this.id = id;
        return this;
    }

    public String getNumeroConvenio() {
        return this.numeroConvenio;
    }

    public Empresa numeroConvenio(String numeroConvenio) {
        this.numeroConvenio = numeroConvenio;
        return this;
    }

    public void setNumeroConvenio(String numeroConvenio) {
        this.numeroConvenio = numeroConvenio;
    }

    public String getLocalidad() {
        return this.localidad;
    }

    public Empresa localidad(String localidad) {
        this.localidad = localidad;
        return this;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getTutor() {
        return this.tutor;
    }

    public Empresa tutor(String tutor) {
        this.tutor = tutor;
        return this;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

    public Set<Alumno> getAlumnos() {
        return this.alumnos;
    }

    public Empresa alumnos(Set<Alumno> alumnos) {
        this.setAlumnos(alumnos);
        return this;
    }

    public Empresa addAlumno(Alumno alumno) {
        this.alumnos.add(alumno);
        alumno.setEmpresa(this);
        return this;
    }

    public Empresa removeAlumno(Alumno alumno) {
        this.alumnos.remove(alumno);
        alumno.setEmpresa(null);
        return this;
    }

    public void setAlumnos(Set<Alumno> alumnos) {
        if (this.alumnos != null) {
            this.alumnos.forEach(i -> i.setEmpresa(null));
        }
        if (alumnos != null) {
            alumnos.forEach(i -> i.setEmpresa(this));
        }
        this.alumnos = alumnos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empresa)) {
            return false;
        }
        return id != null && id.equals(((Empresa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empresa{" +
            "id=" + getId() +
            ", numeroConvenio='" + getNumeroConvenio() + "'" +
            ", localidad='" + getLocalidad() + "'" +
            ", tutor='" + getTutor() + "'" +
            "}";
    }
}
