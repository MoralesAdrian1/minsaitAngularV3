export interface DatosExModel {
    _id?: string;
    username:String;
    datosEmpresa: { nombreEmpresa: string, puesto: string, fechaInicio: String, fechaFin:String }[];
    isDone: boolean;
    n?: number;
  }