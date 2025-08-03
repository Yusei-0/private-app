import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonImg,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { Photo, PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonImg,
    IonButton,
    IonIcon
  ]
})
export class PhotoDetailPage {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private photoService = inject(PhotoService);
  private alertController = inject(AlertController);

  private photoId = signal<string>('');
  public photo = computed(() => {
    return this.photoService.getPhoto(this.photoId());
  });

  constructor() {
    addIcons({ trashOutline, createOutline });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.photoId.set(id);
    }
  }

  async deletePhoto() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.photoService.deletePhoto(this.photoId());
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  goToEdit() {
    this.router.navigate(['/edit-photo', this.photoId()]);
  }
}
