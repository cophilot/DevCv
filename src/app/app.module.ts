import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvComponent } from './cv/cv.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { Page1Component } from './page1/page1.component';
import { BackgroundComponent } from './background/background.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';
import { Page2Component } from './page2/page2.component';
import { JobsComponent } from './jobs/jobs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EducationComponent } from './education/education.component';
import { OtherComponent } from './other/other.component';
import { PageNumberComponent } from './page-number/page-number.component';
import { EditorComponent } from './editor/editor.component';

import { FormsModule } from '@angular/forms';
import { CookieMessageComponent } from './cookie-message/cookie-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    LeftbarComponent,
    RightbarComponent,
    Page1Component,
    BackgroundComponent,
    ContactComponent,
    SkillsComponent,
    Page2Component,
    JobsComponent,
    NavbarComponent,
    EducationComponent,
    OtherComponent,
    PageNumberComponent,
    EditorComponent,
    CookieMessageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
