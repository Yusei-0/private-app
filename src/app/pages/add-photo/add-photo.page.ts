import { Component, inject, signal } from '@angular/core';
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
  IonBackButton,
  IonImg,
  LoadingController
} from '@ionic/angular/standalone';
import { PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { checkmarkOutline, imageOutline } from 'ionicons/icons';

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
    IonBackButton,
    IonImg
  ]
})
export class AddPhotoPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private photoService = inject(PhotoService);
  private loadingController = inject(LoadingController);

  addPhotoForm: FormGroup;
  imagePreview = signal<string | null>(null);

  constructor() {
    this.addPhotoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      imageUrl: [null, Validators.required]
    });
    addIcons({ checkmarkOutline, imageOutline });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.imagePreview.set(result);
        this.addPhotoForm.patchValue({ imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  async submitForm() {
    if (this.addPhotoForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Encriptando foto...',
      spinner: 'crescent'
    });
    await loading.present();

    // Simulate encryption time
    setTimeout(() => {
      loading.dismiss();
      this.photoService.addPhoto(this.addPhotoForm.value);
      this.router.navigate(['/home']);
    }, 2000);
  }
}
