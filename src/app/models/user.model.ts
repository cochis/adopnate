export class User {
    uid: string;
    roleUser?: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    nameUser?:      string;
    lastNameUser?:  string;
    surNameUser?:   string;
    ageUser?:       number;
    birthDate?:       number;
    ocupationUser?: string;
    adressUser?:    AdressUser;
    conexionUser?:  ConexionUser;
    dateCreated?: number;
}

export interface AdressUser {
    streetAdress?:    string;
    numberAdressExt?: string;
    numberAdressInt?: string;
    coloniAdress?:    string;
    cityAdress?:      string;
    stateAdress?:     string;
    cpAdress?:        number;
}

export interface ConexionUser {
    phoneHome?: ConexionValue;
    phoneCel?:  ConexionValue;
    email?:     ConexionValue;
}

export interface ConexionValue {
    visible?: boolean;
    value?:   string;
}
