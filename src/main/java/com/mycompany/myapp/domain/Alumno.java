package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Alumno.
 */
@Entity
@Table(name = "alumno")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Alumno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dni")
    private String dni;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @ManyToOne
    @JsonIgnoreProperties(value = { "centro", "alumnos" }, allowSetters = true)
    private Tutor tutor;

    @ManyToOne
    @JsonIgnoreProperties(value = { "director", "tutors", "ciclos", "alumnos" }, allowSetters = true)
    private Centro centro;

    @ManyToOne
    @JsonIgnoreProperties(value = { "alumnos" }, allowSetters = true)
    private Empresa empresa;

    @ManyToOne
    @JsonIgnoreProperties(value = { "alumnos", "centro" }, allowSetters = true)
    private Ciclo ciclo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Alumno id(Long id) {
        this.id = id;
        return this;
    }

    public String getDni() {
        return this.dni;
    }

    public Alumno dni(String dni) {
        this.dni = dni;
        return this;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Alumno nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public Alumno apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Tutor getTutor() {
        return this.tutor;
    }

    public Alumno tutor(Tutor tutor) {
        this.setTutor(tutor);
        return this;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public Centro getCentro() {
        return this.centro;
    }

    public Alumno centro(Centro centro) {
        this.setCentro(centro);
        return this;
    }

    public void setCentro(Centro centro) {
        this.centro = centro;
    }

    public Empresa getEmpresa() {
        return this.empresa;
    }

    public Alumno empresa(Empresa empresa) {
        this.setEmpresa(empresa);
        return this;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Ciclo getCiclo() {
        return this.ciclo;
    }

    public Alumno ciclo(Ciclo ciclo) {
        this.setCiclo(ciclo);
        return this;
    }

    public void setCiclo(Ciclo ciclo) {
        this.ciclo = ciclo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Alumno)) {
            return false;
        }
        return id != null && id.equals(((Alumno) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Alumno{" +
            "id=" + getId() +
            ", dni='" + getDni() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            "}";
    }
}
