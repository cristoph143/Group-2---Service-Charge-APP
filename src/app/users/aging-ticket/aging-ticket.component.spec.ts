import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingTicketComponent } from './aging-ticket.component';

describe('AgingTicketComponent', () => {
  let component: AgingTicketComponent;
  let fixture: ComponentFixture<AgingTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgingTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
