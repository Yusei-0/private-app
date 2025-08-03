import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Photo, PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { checkmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.page.html',
  styleUrls: ['./edit-photo.page.scss'],
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
export class EditPhotoPage implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private photoService = inject(PhotoService);

  editPhotoForm: FormGroup;
  public photoId: string | null = null;

  constructor() {
    this.editPhotoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
    addIcons({ checkmarkOutline });
  }

  ngOnInit() {
    this.photoId = this.route.snapshot.paramMap.get('id');
    if (this.photoId) {
      const photo = this.photoService.getPhoto(this.photoId);
      if (photo) {
        this.editPhotoForm.patchValue(photo);
      }
    }
  }

  submitForm() {
    if (this.editPhotoForm.valid && this.photoId) {
      const updatedPhoto: Photo = {
        id: this.photoId,
        ...this.editPhotoForm.value
      };
      this.photoService.updatePhoto(updatedPhoto);
      this.router.navigate(['/photo-detail', this.photoId]);
    }
  }
}
