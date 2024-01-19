import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app.routing/app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './pages/registro/usuarios.component';
import { ChatComponent } from './pages/PruebaChat/chat.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SignalRService } from './services/signalr.service';
import { MessageInputComponent } from './pages/message-input/message-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    ChatComponent,
    UsuariosComponent,
    NotFoundComponent,
    MessageInputComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule, HttpClientModule, FormsModule, 
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
