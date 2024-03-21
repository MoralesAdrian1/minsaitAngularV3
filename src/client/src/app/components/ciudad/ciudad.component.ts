import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadModel } from 'src/app/models/ciudadModel';
import { EstadoModel } from 'src/app/models/estadoModel';
import { paisModel } from 'src/app/models/paisModel';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit{
  ciudad: CiudadModel[] = [];
  estado: EstadoModel[] = [];
  paises: paisModel[] = [];
  allEstados: EstadoModel[] = []; // Lista de todos los estados
  filteredEstados: EstadoModel[] = []; // Lista de estados filtrados
  ciudadForm: FormGroup;

  constructor(private ciudadService: CiudadService, private fb: FormBuilder) {
    this.ciudadForm = this.fb.group({
      _id: [''],
      nombrePais: ["", Validators.required],
      nombreEstado: ["", Validators.required],
      nombreCiudad: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.cargarCiudad();
    this.cargarPaises();
    this.cargarEstado();
    this.cargarEstados();
  }

  cargarCiudad() {
    this.ciudadService.getCiudad().subscribe(
      data => {
        this.ciudad = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarCiudad() {
    if (this.ciudadForm.valid) {
      this.ciudadService.addCiudad(this.ciudadForm.value).subscribe(
        () => {
          this.cargarCiudad();
          this.ciudadForm.reset();
        },
        error => {
          console.error('Error al agregar ciudad:', error);
        }
      );
    }
  }

  actualizarCiudad() {
    if (this.ciudadForm.valid) {
      this.ciudadService.updateCiudad(this.ciudadForm.value).subscribe(
        () => {
          this.cargarCiudad();
          this.ciudadForm.reset();
        },
        error => {
          console.error('Error al actualizar Ciudades:', error);
        }
      );
    }
  }

  eliminarCiudad(id: string | undefined) {
    if (id) {
      this.ciudadService.deleteCiudad(id).subscribe(
        data => {
          console.log('ciudad eliminado:', data);
          this.cargarCiudad();
        },
        error => {
          console.error('Error al eliminar ciudad:', error);
        }
      );
    }
  }

  editarCiudad(ciudad: CiudadModel) {
    this.ciudadForm.patchValue(ciudad);
  }
  cargarPaises() {
    this.ciudadService.getPaises().subscribe(
      data => {
        this.paises = data;
      },
      error => {
        console.error('Error al cargar Paises:', error);
      }
    );
  }
  cargarEstado() {
    this.ciudadService.getEstados().subscribe(
      data => {
        this.estado = data;
      },
      error => {
        console.error('Error al cargar Estados:', error);
      }
    );
  }
  filtrarEstadosPorPais(nombrePais: string) {
    this.filteredEstados = this.allEstados.filter(estado => estado.nombrePais === nombrePais);
  }
  cargarEstados() {

    this.ciudadService.getEstados().subscribe(
      data => {
        this.allEstados = data;
      },
      error => {
        console.error('Error al cargar Estados:', error);
      }
    );
  }
  onPaisSelected(event: any) {
    const nombrePaisSeleccionado = event.target.value;
    if (nombrePaisSeleccionado !== null) {
      this.filtrarEstadosPorPais(nombrePaisSeleccionado);
    }
  }
  
}
