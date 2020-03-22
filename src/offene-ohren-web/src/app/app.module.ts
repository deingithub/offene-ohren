import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { HelpSearchComponent } from './components/pages/help-search/help-search.component';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';
import { RegisterHelperComponent } from './components/pages/register-helper/register-helper.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    HelpSearchComponent,
    RegisterUserComponent,
    RegisterHelperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
