import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonBackButton
} from '@ionic/angular/standalone';
import { PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { checkmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonBackButton
  ]
})
export class AddPhotoPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private photoService = inject(PhotoService);

  addPhotoForm: FormGroup;

  constructor() {
    this.addPhotoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
    addIcons({ checkmarkOutline });
  }

  submitForm() {
    if (this.addPhotoForm.valid) {
      this.photoService.addPhoto(this.addPhotoForm.value);
      this.router.navigate(['/home']);
    }
  }
}
