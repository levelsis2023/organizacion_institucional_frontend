import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubinstitutionsComponent } from './subinstitutions.component';

describe('SubinstitutionsComponent', () => {
  let component: SubinstitutionsComponent;
  let fixture: ComponentFixture<SubinstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubinstitutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubinstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
