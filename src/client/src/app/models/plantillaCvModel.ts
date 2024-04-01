
// datos-cv.model.ts
export interface DatosCvModel {
  _id: string;
  username:string;
  telefono: string;
  dateNac: string;
  sexo: string;
  cp: string;
  nombrePais: string;
  nombreEstado: string;
  nombreCiudad: string;
}

// // perfil-cv.model.ts
// export interface PerfilCvModel {
//   _id: string;
//   puesto: string;
//   lenguajeProgramacion: string[];
//   Sos: string[];
//   yearsExperiencia: number;
//   idiomas: string;
//   certificaciones: string[];
// }

export interface PerfilCvModel {
  _id?: string;
  username:String;
  puestoPostulante: string;
  lenguajeProgramacion: string[];
  tecnologias: string[];
  yearsExperiencia: number;
  idiomas: { nombreIdioma: string, nivel: string }[];
  certificaciones: { nombre: string, archivo?: File }[];
  isDone: boolean; 
  n?: number;
}

export interface DatosExCVModel {
  _id?: string;
  username:String;
  datosEmpresa: { nombreEmpresa: string, puesto: string, fechaInicio: String, fechaFin:String }[];
  isDone: boolean;
  n?: number;
}
export interface DatosEsCvModel {
  _id?: string;
  username:String;
  datosAcademicos: { nombreUniv: string, titulo: string, fechaInicio: String, fechaFin:String }[];
  isDone: boolean;
  n?: number;
}
