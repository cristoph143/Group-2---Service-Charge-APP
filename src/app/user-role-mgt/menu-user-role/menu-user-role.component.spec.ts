import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserRoleComponent } from './menu-user-role.component';

describe('MenuUserRoleComponent', () => {
  let component: MenuUserRoleComponent;
  let fixture: ComponentFixture<MenuUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
