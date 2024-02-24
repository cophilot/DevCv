import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserErrorPageComponent } from './user-error-page.component';

describe('UserErrorPageComponent', () => {
  let component: UserErrorPageComponent;
  let fixture: ComponentFixture<UserErrorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserErrorPageComponent]
    });
    fixture = TestBed.createComponent(UserErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
