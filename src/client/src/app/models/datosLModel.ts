export interface DatosLModel {
    _id?: string;
    puestoPostulante: string;
    lenguajeProgramacion: string[];
    tecnologias: string[];
    yearsExperiencia: number;
    idiomas: { nombreIdioma: string, nivel: string }[];
    certificaciones: { nombre: string, archivo?: File }[];
    isDone: boolean;
    n?: number;
  }