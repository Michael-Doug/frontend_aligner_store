import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndeEstamosComponent } from './onde-estamos.component';

describe('OndeEstamosComponent', () => {
  let component: OndeEstamosComponent;
  let fixture: ComponentFixture<OndeEstamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OndeEstamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndeEstamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
