import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingTicketsComponent } from './aging-tickets.component';

describe('AgingTicketsComponent', () => {
  let component: AgingTicketsComponent;
  let fixture: ComponentFixture<AgingTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
