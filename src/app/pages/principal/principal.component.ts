import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class PrincipalComponent {
  private usuariosService = inject(UsuariosService);
  usuarios: IUser[] = [];

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error(err);
        alert('Error en el acceso a datos');
      },
    });
  }

  // navigateTo(sectionId: string): void {
  //   window.location.href = sectionId;
  // }
  // registrar() {
  //   this.router.navigateByUrl('registro');
  // }

  // login(): void {
  //   this.router.navigate(['/login']);
  // }

  // registrar2(): void {
  //   this.router.navigate(['/registro']);
  // }

  // historial(): void {
  //   this.router.navigate(['/historial']);
  // }
}
