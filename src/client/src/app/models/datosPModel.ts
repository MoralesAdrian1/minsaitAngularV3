export class DatosPModel {
    _id?: string;
    telefono: number = 0;
    dateNac:Date;
    sexo: string="";
    cp: number=0;
    nombrePais: string="";
    nombreEstado:string="";
    nombreCiudad:string="";
    isDone: boolean = false; // Valor predeterminado
    user: number = 0; // Valor predeterminado
    n?:number;

    constructor(){
        this.dateNac=new Date();
    }
}