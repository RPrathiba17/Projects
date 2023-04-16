import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './logins';
import { LoginService } from './login.service';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login = new Login();
  users: Login[] = [];
  valid = true;    
  @ViewChild('uname') usernameElement!: ElementRef; 
  loginForm!: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private loginservice:LoginService, private renderer: Renderer2) {
  }

  ngOnInit() {
      this.loginservice.getUsers().subscribe({next:users => this.users = users});
      this.loginForm = this.formBuilder.group({
          userName: [this.login.userName, Validators.required],
          password: [this.login.password, Validators.required]
      })
  }
  onSubmit() {
      this.login = this.loginForm.getRawValue();      
      const user = this.users.filter(currUser => currUser.userName === this.login.userName && currUser.password === this.login.password)[0];
      if(this.login.userName==''){
        Swal.fire('Oops!', 'Enter your username!', 'error');
      }
      else if(this.login.password==''){
        Swal.fire('Oops!', 'Enter your password!', 'error');
      }
      else if (user) {
           this.loginservice.username = this.login.userName;      
          this.router.navigate(['/dashboard']);
      } else {
        Swal.fire('Yikes', 'Invalid Credential!', 'info')
          // this.valid = false;
      }
    }
}
