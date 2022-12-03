import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketPerAssigneeComponent } from './view-ticket-per-assignee.component';

describe('ViewTicketPerAssigneeComponent', () => {
  let component: ViewTicketPerAssigneeComponent;
  let fixture: ComponentFixture<ViewTicketPerAssigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketPerAssigneeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketPerAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
