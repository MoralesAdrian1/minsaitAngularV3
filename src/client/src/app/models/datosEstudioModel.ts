export interface DatosEstudioModel {
    _id?: string;
    username:String;
    datosAcademicos: { nombreUniv: string, titulo: string, fechaInicio: String, fechaFin:String }[];
    isDone: boolean;
    n?: number;
  }