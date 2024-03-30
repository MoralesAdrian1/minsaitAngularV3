import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosExModel } from 'src/app/models/datosExperienciaModel';
import { DatosExperienciaService } from 'src/app/services/datos-experiencia.service';

@Component({
  selector: 'app-datos-experiencia',
  templateUrl: './datos-experiencia.component.html',
  styleUrls: ['./datos-experiencia.component.css']
})
export class DatosExperienciaComponent implements OnInit {
  datosEx: DatosExModel[] = [];
  datosExForm: FormGroup;


  constructor(private datosExService: DatosExperienciaService, private fb: FormBuilder) {
    this.datosExForm = this.fb.group({
      _id: [''],
      username: ["", Validators.required],
      datosEmpresa: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarDatosEx();
  }

  cargarDatosEx() {
    this.datosExService.getDatosEx().subscribe(
      data => {
        this.datosEx = data;
      },
      error => {
        console.error('Error al cargar datosL:', error);
      }
    );
  }

  agregarDatosEx() {
    if (this.datosExForm.valid) {
      const nuevoDatosEx: DatosExModel = this.datosExForm.value;
      this.datosExService.addDatosEx(nuevoDatosEx).subscribe(
        () => {
          this.cargarDatosEx();
          this.datosExForm.reset();
        },
        error => {
          console.error('Error al agregar daotsEx', error);
        }
      );
    }
  }

  actualizarDatosEx() {
    if (this.datosExForm.valid) {
      const datosExId = this.datosExForm.get('_id')?.value; // Obtener el ID del dato de experiencia
      const datosExActualizado: DatosExModel = this.datosExForm.value; // Obtener los datos actualizados del formulario
  
      // Agregar el ID al objeto actualizado
      datosExActualizado._id = datosExId;
  
      this.datosExService.updateDatosEx(datosExActualizado).subscribe(
        () => {
          this.cargarDatosEx();
          this.datosExForm.reset();
        },
        error => {
          console.error('Error al actualizar DatosEx:', error);
        }
      );
    }
  }
  
  
  
  

  eliminarDatosEx(id: string | undefined) {
    if (id) {
      this.datosExService.deleteDatosEx(id).subscribe(
        data => {
          console.log('datosEx eliminado:', data);
          this.cargarDatosEx();
        },
        error => {
          console.error('Error al eliminar datosL:', error);
        }
      );
    }
  }

  editarDatosEx(datosL: DatosExModel) {
    this.datosExForm.patchValue(datosL);
  }
  //Datos Empresa
  agregarEmpresa() {
    const idiomaGroup = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      puesto:['', Validators.required],
      fechaInicio:['', Validators.required],
      fechaFin:['', Validators.required], 
    });
    this.datosEmpresa.push(idiomaGroup);
  }
  
  
    get datosEmpresa() {
      return this.datosExForm.get('datosEmpresa') as FormArray;
    }
}
