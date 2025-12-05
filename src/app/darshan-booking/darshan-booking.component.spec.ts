import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarshanBookingComponent } from './darshan-booking.component';

describe('DarshanBookingComponent', () => {
  let component: DarshanBookingComponent;
  let fixture: ComponentFixture<DarshanBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarshanBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarshanBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
