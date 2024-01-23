import { Component, EventEmitter, Output } from '@angular/core';
import { IMessage } from 'src/app/interfaces/message.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class MessageInputComponent {
  message = '';
  file: File | null = null;
  @Output() sendMessageEvent = new EventEmitter<{text: string, file: File | null}>();

  // Envia el mensaje al servidor
  sendMessage(): void {
    if (this.message.trim() === '' && !this.file) {
      return;
    }
    this.sendMessageEvent.emit({ text: this.message, file: this.file });

    this.message = '';
    this.file = null;
  }

  // Maneja el cambio en la selección de archivos
  handleFileInput(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  ricias() {
    const paco = new FormData();
    paco.append('archivo', this.file!, this.file?.name);
  }
}
