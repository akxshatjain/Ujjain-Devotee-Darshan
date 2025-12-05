// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { appConfig } from './app/app.config';
// import { BrowserModule } from '@angular/platform-browser';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideAnimations(),
//     importProvidersFrom(
//       FormsModule,
//       CommonModule,
//       BrowserModule,
//       ToastrModule.forRoot()
//     ),
//         ...appConfig.providers   

//   ]
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withXsrfConfiguration, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    // ✅ HttpClient with CSRF/XSRF configuration for Frappe backend
 provideHttpClient(withInterceptors([
      (req, next) => {
        const cloned = req.clone({ withCredentials: true });
        return next(cloned);
      }
    ])),

    provideAnimations(), // required for Toastr

    importProvidersFrom(
      ToastrModule.forRoot(), // ✅ only here
      FormsModule,
      CommonModule
    ),

    ...appConfig.providers,
  ],
}).catch(err => console.error(err));
