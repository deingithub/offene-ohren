import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { HelpSearchComponent } from './components/pages/help-search/help-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    HelpSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
