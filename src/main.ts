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
  withInterceptors,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { SignalRService } from './app/services/signalr.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { authInterceptorFn } from './app/services/interceptors/token-fn.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptorFn])),
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
    {
      provide: LOCALE_ID /** imported from @angular/core */,
      useValue: 'es-ES' /** default locale fixed to es-ES */,
    },
  ],
}).catch((err) => console.error(err));
