import { Component, OnInit } from '@angular/core';
import {  inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  formgroup!:FormGroup;
  constructor(private _toastr: ToastrService, private modalService: NgbModal,private formBuilder:FormBuilder) {

  }

  ngOnInit(): void {
    // Swal.fire("SweetAlert2 is working!");
    this.setFormState()
  }

  setFormState(){
    this.formgroup = this.formBuilder.group({
      id: [0],
      title: ["",Validators.required],
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      dob: ["", [Validators.required, Validators.pattern("^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-[0-9]{4}$")]],
      password:["",[Validators.required,Validators.minLength(8)]],
      confirmPassword:["",[Validators.required]],
      acceptTerm: [false,Validators.requiredTrue]
    })
  }
  openXl(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl' });
	}

  edit(id:number){
    alert("Edit is Called" + id)
  }

  delete(id:number){
    alert("Delete is Called" + id)
  }
}
