import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'node:process';
import { Action } from './helpers/action.enum';
import { mustMatch } from './helpers/must-match.validator';
import { UserApiService } from './helpers/user-api.service';
import { Users } from './helpers/users.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('content') elcontent!: ElementRef;
  formgroup!:FormGroup;
  modalRef:any;
  submitted=false;
  btnName:String = "";
  dbaction!:Action;
  modalTitle:String = "";
  userData:Users[] = [];

  constructor(private _toastr: ToastrService, private modalService: NgbModal,private formBuilder:FormBuilder,private _userApiService:UserApiService) {

  }

  ngOnInit(): void {
    // Swal.fire("SweetAlert2 is working!");
    this.setFormState()
    this.getAllUsers()
  }

  setFormState(){
    this.btnName = "Save";
    this.modalTitle = "Add User";
    this.dbaction = Action.create;
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
    },
    {validators:mustMatch('password','confirmPassword')}
  )};
  openXl(content: TemplateRef<any>) {
	 this.modalRef = 	this.modalService.open(content, { size: 'xl' });
	}

  edit(id:number){
    this.btnName = "Update";
    this.modalTitle = "Update User";
    this.dbaction = Action.update;

    let user = this.userData.find((u:Users) => u.id === id);
    if(user){
      this.formgroup.patchValue(user);
      this.formgroup.get('password')?.setValue('');
      this.formgroup.get('confirmPassword')?.setValue('');
      this.formgroup.get('acceptTerm')?.setValue(false);
    }else{
      console.log("User ID not Found",id)
    }
   this.modalRef = this.modalService.open(this.elcontent, { size: 'xl' });
  }

  getAllUsers(){
    this._userApiService.getUsers().subscribe((data:any) => {
      this.userData = data
    })
  }
  modalClose(){
    this.btnName = "Save";
    this.modalTitle = "Add User";
    this.modalRef.close();
  }
  cancelHandler(){

    this.formgroup.reset({
      title: "",
      firstName:"",
      lastName:"",
      email:"",
      dob:"",
      password:"",
      confirmPassword:"",
      acceptTerm:false
    })
  }
  submitHandler(){
    this.submitted = true 
    if(this.formgroup.invalid){
      return;
    }
    switch(this.dbaction){
      case Action.create:
        //code to add user
        this._userApiService.addUser(this.formgroup.value).subscribe((res:any) => {
          this._toastr.success("User Added Successfully","Add User")
          this.cancelHandler();
        })
        break;
      case Action.update:
        // code to update user
        this._userApiService.updateUser(this.formgroup.value).subscribe((res:any) => {
          this._toastr.success("User Updated Successfully","Update User")
          this.cancelHandler();
        })
        break;
    }
    this._toastr.success("User Added Successfully","Add User")
    this.cancelHandler();
  }
  delete(id:number){
   Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText:"No, Keep it",
   }).then((result) => {
    if(result.isConfirmed){
      //code here to delet the record
      this._userApiService.deleteUser(id).subscribe((res:any) =>{
        this.getAllUsers();
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      })
    }else{
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
   })
  }

}
