import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvEditorComponent } from './cv-editor.component';

describe('CvEditorComponent', () => {
  let component: CvEditorComponent;
  let fixture: ComponentFixture<CvEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvEditorComponent]
    });
    fixture = TestBed.createComponent(CvEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
