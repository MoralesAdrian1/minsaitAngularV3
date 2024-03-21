import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoModel } from 'src/app/models/estadoModel';
import { paisModel } from 'src/app/models/paisModel';
import { EstadoService } from 'src/app/services/estado.service';
@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  estado: EstadoModel[] = [];
  paises: paisModel[] = [];
  estadoForm: FormGroup;

  constructor(private estadoService: EstadoService, private fb: FormBuilder) {
    this.estadoForm = this.fb.group({
      _id: [''],
      nombrePais: ["", Validators.required],
      nombreEstado: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarEstado();
    this.cargarPaises();
  }

  cargarEstado() {
    this.estadoService.getEstado().subscribe(
      data => {
        this.estado = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarEstado() {
    if (this.estadoForm.valid) {
      this.estadoService.addEstado(this.estadoForm.value).subscribe(
        () => {
          this.cargarEstado();
          this.estadoForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarPais() {
    if (this.estadoForm.valid) {
      this.estadoService.updateEstado(this.estadoForm.value).subscribe(
        () => {
          this.cargarEstado();
          this.estadoForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarEstado(id: string | undefined) {
    if (id) {
      this.estadoService.deleteEstado(id).subscribe(
        data => {
          console.log('Estado eliminado:', data);
          this.cargarEstado();
        },
        error => {
          console.error('Error al eliminar Estado:', error);
        }
      );
    }
  
  }

  editarEstado(estado: EstadoModel) {
    this.estadoForm.patchValue(estado);
  }
  cargarPaises() {
    this.estadoService.getPaises().subscribe(
      data => {
        this.paises = data;
      },
      error => {
        console.error('Error al cargar Paises:', error);
      }
    );
  }
}
