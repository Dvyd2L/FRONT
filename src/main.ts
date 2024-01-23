import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { UserChatService } from './app/services/UserChat.service';
import { SignalRService } from './app/services/signalr.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      DropdownModule,
      ButtonModule,
      ListboxModule,
      CardModule
    ),
    SignalRService,
    UserChatService,
    {
      provide: LOCALE_ID /** imported from @angular/core */,
      useValue: 'es-ES' /** default locale fixed to es-ES */,
    },
  ],
}).catch((err) => console.error(err));
