export class DatosEstudioModel {
    _id?: string;
    username: string = "";
    datosAcedemicos: { nombreUniv: string, titulo: string, fechaInicio:Date, fechaFin:Date }[] = []; // Hacer 'archivo' opcional
    isDone: boolean = false;
    n?: number;
    fechaInicio: Date;
    fechaFin: Date;

    constructor(){
        this.fechaInicio=new Date();
        this.fechaFin=new Date();
    }
}