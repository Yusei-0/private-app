import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonProgressBar, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-decrypting-loader',
  templateUrl: './decrypting-loader.component.html',
  styleUrls: ['./decrypting-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, IonProgressBar, IonText]
})
export class DecryptingLoaderComponent {
  @Input() progress = 0;
}
