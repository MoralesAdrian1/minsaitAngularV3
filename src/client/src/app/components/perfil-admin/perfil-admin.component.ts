import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private perfilService: PerfilAdminService, private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      _id: [''],
      puesto: ["", Validators.required],
      habilidades: [[], Validators.required], // Cambio para recibir un array
      Sos: [[], Validators.required], // Cambio para recibir un array
      experiencia: [0, Validators.required],
      idiomas: [[], Validators.required], // Cambio para recibir un array
      certificaciones: [[]], // Cambio para recibir un array vacío
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
        // Dividir los valores de habilidades, Sos, idiomas y certificaciones por comas
        const habilidades = this.perfilForm.value.habilidades.split(',');
        const Sos = this.perfilForm.value.Sos.split(',');
        const idiomas = this.perfilForm.value.idiomas.split(',');
        const certificaciones = this.perfilForm.value.certificaciones.split(',');

        // Construir un nuevo objeto con los datos actualizados
        const nuevoPerfil = {
            ...this.perfilForm.value,
            habilidades,
            Sos,
            idiomas,
            certificaciones
        };

        // Llamar al método del servicio para agregar el perfil
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
      this.perfilService.updatePerfil(this.perfilForm.value).subscribe(
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
}
