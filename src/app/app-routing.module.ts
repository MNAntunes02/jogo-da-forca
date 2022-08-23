import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewGameComponent } from './pages/create-new-game/create-new-game.component';

const routes: Routes = [
  {path: '', component: CreateNewGameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
