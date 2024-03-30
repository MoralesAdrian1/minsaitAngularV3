import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilModel } from 'src/app/models/perfilModel';
import { PerfilAdminService } from 'src/app/services/perfil-admin.service';

@Component({
    selector: 'app-perfil-admin',
    templateUrl: './perfil-admin.component.html',
    styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {
    perfil: PerfilModel[] = [];
    perfilForm: FormGroup;

    lenguajesProgramacionDisponibles: string[] = ["JavaScript", "Java", "Python", "JSX", "Kotlin"];
    TecnologiasDisponibles: string[] = ["Angular", "SpringBoot 5", "React"];
    idiomasDisponibles: string[] = ["Inglés", "Español", "Francés"];
    nivelIdiomasDisponibles: string[] = ["A2", "B1", "B2","C1", "C2"];
    certificacionesDisponibles: string[] = ["Certificación 1", "Certificación 2", "Certificación 3"];
i: any;

    constructor(private perfilService: PerfilAdminService, private fb: FormBuilder) {
        this.perfilForm = this.fb.group({
            _id: [''],
            puesto: ["", Validators.required],
            lenguajeProgramacion: [[]],
            tecnologia: [[]],
            yearsExperiencia: [0, Validators.required],
            idiomas: this.fb.array([]),
            certificaciones: [[]],
        });
    }

    ngOnInit() {
        this.cargarPerfil();
    }

    cargarPerfil() {
        this.perfilService.getPerfil().subscribe(
            data => {
                this.perfil = data;
            },
            error => {
                console.error('Error al cargar datos Personales:', error);
            }
        );
    }

    agregarPerfil() {
        if (this.perfilForm.valid) {
            const nuevoPerfil = {
                ...this.perfilForm.value
            };

            this.perfilService.addPerfil(nuevoPerfil).subscribe(
                () => {
                    this.cargarPerfil();
                    this.perfilForm.reset();
                },
                error => {
                    console.error('Error al agregar perfil', error);
                }
            );
        }
    }

    actualizarPerfil() {
        if (this.perfilForm.valid) {
            const perfilActualizado = {
                ...this.perfilForm.value
            };

            this.perfilService.updatePerfil(perfilActualizado).subscribe(
                () => {
                    this.cargarPerfil();
                    this.perfilForm.reset();
                },
                error => {
                    console.error('Error al actualizar perfil:', error);
                }
            );
        }
    }

    eliminarPerfil(id: string | undefined) {
        if (id) {
            this.perfilService.deletePerfil(id).subscribe(
                data => {
                    console.log('Perfil eliminado:', data);
                    this.cargarPerfil();
                },
                error => {
                    console.error('Error al eliminar Perfil:', error);
                }
            );
        }
    }

    editarPerfil(perfil: PerfilModel) {
        this.perfilForm.patchValue(perfil);
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
      return this.perfilForm.get('idiomas') as FormArray;
    }
}
