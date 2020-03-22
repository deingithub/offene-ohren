import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { HelpSearchComponent } from './components/pages/help-search/help-search.component';
import { RegisterHelperComponent } from './components/pages/register-helper/register-helper.component';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';


const routes: Routes = [
  {path: 'help-search', component: HelpSearchComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'register-helper', component: RegisterHelperComponent},
  {path: '', component: StartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
