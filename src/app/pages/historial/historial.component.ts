import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IHistorial } from 'src/app/interfaces/historial.interface';

import { HistorialService } from 'src/app/services/Historial.service';
import { CardModule } from 'primeng/card';
import { NgFor, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ButtonModule,
    NgFor,
    CardModule,
    DatePipe,
  ],
})
export class HistorialComponent implements OnInit {
  private historialService = inject(HistorialService);
  private router = inject(Router);
  private _isLoading = signal<boolean>(false);
  historial: IHistorial[] = [];
  salas: string[] = [];
  salaSeleccionada = '';

  get isLoading() {
    return this._isLoading();
  }

  set isLoading(value: boolean) {
    this._isLoading.update(() => value);
  }

  ngOnInit(): void {
    this.getSalasDisponibles();
  }

  getHistorialChat(): void {
    this.isLoading = true;

    if (!this.salaSeleccionada) {
      console.error(
        'Seleccione una sala antes de obtener el historial del chat.'
      );
      return;
    }

    this.historialService.getHistorialChat(this.salaSeleccionada).subscribe({
      next: (data) => {
        console.log(data);

        this.historial = data;
      },
      error: (err) => {
        console.error('Error al obtener el historial del chat:', err);
      },
      complete: () => this.isLoading = false,
    });
  }

  getSalasDisponibles(): void {
    this.historialService.getSalasDisponibles().subscribe({
      next: (data) => {
        this.salas = data;
      },
      error: (err) => {
        console.error('Error al obtener la lista de salas:', err);
      },
      complete: () => this.isLoading = false,
    });
  }

  onChangeRoom(): void {
    this.getHistorialChat();
  }

  chat() {
    this.router.navigateByUrl('/chat');
  }
}
