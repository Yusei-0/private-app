import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonProgressBar, IonText } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-decrypting-loader',
  templateUrl: './decrypting-loader.component.html',
  styleUrls: ['./decrypting-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, IonProgressBar, IonText]
})
export class DecryptingLoaderComponent implements OnInit {

  private modalController = inject(ModalController);
  public progress = signal(0);

  ngOnInit() {
    const interval = setInterval(() => {
      const currentProgress = this.progress();
      if (currentProgress < 1) {
        this.progress.set(currentProgress + 0.1);
      } else {
        clearInterval(interval);
        this.modalController.dismiss();
      }
    }, 150);
  }
}
