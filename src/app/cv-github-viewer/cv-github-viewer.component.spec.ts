import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvGithubViewerComponent } from './cv-github-viewer.component';

describe('CvGithubViewerComponent', () => {
  let component: CvGithubViewerComponent;
  let fixture: ComponentFixture<CvGithubViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvGithubViewerComponent]
    });
    fixture = TestBed.createComponent(CvGithubViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
