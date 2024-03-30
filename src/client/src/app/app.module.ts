import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatosPService } from './services/datos-pservice.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DatosPComponent } from './components/datos-p/datos-p.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaisComponent } from './components/pais/pais.component';
import { PaisService } from './services/pais.service';
import { EstadoComponent } from './components/estado/estado.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { EstadoService } from './services/estado.service';
import { CiudadService } from './services/ciudad.service';
import { PerfilAdminComponent } from './components/perfil-admin/perfil-admin.component';
import { PerfilAdminService } from './services/perfil-admin.service';
import { UserService } from './services/user.service';
import { PlantillaCvComponent } from './components/plantilla-cv/plantilla-cv.component';
import { PlantillaCvService } from './services/plantilla-cv.service';
import { DatosEstudiosComponent } from './components/datos-estudios/datos-estudios.component';
import { DatosLComponent } from './components/datos-l/datos-l.component';
import { DatosLService } from './services/datos-l.service';
@NgModule({
  declarations: [
    AppComponent,
    DatosPComponent,
    HomePageComponent,
    RegisterComponent,
    PaisComponent,
    EstadoComponent,
    CiudadComponent,
    PerfilAdminComponent,
    PlantillaCvComponent,
    DatosEstudiosComponent,
    DatosLComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    DatosPService,
    PaisService,
    EstadoService,
    CiudadService,
    PerfilAdminService,
    UserService,
    PlantillaCvService,
    DatosLService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
