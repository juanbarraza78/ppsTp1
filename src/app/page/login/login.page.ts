import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonInput, IonList, IonToast, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonFabList, IonIcon, IonFabButton, IonFab, IonToast, IonList, IonInput, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  elementRef = inject(ElementRef);
  isToastOpen = false;

  constructor() {

  }

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })



  
  ngOnInit() {
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  onSubmit() : void
  {
    const value = this.form.getRawValue();
    this.authService.login(value.email, value.password).subscribe({
      next:()=>{
      this.router.navigateByUrl('/home')},
      error: ()=>{
        this.setOpen(true);
        this.form.setValue({email : "", password:""});
      }
    })
  }
  goRegister()
  {
    this.router.navigateByUrl("/register");
  }
  goLogin()
  {
    this.router.navigateByUrl("/login");
  }
  goHome()
  { 
    this.router.navigateByUrl("/home");
  }
  logout() : void
  {
    this.authService.logout();
  }
  userA()
  {
    this.form.setValue({email : "kopop74796@idsho.com", password:"asd123"}); 
  }
  userB()
  {
    this.form.setValue({email : "palmiharze@gufum.com", password:"asd123"}); 
  }
  userC()
  {
    this.form.setValue({email : "jeniffer93408@wlks.crankymonkey.info", password:"asd123"});
  }
}
