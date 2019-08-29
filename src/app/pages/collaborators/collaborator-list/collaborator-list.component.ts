import { Component, OnInit } from '@angular/core';
import { Collaborator } from '../Shared/collaborator.model';
import { CollaboratorService } from '../Shared/Collaborator-service';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {

  collaborators: Collaborator[] = [];
  constructor(private collaboratorService: CollaboratorService) { }

  ngOnInit() {

    this.collaboratorService.getAll()
      .subscribe(        
        cat => this.collaborators = cat,
        error => alert('erro')

      );
      
  }
  deleteCollaborator(collaborator) {
    const mustDelete = confirm('Deseja excluir esse item?');
    if (mustDelete) {
      this.collaboratorService.delete(collaborator.Id).subscribe(
        () => this.collaborators = this.collaborators.filter(ele => ele !== collaborator),
        () => alert('erro ao tentar excluir')
      );
    }    
  }

}
