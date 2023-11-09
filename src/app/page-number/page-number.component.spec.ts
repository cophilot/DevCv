import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumberComponent } from './page-number.component';

describe('PageNumberComponent', () => {
  let component: PageNumberComponent;
  let fixture: ComponentFixture<PageNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNumberComponent]
    });
    fixture = TestBed.createComponent(PageNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
