import { UsersService } from '../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from '../model/user-interface';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor( 
    private authService: AuthService,
    // private AccountCrudService: AccountCrudService,
    private router: Router,
    private toast: HotToastService,
    ) { 
  }
  ngOnInit(): void {  
  }
  account$ = Observable<Users[]>;

  error: String = "";
  rememberMe: boolean = false;
  
  loginForm: FormGroup = new FormGroup({
    school_id: new FormControl(
      '',
      Validators.required,
    ),
    password: new FormControl(
      '',
      Validators.required
    )
  })

  hide = true;

  onSubmitLogin(){
    if (this.loginForm.invalid) {
      this.toast.error('Please fill in all fields');
      this.loginForm.markAllAsTouched();
      return;
    }
    
    console.log(this.authService
      .login(
        this.loginForm.value.school_id,
        this.loginForm.value.password,
      )
      .pipe(
        // toaster 
        this.toast.observe({
          success: 'Successfully logged in',
          loading: 'loading',
          error: (msg) => {
            console.log(msg)
            alert(msg)
            return msg;
          }
        })
      )
      .subscribe(data => {
        console.log('Data', data);
        
        // this.router.navigate(['/home']);
      }
      )
    );
    console.log(this.authService.currUser)
    console.log(this.authService.isUserAuthenticated)
  }
  getErrorMessage() {
    if (this.loginForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.hasError('school_id') ? 'Not a school_id' : '';
  }

  nav(dest: string) {
    this.router.navigate([dest]);
  }
  
  private formSubmitAttempt: boolean = false;

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
}
