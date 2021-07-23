export class UsuarioModel {
    uid?: string;
    roleUser?: string;
    nameUser?: string;
    lastNameUser?: string;
    surNameUser?: string;
    ageUser?: number;
    birthDate?: number;
    ocupationUser?: string;
    adressUser?: AdressUser;
    conexionUser?: ConexionUser;
    descriptionUser?: string;
    activatedUser?: boolean;
    dateCreated?: number;
    passwordUser?: string;
    emailUser?: string;
    localId?: string;
}
export class RegisterUsuarioModel {
    passwordUser?: string;
    emailUser?: string;
}

export class AdressUser {
    streetAdress?: string;
    numberAdressEXT?: string;
    numberAdressInt?: string;
    coloniAdress?: string;
    cityAdress?: string;
    stateAdress?: string;
    cpAdress?: number;
}

export class ConexionUser {
    phoneHome?: Values;
    phoneCel?: Values;
    email?: Values;
}

export class Values {
    visible?: boolean;
    value?: string;
}
