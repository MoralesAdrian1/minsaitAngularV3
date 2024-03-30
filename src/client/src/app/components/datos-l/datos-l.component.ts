import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosLModel } from 'src/app/models/datosLModel';
import { DatosLService } from 'src/app/services/datos-l.service';

@Component({
  selector: 'app-datos-l',
  templateUrl: './datos-l.component.html',
  styleUrls: ['./datos-l.component.css']
})
export class DatosLComponent implements OnInit{
  datosL: DatosLModel[] = [];
  datosLForm: FormGroup;

  lenguajesProgramacionDisponibles: string[] = ["JavaScript", "Java", "Python", "JSX", "Kotlin"];
  tecnologiasDisponibles: string[] = ["Angular", "SpringBoot 5", "React"];
  idiomasDisponibles: string[] = ["Inglés", "Francés"];
  nivelIdiomasDisponibles: string[] = ["A2", "B1", "B2","C1", "C2"];

  constructor(private datosLService: DatosLService, private fb: FormBuilder) {
    this.datosLForm = this.fb.group({
      _id: [''],
      puestoPostulante: ["", Validators.required],
      lenguajeProgramacion: [[]],
      tecnologias: [[]],
      yearsExperiencia: [0, Validators.required],
      idiomas: this.fb.array([]),
      certificaciones: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarDatosL();
  }

  cargarDatosL() {
    this.datosLService.getDatosL().subscribe(
      data => {
        this.datosL = data;
      },
      error => {
        console.error('Error al cargar datosL:', error);
      }
    );
  }

  agregarDatosL() {
    if (this.datosLForm.valid) {
      const nuevoDatosL: DatosLModel = this.datosLForm.value;
      this.datosLService.addDatosL(nuevoDatosL).subscribe(
        () => {
          this.cargarDatosL();
          this.datosLForm.reset();
        },
        error => {
          console.error('Error al agregar datosL', error);
        }
      );
    }
  }

  actualizarDatosL() {
    if (this.datosLForm.valid) {
      const DatosLActualizado: DatosLModel = this.datosLForm.value;
      this.datosLService.updateDatosL(DatosLActualizado).subscribe(
        () => {
          this.cargarDatosL();
          this.datosLForm.reset();
        },
        error => {
          console.error('Error al actualizar datosL:', error);
        }
      );
    }
  }

  eliminarDatosL(id: string | undefined) {
    if (id) {
      this.datosLService.deleteDatosL(id).subscribe(
        data => {
          console.log('datosL eliminado:', data);
          this.cargarDatosL();
        },
        error => {
          console.error('Error al eliminar datosL:', error);
        }
      );
    }
  }

  editarDatosL(datosL: DatosLModel) {
    this.datosLForm.patchValue(datosL);
  }
  //certificacciones
  agregarCertificacion() {
  const certificacionGroup = this.fb.group({
    nombre: ['', Validators.required],
    archivo: [null] // Hacer el archivo opcional
  });
  this.certificaciones.push(certificacionGroup);
}


  get certificaciones() {
    return this.datosLForm.get('certificaciones') as FormArray;
  }

  manejarArchivoInput(event: any, index: number) {
    const archivo = (event.target as HTMLInputElement).files![0];
    this.certificaciones.at(index).get('archivo')!.setValue(archivo);
  }
  //idiomas
  agregarIdioma() {
    const idiomaGroup = this.fb.group({
      nombreIdioma: ['', Validators.required],
      nivel:['', Validators.required], 
    });
    this.idiomas.push(idiomaGroup);
  }
  
  
    get idiomas() {
      return this.datosLForm.get('idiomas') as FormArray;
    }
}
