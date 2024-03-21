import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y Validators


import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
//servicios
import { DatosPService } from 'src/app/services/datos-pservice.service';
//modelos
import { DatosPModel } from 'src/app/models/datosPModel';
import { paisModel } from 'src/app/models/paisModel';
import { CiudadModel } from 'src/app/models/ciudadModel';
import { EstadoModel } from 'src/app/models/estadoModel';
import { EstadoService } from 'src/app/services/estado.service';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-datos-p',
  templateUrl: './datos-p.component.html',
  styleUrls: ['./datos-p.component.css']
})
export class DatosPComponent implements OnInit {
  datosP: DatosPModel[] = [];
  paises: paisModel[] = [];
  ciudad: CiudadModel[] = [];
  estado: EstadoModel[] = [];
  allEstados: EstadoModel[] = [];
  allCiudades: EstadoModel[] = [];
  filteredEstados: EstadoModel[] = [];
  filteredCiudades: CiudadModel[] = [];

  datosPForm: FormGroup;
  filtroEstado: string = '';
  filtroCiudad: string = '';
  filtroPais: string = '';
  filtroSexo: string = '';

  constructor(
    private datosPService: DatosPService,
    private fb: FormBuilder,
    private ciudadService: CiudadService // Agrega el servicio de CiudadService
  ) {
    this.datosPForm = this.fb.group({
      _id: [''],
      telefono: [0, Validators.required],
      dateNac: [0, Validators.required],
      sexo: ['', Validators.required],
      cp: [0, Validators.required],
      nombrePais: ['', Validators.required],
      nombreEstado: ['', Validators.required],
      nombreCiudad: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarDatosP();
    this.cargarPaises();
    this.cargarEstado();
    this.cargarEstados();
    this.cargarCiudad();
    this.cargarCiudades(); // Agrega la carga de ciudades al inicializar el componente
  }

  cargarDatosP() {
    this.datosPService.getDatosP().subscribe(
      data => {
        this.datosP = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarDatosP() {
    if (this.datosPForm.valid) {
      this.datosPService.addDatosP(this.datosPForm.value).subscribe(
        () => {
          this.cargarDatosP();
          this.datosPForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarDatosP() {
    if (this.datosPForm.valid) {
      this.datosPService.updateDatosP(this.datosPForm.value).subscribe(
        () => {
          this.cargarDatosP();
          this.datosPForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarDatosP(id: string | undefined) {
    if (id) {
      this.datosPService.deleteDatosP(id).subscribe(
        data => {
          console.log('Ciudad eliminada:', data);
          this.cargarDatosP();
        },
        error => {
          console.error('Error al eliminar ciudad:', error);
        }
      );
    }
  }

  editarDatosP(datosP: DatosPModel) {
    this.datosPForm.patchValue(datosP);
  }

  // Filtrado de datos
  cargarPaises() {
    this.datosPService.getPaises().subscribe(
      data => {
        this.paises = data;
      },
      error => {
        console.error('Error al cargar Paises:', error);
      }
    );
  }

  cargarEstado() {
    this.datosPService.getEstados().subscribe(
      data => {
        this.estado = data;
      },
      error => {
        console.error('Error al cargar Estados:', error);
      }
    );
  }

  cargarCiudad() {
    this.ciudadService.getCiudad().subscribe(
      data => {
        this.ciudad = data;
      },
      error => {
        console.error('Error al cargar Ciudades:', error);
      }
    );
  }

  filtrarEstadosPorPais(nombrePais: string) {
    this.filteredEstados = this.allEstados.filter(estado => estado.nombrePais === nombrePais);
  }

  filtrarCiudadesPorEstado(nombreEstado: string) {
    this.filteredCiudades = this.ciudad.filter(ciudad => ciudad.nombreEstado === nombreEstado);
  }

  cargarEstados() {
    this.datosPService.getEstados().subscribe(
      data => {
        this.allEstados = data;
      },
      error => {
        console.error('Error al cargar Estados:', error);
      }
    );
  }
  cargarCiudades() {
    this.datosPService.getCiudades().subscribe(
      data => {
        this.allCiudades = data;
      },
      error => {
        console.error('Error al cargar Ciudades:', error);
      }
    );
  }

  onPaisSelected(event: any) {
    const nombrePaisSeleccionado = event.target.value;
    if (nombrePaisSeleccionado !== null) {
      this.filtrarEstadosPorPais(nombrePaisSeleccionado);
    }
  }

  onEstadoSelected(event: any) {
    const nombreEstadoSeleccionado = event.target.value;
    if (nombreEstadoSeleccionado !== null) {
      this.filtrarCiudadesPorEstado(nombreEstadoSeleccionado);
    }
  }
}