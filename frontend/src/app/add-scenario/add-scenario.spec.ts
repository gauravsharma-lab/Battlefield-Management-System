import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScenario } from './add-scenario';

describe('AddScenario', () => {
  let component: AddScenario;
  let fixture: ComponentFixture<AddScenario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddScenario],
    }).compileComponents();

    fixture = TestBed.createComponent(AddScenario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
