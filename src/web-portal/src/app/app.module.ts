import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './modules/shared/shortcut.module';
import { NgxsStoreModule } from 'app/core/store.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ConfigurationService } from 'services/configuration.service';
import { ConfigurationProvider } from './core/configs/configProvider';
import { environment } from 'environments/environment';
import { PORTAL_BASE_URL } from 'services/portal.service';
import { ErrorComponent } from './modules/error/error.component';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatDialogModule, MatProgressBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDENTITY_BASE_URL } from 'services/identity.service';
import { JwtTokenInterceptor } from './core/security/jwtToken.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { HttpExceptionInterceptor } from './core/https/httpException.interceptor';
import { ClipboardModule } from 'ngx-clipboard';
import { toJsonStringTranslator } from './core/shell/translates/methods/toJsonStringTranslator';
import { currentDateTranslator } from './core/shell/translates/methods/currentDateTranslator';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { LoginModule } from './modules/login/login.module';

let portalBaseUrl = (configProvider: ConfigurationProvider) => {
  return configProvider.getCurrentConfigs().portalBaseEndpoint
}

let identityBaseUrl = (configProvider: ConfigurationProvider) => {
  return configProvider.getCurrentConfigs().identityBaseEndpoint
}
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressButtonsModule.forRoot(),
    SharedModule,
    NgxsStoreModule,
    LoggerModule.forRoot({
      serverLoggingUrl: "",
      level: environment.production ? NgxLoggerLevel.OFF: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    ToastrModule.forRoot(),
    ClipboardModule,

    // Portal Module Sections
    CoreModule.forRoot()
  ],
  providers: [
    ConfigurationService,
    {
      provide: PORTAL_BASE_URL,
      useFactory: portalBaseUrl,
      deps: [ConfigurationProvider]
    },
    {
      provide: IDENTITY_BASE_URL,
      useFactory: identityBaseUrl,
      deps: [ConfigurationProvider]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpExceptionInterceptor,
      multi: true
    }
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
