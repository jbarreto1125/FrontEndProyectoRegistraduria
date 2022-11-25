import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private servicioSeguridad : SeguridadService, private router : Router) { }

  usuario? : string
  password? : string

  ngOnInit(): void {
  }
  
  login(): void{
    console.log("Usuario: " + this.usuario + " Contraseña : " + this.password)

    let u : Usuario = {
      email: this.usuario,
      contrasena: this.password
    }

    this.servicioSeguridad.login(u).subscribe(
      
      data => {  
        this.servicioSeguridad.guardarDatosSesion(data);
        this.router.navigate(["pahes/dashboard"]);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error["error"]["message"],
          timer: 5000
        })
      }

    )
       

  }
 
}
  
  


