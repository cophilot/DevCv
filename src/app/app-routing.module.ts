import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvEditorComponent } from './cv-editor/cv-editor.component';
import { CvViewerComponent } from './cv-viewer/cv-viewer.component';

const routes: Routes = [
  { path: '', component: CvEditorComponent },
  { path: 'view', component: CvViewerComponent },
  { path: '*', component: CvEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
