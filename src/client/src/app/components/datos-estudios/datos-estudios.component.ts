import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosEstudioModel } from 'src/app/models/datosEstudioModel';
import { DatosEstudiosService } from 'src/app/services/datos-estudios.service';

@Component({
  selector: 'app-datos-estudios',
  templateUrl: './datos-estudios.component.html',
  styleUrls: ['./datos-estudios.component.css']
})
export class DatosEstudiosComponent {
  datosEs: DatosEstudioModel[] = [];
  datosEsForm: FormGroup;


  constructor(private datosEsService: DatosEstudiosService, private fb: FormBuilder) {
    this.datosEsForm = this.fb.group({
      _id: [''],
      username: ["", Validators.required],
      datosAcademicos: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarDatosEs();
  }

  cargarDatosEs() {
    this.datosEsService.getDatosEstudios().subscribe(
      data => {
        this.datosEs = data;
      },
      error => {
        console.error('Error al cargar datosL:', error);
      }
    );
  }

  agregarDatosEs() {
    if (this.datosEsForm.valid) {
      const nuevoDatosEs: DatosEstudioModel = this.datosEsForm.value;
      this.datosEsService.addDatosEstudios(nuevoDatosEs).subscribe(
        () => {
          this.cargarDatosEs();
          this.datosEsForm.reset();
        },
        error => {
          console.error('Error al agregar daotsEx', error);
        }
      );
    }
  }

  actualizarDatosEs() {
    if (this.datosEsForm.valid) {
      const datosEsId = this.datosEsForm.get('_id')?.value; // Obtener el ID del dato de experiencia
      const datosEsActualizado: DatosEstudioModel = this.datosEsForm.value; // Obtener los datos actualizados del formulario
  
      // Agregar el ID al objeto actualizado
      datosEsActualizado._id = datosEsId;
  
      this.datosEsService.updateDatosEstudios(datosEsActualizado).subscribe(
        () => {
          this.cargarDatosEs();
          this.datosEsForm.reset();
        },
        error => {
          console.error('Error al actualizar DatosEs:', error);
        }
      );
    }
  }
  
  
  
  

  eliminarDatosEs(id: string | undefined) {
    if (id) {
      this.datosEsService.deleteDatosEstudios(id).subscribe(
        data => {
          console.log('datosEx eliminado:', data);
          this.cargarDatosEs();
        },
        error => {
          console.error('Error al eliminar datosL:', error);
        }
      );
    }
  }

  editarDatosEs(datosEs: DatosEstudioModel) {
    this.datosEsForm.patchValue(datosEs);
  }
  //Datos Titulo
  agregarTitulo() {
    const datosAcademicosGroup = this.fb.group({
      nombreUniv: ['', Validators.required],
      titulo:['', Validators.required],
      fechaInicio:['', Validators.required],
      fechaFin:['', Validators.required], 
    });
    this.datosAcademicos.push(datosAcademicosGroup);
  }
  
  
    get datosAcademicos() {
      return this.datosEsForm.get('datosAcademicos') as FormArray;
    }
}
