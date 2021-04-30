package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Centro;
import com.mycompany.myapp.repository.CentroRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CentroResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CentroResourceIT {

    private static final String DEFAULT_DENOMINACION = "AAAAAAAAAA";
    private static final String UPDATED_DENOMINACION = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_DOMICILIO = "AAAAAAAAAA";
    private static final String UPDATED_DOMICILIO = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_LOCALIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_MUNICIPIO = "AAAAAAAAAA";
    private static final String UPDATED_MUNICIPIO = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    private static final Integer DEFAULT_CODIGO_POSTAL = 1;
    private static final Integer UPDATED_CODIGO_POSTAL = 2;

    private static final String ENTITY_API_URL = "/api/centros";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CentroRepository centroRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCentroMockMvc;

    private Centro centro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Centro createEntity(EntityManager em) {
        Centro centro = new Centro()
            .denominacion(DEFAULT_DENOMINACION)
            .codigo(DEFAULT_CODIGO)
            .domicilio(DEFAULT_DOMICILIO)
            .localidad(DEFAULT_LOCALIDAD)
            .municipio(DEFAULT_MUNICIPIO)
            .provincia(DEFAULT_PROVINCIA)
            .codigoPostal(DEFAULT_CODIGO_POSTAL);
        return centro;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Centro createUpdatedEntity(EntityManager em) {
        Centro centro = new Centro()
            .denominacion(UPDATED_DENOMINACION)
            .codigo(UPDATED_CODIGO)
            .domicilio(UPDATED_DOMICILIO)
            .localidad(UPDATED_LOCALIDAD)
            .municipio(UPDATED_MUNICIPIO)
            .provincia(UPDATED_PROVINCIA)
            .codigoPostal(UPDATED_CODIGO_POSTAL);
        return centro;
    }

    @BeforeEach
    public void initTest() {
        centro = createEntity(em);
    }

    @Test
    @Transactional
    void createCentro() throws Exception {
        int databaseSizeBeforeCreate = centroRepository.findAll().size();
        // Create the Centro
        restCentroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(centro)))
            .andExpect(status().isCreated());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeCreate + 1);
        Centro testCentro = centroList.get(centroList.size() - 1);
        assertThat(testCentro.getDenominacion()).isEqualTo(DEFAULT_DENOMINACION);
        assertThat(testCentro.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testCentro.getDomicilio()).isEqualTo(DEFAULT_DOMICILIO);
        assertThat(testCentro.getLocalidad()).isEqualTo(DEFAULT_LOCALIDAD);
        assertThat(testCentro.getMunicipio()).isEqualTo(DEFAULT_MUNICIPIO);
        assertThat(testCentro.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
        assertThat(testCentro.getCodigoPostal()).isEqualTo(DEFAULT_CODIGO_POSTAL);
    }

    @Test
    @Transactional
    void createCentroWithExistingId() throws Exception {
        // Create the Centro with an existing ID
        centro.setId(1L);

        int databaseSizeBeforeCreate = centroRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCentroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(centro)))
            .andExpect(status().isBadRequest());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCentros() throws Exception {
        // Initialize the database
        centroRepository.saveAndFlush(centro);

        // Get all the centroList
        restCentroMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centro.getId().intValue())))
            .andExpect(jsonPath("$.[*].denominacion").value(hasItem(DEFAULT_DENOMINACION)))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].domicilio").value(hasItem(DEFAULT_DOMICILIO)))
            .andExpect(jsonPath("$.[*].localidad").value(hasItem(DEFAULT_LOCALIDAD)))
            .andExpect(jsonPath("$.[*].municipio").value(hasItem(DEFAULT_MUNICIPIO)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)))
            .andExpect(jsonPath("$.[*].codigoPostal").value(hasItem(DEFAULT_CODIGO_POSTAL)));
    }

    @Test
    @Transactional
    void getCentro() throws Exception {
        // Initialize the database
        centroRepository.saveAndFlush(centro);

        // Get the centro
        restCentroMockMvc
            .perform(get(ENTITY_API_URL_ID, centro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(centro.getId().intValue()))
            .andExpect(jsonPath("$.denominacion").value(DEFAULT_DENOMINACION))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.domicilio").value(DEFAULT_DOMICILIO))
            .andExpect(jsonPath("$.localidad").value(DEFAULT_LOCALIDAD))
            .andExpect(jsonPath("$.municipio").value(DEFAULT_MUNICIPIO))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA))
            .andExpect(jsonPath("$.codigoPostal").value(DEFAULT_CODIGO_POSTAL));
    }

    @Test
    @Transactional
    void getNonExistingCentro() throws Exception {
        // Get the centro
        restCentroMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCentro() throws Exception {
        // Initialize the database
        centroRepository.saveAndFlush(centro);

        int databaseSizeBeforeUpdate = centroRepository.findAll().size();

        // Update the centro
        Centro updatedCentro = centroRepository.findById(centro.getId()).get();
        // Disconnect from session so that the updates on updatedCentro are not directly saved in db
        em.detach(updatedCentro);
        updatedCentro
            .denominacion(UPDATED_DENOMINACION)
            .codigo(UPDATED_CODIGO)
            .domicilio(UPDATED_DOMICILIO)
            .localidad(UPDATED_LOCALIDAD)
            .municipio(UPDATED_MUNICIPIO)
            .provincia(UPDATED_PROVINCIA)
            .codigoPostal(UPDATED_CODIGO_POSTAL);

        restCentroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCentro.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCentro))
            )
            .andExpect(status().isOk());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
        Centro testCentro = centroList.get(centroList.size() - 1);
        assertThat(testCentro.getDenominacion()).isEqualTo(UPDATED_DENOMINACION);
        assertThat(testCentro.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCentro.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testCentro.getLocalidad()).isEqualTo(UPDATED_LOCALIDAD);
        assertThat(testCentro.getMunicipio()).isEqualTo(UPDATED_MUNICIPIO);
        assertThat(testCentro.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testCentro.getCodigoPostal()).isEqualTo(UPDATED_CODIGO_POSTAL);
    }

    @Test
    @Transactional
    void putNonExistingCentro() throws Exception {
        int databaseSizeBeforeUpdate = centroRepository.findAll().size();
        centro.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCentroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, centro.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(centro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCentro() throws Exception {
        int databaseSizeBeforeUpdate = centroRepository.findAll().size();
        centro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCentroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(centro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCentro() throws Exception {
        int databaseSizeBeforeUpdate = centroRepository.findAll().size();
        centro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCentroMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(centro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCentroWithPatch() throws Exception {
        // Initialize the database
        centroRepository.saveAndFlush(centro);

        int databaseSizeBeforeUpdate = centroRepository.findAll().size();

        // Update the centro using partial update
        Centro partialUpdatedCentro = new Centro();
        partialUpdatedCentro.setId(centro.getId());

        partialUpdatedCentro
            .denominacion(UPDATED_DENOMINACION)
            .codigo(UPDATED_CODIGO)
            .domicilio(UPDATED_DOMICILIO)
            .municipio(UPDATED_MUNICIPIO)
            .provincia(UPDATED_PROVINCIA);

        restCentroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCentro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCentro))
            )
            .andExpect(status().isOk());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
        Centro testCentro = centroList.get(centroList.size() - 1);
        assertThat(testCentro.getDenominacion()).isEqualTo(UPDATED_DENOMINACION);
        assertThat(testCentro.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCentro.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testCentro.getLocalidad()).isEqualTo(DEFAULT_LOCALIDAD);
        assertThat(testCentro.getMunicipio()).isEqualTo(UPDATED_MUNICIPIO);
        assertThat(testCentro.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testCentro.getCodigoPostal()).isEqualTo(DEFAULT_CODIGO_POSTAL);
    }

    @Test
    @Transactional
    void fullUpdateCentroWithPatch() throws Exception {
        // Initialize the database
        centroRepository.saveAndFlush(centro);

        int databaseSizeBeforeUpdate = centroRepository.findAll().size();

        // Update the centro using partial update
        Centro partialUpdatedCentro = new Centro();
        partialUpdatedCentro.setId(centro.getId());

        partialUpdatedCentro
            .denominacion(UPDATED_DENOMINACION)
            .codigo(UPDATED_CODIGO)
            .domicilio(UPDATED_DOMICILIO)
            .localidad(UPDATED_LOCALIDAD)
            .municipio(UPDATED_MUNICIPIO)
            .provincia(UPDATED_PROVINCIA)
            .codigoPostal(UPDATED_CODIGO_POSTAL);

        restCentroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCentro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCentro))
            )
            .andExpect(status().isOk());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
        Centro testCentro = centroList.get(centroList.size() - 1);
        assertThat(testCentro.getDenominacion()).isEqualTo(UPDATED_DENOMINACION);
        assertThat(testCentro.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCentro.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testCentro.getLocalidad()).isEqualTo(UPDATED_LOCALIDAD);
        assertThat(testCentro.getMunicipio()).isEqualTo(UPDATED_MUNICIPIO);
        assertThat(testCentro.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testCentro.getCodigoPostal()).isEqualTo(UPDATED_CODIGO_POSTAL);
    }

    @Test
    @Transactional
    void patchNonExistingCentro() throws Exception {
        int databaseSizeBeforeUpdate = centroRepository.findAll().size();
        centro.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCentroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, centro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(centro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCentro() throws Exception {
        int databaseSizeBeforeUpdate = centroRepository.findAll().size();
        centro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCentroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(centro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCentro() throws Exception {
        int databaseSizeBeforeUpdate = centroRepository.findAll().size();
        centro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCentroMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(centro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Centro in the database
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCentro() throws Exception {
        // Initialize the database
        centroRepository.saveAndFlush(centro);

        int databaseSizeBeforeDelete = centroRepository.findAll().size();

        // Delete the centro
        restCentroMockMvc
            .perform(delete(ENTITY_API_URL_ID, centro.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Centro> centroList = centroRepository.findAll();
        assertThat(centroList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
