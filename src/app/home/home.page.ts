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
  LoadingController
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Photo, PhotoService } from '../services/photo.service';
import { addIcons } from 'ionicons';
import { logOutOutline, addOutline, shieldCheckmarkOutline } from 'ionicons/icons';

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
    IonFabButton
  ]
})
export class HomePage {

  private photoService = inject(PhotoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);

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
    addIcons({ logOutOutline, addOutline, shieldCheckmarkOutline });
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

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Securely logging out...',
      duration: 1000
    });
    await loading.present();

    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    }, 1000);
  }
}
