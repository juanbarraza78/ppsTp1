import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonButton, IonHeader, IonToolbar, IonTitle, IonItem } from '@ionic/angular/standalone';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonItem, IonTitle, IonToolbar, IonHeader, IonButton, IonApp, IonRouterOutlet],
})
export class AppComponent {
  authService = inject(AuthService);

  ngOnInit(): void 
  {
    this.authService.user$.subscribe((user)=>{
      if(user)
      {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
      }
      else
      {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }
}
