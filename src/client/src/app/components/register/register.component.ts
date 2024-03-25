import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: userModel[] = [];
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      _id: [''],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      status: ["User", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarUser();
  }

  cargarUser() {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error al cargar user:', error);
      }
    );
  }

  agregarUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(
        () => {
          this.cargarUser();
          this.userForm.reset();
          // Redireccionar al componente deseado después del registro
          this.router.navigate(['/datosP']);
        },
        error => {
          console.error('Error al agregar user:', error);
        }
      );
    }
  }

  actualizarUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value).subscribe(
        () => {
          this.cargarUser();
          this.userForm.reset();
        },
        error => {
          console.error('Error al actualizar user:', error);
        }
      );
    }
  }

  eliminarUser(id: string | undefined) {
    if (id) {
      this.userService.deleteUser(id).subscribe(
        data => {
          console.log('user eliminado:', data);
          this.cargarUser();
        },
        error => {
          console.error('Error al eliminar user:', error);
        }
      );
    }
  }

  editarUser(user: userModel) {
    this.userForm.patchValue(user);
  }
}
