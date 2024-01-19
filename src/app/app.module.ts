import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './router/app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './pages/registro/usuarios.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SignalRService } from './services/signalr.service';
import { MessageInputComponent } from './pages/message-input/message-input.component';
import { UserChatService } from './services/UserChat.service';
import { HistorialComponent } from './pages/historial/historial.component';


import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    ChatComponent,
    UsuariosComponent,
    NotFoundComponent,
    MessageInputComponent,
    HistorialComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, DropdownModule, ButtonModule, ListboxModule, CardModule,
  ],
  providers: [SignalRService, UserChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
