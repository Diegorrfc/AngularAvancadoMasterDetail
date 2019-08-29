import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Collaborator } from '../Shared/Collaborator.model'

import { switchMap } from 'rxjs/operators'
import toastr from 'toastr'
import { CollaboratorService } from '../Shared/Collaborator-service';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-collaborator-form',
  templateUrl: './collaborator-form.component.html',
  styleUrls: ['./collaborator-form.component.css']
})
export class CollaboratorFormComponent implements OnInit {

  currentAction: string;
  collaboratorFrom: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false; 
  collaborator: Collaborator = new Collaborator();

  constructor(
    private collaboratorService: CollaboratorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCollaboratorForm();
    this.loadCollaborator();
  }
  ngAfterContentChecked() {
    this.setPageTitle();
  }
  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro do novo colaborador'
    else {
      const collaboratorName = this.collaborator.FirstName || "";
      this.pageTitle = "Editando colaborador: " + collaboratorName;
    }
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createCollaborator();
    }
    else
      this.updateCollaborator();

  }
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new')
      this.currentAction = 'new'
    else
      this.currentAction = 'edit'
  }
  private buildCollaboratorForm() {

    
    this.collaboratorFrom = this.formBuilder.group(
      {
        id: [null],      
        FirstName: [null,[Validators.required, Validators.minLength(4)]],
        LastName: [null,[Validators.required, Validators.minLength(4)]],
        Document: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        Email: [null,[Validators.required, Validators.minLength(4),Validators.email,Validators.maxLength(200)]],
        Phone: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        Salary: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        ProjectName: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        BirthDate: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        Street: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        Number: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        District: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        City: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        Country: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        ZipCode: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
        JobTitle: [null,[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
      }
    )
  }
  private loadCollaborator() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        
        switchMap(param => this.collaboratorService.getById(param.get('Id')))
      )
        .subscribe(
          (collaborator) => {
            console.log(collaborator)
            this.collaborator = collaborator;
            this.collaboratorFrom.patchValue(this.collaborator)
          }, error => alert('Ocorreu um erro no servidor!')
        )
    }

  }
  private createCollaborator() {    
    const collaborator: Collaborator = Object.assign(new Collaborator(), this.collaboratorFrom.value)
    collaborator.id=  Guid.create().toString();    
    this.collaboratorService.create(collaborator).subscribe(
      collaborator => this.actionsForSuccess(collaborator),
      error => this.actionForError(error)
    )
  }
  private updateCollaborator() {
    console.log()
    const collaborator: Collaborator = Object.assign(new Collaborator(), this.collaboratorFrom.value);
    this.collaboratorService.update(collaborator).subscribe(
      collaborator => this.actionsForSuccess(collaborator),
      error => this.actionForError(error))
  }
  private actionsForSuccess(collaborator: Collaborator) {
    
    toastr.success('Solicitação processada com sucesso');
    this.router.navigateByUrl('collaborators', { skipLocationChange: true }).then(
      () => this.router.navigate(['collaborators'])
    )
  }
  private actionForError(error: any) {
    toastr.error('Ocorreu um erro ao processar');
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).erros;
    } else {
      this.serverErrorMessages = ['Falha na comunicação']
    }
  }


}
