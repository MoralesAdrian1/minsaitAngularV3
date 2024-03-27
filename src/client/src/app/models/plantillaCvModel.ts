
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

// perfil-cv.model.ts
export interface PerfilCvModel {
  _id: string;
  puesto: string;
  lenguajeProgramacion: string[];
  Sos: string[];
  yearsExperiencia: number;
  idiomas: string;
  certificaciones: string[];
}