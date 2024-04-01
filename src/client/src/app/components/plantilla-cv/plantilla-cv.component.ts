import { Component, OnInit } from '@angular/core';
import { DatosPModel } from 'src/app/models/datosPModel';
import { DatosCvModel, DatosEsCvModel, DatosExCVModel, PerfilCvModel } from 'src/app/models/plantillaCvModel';
import { PlantillaCvService } from 'src/app/services/plantilla-cv.service';


@Component({
  selector: 'app-plantilla-cv',
  templateUrl: './plantilla-cv.component.html',
  styleUrls: ['./plantilla-cv.component.css']
})
export class PlantillaCvComponent implements OnInit {

  datosP: DatosCvModel = {} as DatosCvModel;
  perfil: PerfilCvModel = {} as PerfilCvModel;
  datosEs: DatosEsCvModel ={ } as DatosEsCvModel;
  datosEx: DatosExCVModel = {} as DatosExCVModel;

  constructor(private plantillaCvService: PlantillaCvService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    //datos Personales
    this.plantillaCvService.getDatosP().subscribe(
      (data: DatosCvModel[]) => {
        this.datosP = data[0]; // Obtener el primer elemento del array
      },
      error => {
        console.error('Error al obtener datosP:', error);
      }
    );
      //datos del Perfil laboral
    this.plantillaCvService.getPerfil().subscribe(
      (data: PerfilCvModel[]) => {
        this.perfil = data[0]; // Obtener el primer elemento del array
      },
      error => {
        console.error('Error al obtener perfil:', error);
      }
    );
//datos de estudio
this.plantillaCvService.getDatosEs().subscribe(
  (data: DatosEsCvModel[]) => {
    this.datosEs = data[0]; // Obtener el primer elemento del array
  },
  error => {
    console.error('Error al obtener DatosEs:', error);
  }
    );

//datos de Experiencia
this.plantillaCvService.getDatosEx().subscribe(
  (data: DatosExCVModel[]) => {
    this.datosEx = data[0]; // Obtener el primer elemento del array
  },
  error => {
    console.error('Error al obtener DatosEs:', error);
  }
    );
  }
}
