import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorFormComponent } from './collaborator-form/collaborator-form.component';


const routes: Routes = [
  {path: '', component: CollaboratorListComponent},
  {path: 'new', component: CollaboratorFormComponent},
  {path: ':Id/edit', component: CollaboratorFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
