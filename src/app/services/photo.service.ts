import { Injectable, signal } from '@angular/core';

export interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isDecrypted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private _photos = signal<Photo[]>([]);

  // Pre-populate with some mock data
  constructor() {
    const mockPhotos: Photo[] = [
      { id: '1', title: 'Forest Path', description: 'A beautiful path through a sunlit forest.', imageUrl: 'https://picsum.photos/id/10/600/400', isDecrypted: false },
      { id: '2', title: 'Laptop on Desk', description: 'A clean workspace with a laptop.', imageUrl: 'https://picsum.photos/id/2/600/400', isDecrypted: false },
      { id: '3', title: 'City at Night', description: 'Stunning view of the city skyline at night.', imageUrl: 'https://picsum.photos/id/18/600/400', isDecrypted: false },
      { id: '4', title: 'Mountain Range', description: 'Snow-capped mountains under a clear blue sky.', imageUrl: 'https://picsum.photos/id/29/600/400', isDecrypted: false },
      { id: '5', title: 'Abstract Drops', description: 'Colorful water droplets on a surface.', imageUrl: 'https://picsum.photos/id/48/600/400', isDecrypted: false },
    ];
    this._photos.set(mockPhotos);
  }

  getPhotos() {
    return this._photos.asReadonly();
  }

  getPhoto(id: string) {
    return this._photos().find(p => p.id === id);
  }

  addPhoto(photoData: { title: string; description: string; imageUrl: string; }) {
    const newPhoto: Photo = {
      id: new Date().getTime().toString(), // simple unique id
      title: photoData.title,
      description: photoData.description,
      imageUrl: photoData.imageUrl,
      isDecrypted: true // Assume a newly added photo is decrypted by default
    };
    this._photos.update(photos => [...photos, newPhoto]);
  }

  updatePhoto(updatedPhoto: Photo) {
    this._photos.update(photos =>
      photos.map(p => p.id === updatedPhoto.id ? { ...updatedPhoto, isDecrypted: p.isDecrypted } : p)
    );
  }

  deletePhoto(id: string) {
    this._photos.update(photos => photos.filter(p => p.id !== id));
  }

  decryptPhoto(id: string) {
    this._photos.update(photos =>
      photos.map(p => p.id === id ? { ...p, isDecrypted: true } : p)
    );
  }
}
