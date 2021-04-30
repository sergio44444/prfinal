import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CicloDetailComponent } from './ciclo-detail.component';

describe('Component Tests', () => {
  describe('Ciclo Management Detail Component', () => {
    let comp: CicloDetailComponent;
    let fixture: ComponentFixture<CicloDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CicloDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ ciclo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CicloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CicloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ciclo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ciclo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
