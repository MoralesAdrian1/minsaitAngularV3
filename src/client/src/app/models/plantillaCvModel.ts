
// datos-cv.model.ts
export interface DatosCvModel {
    _id: string;
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
    habilidades: string[];
    Sos: string[];
    experiencia: number;
    idiomas: string;
    certificaciones: string[];
  }