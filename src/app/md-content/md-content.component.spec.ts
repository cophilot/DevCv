import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdContentComponent } from './md-content.component';

describe('MdContentComponent', () => {
  let component: MdContentComponent;
  let fixture: ComponentFixture<MdContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdContentComponent]
    });
    fixture = TestBed.createComponent(MdContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
