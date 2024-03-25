import { Component, OnInit } from '@angular/core';
import { DatosPModel } from 'src/app/models/datosPModel';
import { DatosCvModel, PerfilCvModel } from 'src/app/models/plantillaCvModel';
import { PlantillaCvService } from 'src/app/services/plantilla-cv.service';


@Component({
  selector: 'app-plantilla-cv',
  templateUrl: './plantilla-cv.component.html',
  styleUrls: ['./plantilla-cv.component.css']
})
export class PlantillaCvComponent implements OnInit {

  datosP: DatosCvModel = {} as DatosCvModel;
  perfil: PerfilCvModel = {} as PerfilCvModel;

  constructor(private plantillaCvService: PlantillaCvService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.plantillaCvService.getDatosP().subscribe(
      (data: DatosCvModel[]) => {
        this.datosP = data[0]; // Obtener el primer elemento del array
      },
      error => {
        console.error('Error al obtener datosP:', error);
      }
    );

    this.plantillaCvService.getPerfil().subscribe(
      (data: PerfilCvModel[]) => {
        this.perfil = data[0]; // Obtener el primer elemento del array
      },
      error => {
        console.error('Error al obtener perfil:', error);
      }
    );
  }
}
