import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVipDarshanComponent } from './book-vip-darshan.component';

describe('BookVipDarshanComponent', () => {
  let component: BookVipDarshanComponent;
  let fixture: ComponentFixture<BookVipDarshanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookVipDarshanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookVipDarshanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
