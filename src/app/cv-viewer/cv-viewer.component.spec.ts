import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvViewerComponent } from './cv-viewer.component';

describe('CvViewerComponent', () => {
  let component: CvViewerComponent;
  let fixture: ComponentFixture<CvViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvViewerComponent]
    });
    fixture = TestBed.createComponent(CvViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
