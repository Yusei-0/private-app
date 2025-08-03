import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'add-photo',
    loadComponent: () => import('./pages/add-photo/add-photo.page').then( m => m.AddPhotoPage),
    canActivate: [authGuard]
  },
  {
    path: 'photo-detail/:id',
    loadComponent: () => import('./pages/photo-detail/photo-detail.page').then( m => m.PhotoDetailPage),
    canActivate: [authGuard]
  },
  {
    path: 'edit-photo/:id',
    loadComponent: () => import('./pages/edit-photo/edit-photo.page').then( m => m.EditPhotoPage),
    canActivate: [authGuard]
  },
];
