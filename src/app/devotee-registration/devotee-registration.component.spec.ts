import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoteeRegistrationComponent } from './devotee-registration.component';

describe('DevoteeRegistrationComponent', () => {
  let component: DevoteeRegistrationComponent;
  let fixture: ComponentFixture<DevoteeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevoteeRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevoteeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
