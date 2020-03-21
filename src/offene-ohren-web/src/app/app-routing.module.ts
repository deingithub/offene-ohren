import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { HelpSearchComponent } from './components/pages/help-search/help-search.component';


const routes: Routes = [
  {path: '', component: StartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
