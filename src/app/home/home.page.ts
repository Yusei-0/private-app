import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  LoadingController,
  ModalController
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Photo, PhotoService } from '../services/photo.service';
import { addIcons } from 'ionicons';
import { logOutOutline, addOutline, shieldCheckmarkOutline, settingsOutline } from 'ionicons/icons';
import { DecryptingLoaderComponent } from '../components/decrypting-loader/decrypting-loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonButtons,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonFab,
    IonFabButton,
    DecryptingLoaderComponent
  ]
})
export class HomePage {

  private photoService = inject(PhotoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  private modalController = inject(ModalController);

  private photos = this.photoService.getPhotos();
  private searchQuery = signal('');

  public filteredPhotos = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (query === '') {
      return this.photos();
    }
    return this.photos().filter(photo =>
      photo.title.toLowerCase().includes(query)
    );
  });

  constructor() {
    addIcons({ logOutOutline, addOutline, shieldCheckmarkOutline, settingsOutline });
  }

  handleSearch(event: any) {
    this.searchQuery.set(event.target.value);
  }

  goToDetail(photoId: string) {
    this.router.navigate(['/photo-detail', photoId]);
  }

  goToAddPhoto() {
    this.router.navigate(['/add-photo']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  async decrypt(photoId: string) {
    const modal = await this.modalController.create({
      component: DecryptingLoaderComponent,
      backdropDismiss: false,
      cssClass: 'decrypting-modal'
    });
    await modal.present();

    const interval = setInterval(() => {
      const currentProgress = (modal as any).componentInstance.progress;
      if (currentProgress < 1) {
        (modal as any).componentInstance.progress += 0.1;
      } else {
        clearInterval(interval);
        modal.dismiss();
        this.photoService.decryptPhoto(photoId);
      }
    }, 150);
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión de forma segura...',
      duration: 1000
    });
    await loading.present();

    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    }, 1000);
  }
}
