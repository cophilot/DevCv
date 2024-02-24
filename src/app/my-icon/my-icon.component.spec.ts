import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIconComponent } from './my-icon.component';

describe('MyIconComponent', () => {
  let component: MyIconComponent;
  let fixture: ComponentFixture<MyIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyIconComponent]
    });
    fixture = TestBed.createComponent(MyIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
