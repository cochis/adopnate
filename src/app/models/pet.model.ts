/* eslint-disable @typescript-eslint/naming-convention */
export class PetModel {
    uIdPet?:         string;
    userName?:        string;
    categoriesPet?:  categoriesPet[];
    namePet?:        string;
    agePet?:         number;
    racePet?:        string;
    cartillaPet?:    boolean;
    vaccinesPet?:     vaccinesPet[];
    picturesPet?:     picturePet[];
    qualitysPet?:    qualitysPet[];
    descriptionPet?: string;
    createBy?:       string;
    adoptatedPet?:   boolean;
    dateCreatedPet?:    number;

}
export class vaccinesPet {
    vaccine?:  string;
    description?:  string;
    date?: number;
}
export class categoriesPet {
    type?:  string;
    value?: string;
}

export class picturePet {
    file?: any;
    name?:    string;
    url?:    string;
}

export class qualitysPet {
    sentence?: string;
    value?:    number;
}
