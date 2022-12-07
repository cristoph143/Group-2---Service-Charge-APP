import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontlyReportsComponent } from './monthly-reports.component';

describe('MontlyReportsComponent', () => {
  let component: MontlyReportsComponent;
  let fixture: ComponentFixture<MontlyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontlyReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontlyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
