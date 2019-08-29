import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { CollaboratorRoutingModule } from './Collaborator-routing.module';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorFormComponent } from './collaborator-form/collaborator-form.component';



@NgModule({
  declarations: [CollaboratorListComponent, CollaboratorFormComponent],
  imports: [
    CommonModule,
    CollaboratorRoutingModule,
    ReactiveFormsModule
  ]
})
export class CollaboratorsModule { }
