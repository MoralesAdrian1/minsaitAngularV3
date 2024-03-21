import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paisModel } from 'src/app/models/paisModel';
import { PaisService } from 'src/app/services/pais.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  pais: paisModel[] = [];
  paisForm: FormGroup;

  constructor(private PaisService: PaisService, private fb: FormBuilder) {
    this.paisForm = this.fb.group({
      _id: [''],
      nombrePais: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarPais();
  }

  cargarPais() {
    this.PaisService.getPais().subscribe(
      data => {
        this.pais = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarPais() {
    if (this.paisForm.valid) {
      this.PaisService.addPais(this.paisForm.value).subscribe(
        () => {
          this.cargarPais();
          this.paisForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarPais() {
    if (this.paisForm.valid) {
      this.PaisService.updatePais(this.paisForm.value).subscribe(
        () => {
          this.cargarPais();
          this.paisForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarPais(id: string | undefined) {
    if (id) {
      this.PaisService.deletePais(id).subscribe(
        data => {
          console.log('Pais eliminado:', data);
          this.cargarPais();
        },
        error => {
          console.error('Error al eliminar Pais:', error);
        }
      );
    }
  }

  editarPais(pais: paisModel) {
    this.paisForm.patchValue(pais);
  }
}
