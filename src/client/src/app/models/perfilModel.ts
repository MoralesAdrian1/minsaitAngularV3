export class PerfilModel {
    _id?: string;
    puesto: string = "";
    lenguajeProgramacion: string[] = [];
    Sos: string[] = [];
    yearsExperiencia: number = 0;
    idiomas: { [key: string]: string }[] = []; // Array de objetos con claves de string y valores de string
    certificaciones: { [key: string]: string }[] = []; // Array de objetos vacíos
    isDone: boolean = false;
    n?: number;
}
