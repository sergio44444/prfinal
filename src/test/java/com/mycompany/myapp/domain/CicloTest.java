package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CicloTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ciclo.class);
        Ciclo ciclo1 = new Ciclo();
        ciclo1.setId(1L);
        Ciclo ciclo2 = new Ciclo();
        ciclo2.setId(ciclo1.getId());
        assertThat(ciclo1).isEqualTo(ciclo2);
        ciclo2.setId(2L);
        assertThat(ciclo1).isNotEqualTo(ciclo2);
        ciclo1.setId(null);
        assertThat(ciclo1).isNotEqualTo(ciclo2);
    }
}
