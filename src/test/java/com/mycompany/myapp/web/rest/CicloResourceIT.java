package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Ciclo;
import com.mycompany.myapp.repository.CicloRepository;
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
 * Integration tests for the {@link CicloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CicloResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_CLAVE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ciclos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CicloRepository cicloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCicloMockMvc;

    private Ciclo ciclo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ciclo createEntity(EntityManager em) {
        Ciclo ciclo = new Ciclo().nombre(DEFAULT_NOMBRE).clave(DEFAULT_CLAVE);
        return ciclo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ciclo createUpdatedEntity(EntityManager em) {
        Ciclo ciclo = new Ciclo().nombre(UPDATED_NOMBRE).clave(UPDATED_CLAVE);
        return ciclo;
    }

    @BeforeEach
    public void initTest() {
        ciclo = createEntity(em);
    }

    @Test
    @Transactional
    void createCiclo() throws Exception {
        int databaseSizeBeforeCreate = cicloRepository.findAll().size();
        // Create the Ciclo
        restCicloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isCreated());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeCreate + 1);
        Ciclo testCiclo = cicloList.get(cicloList.size() - 1);
        assertThat(testCiclo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCiclo.getClave()).isEqualTo(DEFAULT_CLAVE);
    }

    @Test
    @Transactional
    void createCicloWithExistingId() throws Exception {
        // Create the Ciclo with an existing ID
        ciclo.setId(1L);

        int databaseSizeBeforeCreate = cicloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCicloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCiclos() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        // Get all the cicloList
        restCicloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ciclo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)));
    }

    @Test
    @Transactional
    void getCiclo() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        // Get the ciclo
        restCicloMockMvc
            .perform(get(ENTITY_API_URL_ID, ciclo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ciclo.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.clave").value(DEFAULT_CLAVE));
    }

    @Test
    @Transactional
    void getNonExistingCiclo() throws Exception {
        // Get the ciclo
        restCicloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCiclo() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();

        // Update the ciclo
        Ciclo updatedCiclo = cicloRepository.findById(ciclo.getId()).get();
        // Disconnect from session so that the updates on updatedCiclo are not directly saved in db
        em.detach(updatedCiclo);
        updatedCiclo.nombre(UPDATED_NOMBRE).clave(UPDATED_CLAVE);

        restCicloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCiclo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCiclo))
            )
            .andExpect(status().isOk());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
        Ciclo testCiclo = cicloList.get(cicloList.size() - 1);
        assertThat(testCiclo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCiclo.getClave()).isEqualTo(UPDATED_CLAVE);
    }

    @Test
    @Transactional
    void putNonExistingCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();
        ciclo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCicloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ciclo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ciclo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();
        ciclo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCicloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ciclo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();
        ciclo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCicloMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCicloWithPatch() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();

        // Update the ciclo using partial update
        Ciclo partialUpdatedCiclo = new Ciclo();
        partialUpdatedCiclo.setId(ciclo.getId());

        restCicloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCiclo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCiclo))
            )
            .andExpect(status().isOk());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
        Ciclo testCiclo = cicloList.get(cicloList.size() - 1);
        assertThat(testCiclo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCiclo.getClave()).isEqualTo(DEFAULT_CLAVE);
    }

    @Test
    @Transactional
    void fullUpdateCicloWithPatch() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();

        // Update the ciclo using partial update
        Ciclo partialUpdatedCiclo = new Ciclo();
        partialUpdatedCiclo.setId(ciclo.getId());

        partialUpdatedCiclo.nombre(UPDATED_NOMBRE).clave(UPDATED_CLAVE);

        restCicloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCiclo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCiclo))
            )
            .andExpect(status().isOk());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
        Ciclo testCiclo = cicloList.get(cicloList.size() - 1);
        assertThat(testCiclo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCiclo.getClave()).isEqualTo(UPDATED_CLAVE);
    }

    @Test
    @Transactional
    void patchNonExistingCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();
        ciclo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCicloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ciclo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ciclo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();
        ciclo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCicloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ciclo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCiclo() throws Exception {
        int databaseSizeBeforeUpdate = cicloRepository.findAll().size();
        ciclo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCicloMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ciclo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ciclo in the database
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCiclo() throws Exception {
        // Initialize the database
        cicloRepository.saveAndFlush(ciclo);

        int databaseSizeBeforeDelete = cicloRepository.findAll().size();

        // Delete the ciclo
        restCicloMockMvc
            .perform(delete(ENTITY_API_URL_ID, ciclo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ciclo> cicloList = cicloRepository.findAll();
        assertThat(cicloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
