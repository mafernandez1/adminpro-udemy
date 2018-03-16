import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app.routes';

// Módulos
import { PagesModule } from './pages/pages.module';

// Servicio
import { ServiceModule } from './services/service.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    ServiceModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
