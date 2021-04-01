import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingSingupFormaComponent } from './sing-singup-forma.component';

describe('SingSingupFormaComponent', () => {
  let component: SingSingupFormaComponent;
  let fixture: ComponentFixture<SingSingupFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingSingupFormaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingSingupFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
