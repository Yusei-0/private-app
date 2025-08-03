import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  LoadingController,
  AlertController
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon
  ]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    addIcons({ logInOutline });
  }

  ngOnInit() {
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();

    const { username, password } = this.loginForm.value;

    // Simulate API call
    setTimeout(async () => {
      await loading.dismiss();
      if ((username === 'admin' || username === 'vivi123') && password === '123') {
        this.authService.login();
        this.router.navigate(['/home']);
      } else {
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: 'Invalid username or password.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }, 1500);
  }
}
