import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHistorial } from 'src/app/interfaces/historial.interface';

import { HistorialService } from 'src/app/services/Historial.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: IHistorial[] = [];
  salas: string[] = [];
  salaSeleccionada = '';

  constructor(private historialService: HistorialService, private router: Router) { }

  ngOnInit(): void {
   
    this.getSalasDisponibles();
  }

  // getHistorialChat(): void {
  //   this.historialService.getHistorialChat(this.salaSeleccionada).subscribe(
  //     historial => {
  //       this.historial = historial;
  //     },
  //     error => {
  //       console.error('Error al obtener el historial del chat:', error);
  //     }
  //   );
  // }


  getHistorialChat(): void {
    if (!this.salaSeleccionada) {
      console.error('Seleccione una sala antes de obtener el historial del chat.');
      return;
    }

  
    this.historialService.getHistorialChat(this.salaSeleccionada).subscribe(
      historial => {
        this.historial = historial;
        console.log(historial)
      },
      error => {
        console.error('Error al obtener el historial del chat:', error);
      }
    );
  }


  // getHistorialCha2(): void {
  //   if (!this.salaSeleccionada) {      
  //     return;
  //   }
  
  //   this.historialService.getHistorialChat(this.salaSeleccionada).subscribe(
  //     historial => {
  //       this.historial = historial;
  //     },
  //     error => {
  //       console.error('Error al obtener el historial del chat:', error);
  //     }
  //   );
  // }
  

  getSalasDisponibles(): void {
    this.historialService.getSalasDisponibles().subscribe(
      salas => {
        this.salas = salas;
   
      },
      error => {
        console.error('Error al obtener la lista de salas:', error);
      }
    );
  }

  onChangeRoom(): void {
    this.getHistorialChat();
  }

  chat() {
    this.router.navigateByUrl('/chat');
  }
}
