import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMateriaComponent } from './register-materia.component';

describe('RegisterMateriaComponent', () => {
  let component: RegisterMateriaComponent;
  let fixture: ComponentFixture<RegisterMateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMateriaComponent]
    });
    fixture = TestBed.createComponent(RegisterMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
