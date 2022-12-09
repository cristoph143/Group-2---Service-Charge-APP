import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingListComponent } from './aging-list.component';

describe('AgingListComponent', () => {
  let component: AgingListComponent;
  let fixture: ComponentFixture<AgingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
