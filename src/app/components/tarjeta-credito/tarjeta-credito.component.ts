import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listaTarjeta: any[] = [];
  form: FormGroup;
  accion = "Agregar";
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService,private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular: ['',[Validators.required, Validators.maxLength(50),Validators.minLength(4)]],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }
  obtenerTarjeta () {
    this._tarjetaService.getListTarjetas().subscribe(data=>{
      this.listaTarjeta = data;
      console.log(data);
    }, error =>{
      this.toastr.error('Opss.. ocurrio un error', 'Error')
      console.log(error);
    });
  }

  guardarTarjeta() {
    const tarjerta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }

    if (this.id == undefined){
      this._tarjetaService.saveTarjeta(tarjerta).subscribe(data => {
        this.toastr.success('Tarjeta Agregada', 'Tarjeta agregada con exitos!');
        this.obtenerTarjeta();
        this.form.reset();
      }, error =>{
        this.toastr.error('Opss.. ocurrio un error', 'Error')
        console.log(error);
      });
    } else {
      tarjerta.id = this.id;
      //  Editar
      this._tarjetaService.updateTarjeta(this.id, tarjerta).subscribe(data => {
        this.form.reset();
        this.accion = "Agregar";
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
        this.obtenerTarjeta();
      }, error =>{
        this.toastr.error('Opss.. ocurrio un error', 'Error')
        console.log(error);
      });
    }  
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data=>{
      this.toastr.error('Tarjeta Eliminada','Tarjeta eliminada con exitos');
      this.obtenerTarjeta();
    }, error =>{
      this.toastr.error('Opss.. ocurrio un error', 'Error')
      console.log(error);
    });
  }

  editarTarjeta(tarjeta: any){
    this.accion = "Editar";
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });
  }
}
