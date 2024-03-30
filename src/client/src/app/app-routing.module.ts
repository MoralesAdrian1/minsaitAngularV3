import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPComponent } from './components/datos-p/datos-p.component';
import { PaisComponent } from './components/pais/pais.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EstadoComponent } from './components/estado/estado.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { PerfilAdminComponent } from './components/perfil-admin/perfil-admin.component';
import { RegisterComponent } from './components/register/register.component';
import { PlantillaCvComponent } from './components/plantilla-cv/plantilla-cv.component';
import { DatosLComponent } from './components/datos-l/datos-l.component';
import { DatosExperienciaComponent } from './components/datos-experiencia/datos-experiencia.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Ruta raíz
  { path: 'datosP', component: DatosPComponent },
  { path: 'pais', component: PaisComponent },
  {path: 'ciudad',component: CiudadComponent},
  {path: 'estado',component:EstadoComponent},
  {path: 'perfil',component: PerfilAdminComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'cv',component: PlantillaCvComponent},
  {path:'datosL',component:DatosLComponent},
 {path: 'datosEx',component:DatosExperienciaComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }