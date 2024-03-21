export class PerfilModel {
    _id?: string;
    puesto: string = "";
    habilidades: string[] = [];
    Sos: string[] = [];
    experiencia: number = 0;
    idiomas: { [key: string]: string }[] = []; // Array de objetos con claves de string y valores de string
    certificaciones: { [key: string]: string }[] = []; // Array de objetos vacíos
    isDone: boolean = false;
    n?: number;
}
