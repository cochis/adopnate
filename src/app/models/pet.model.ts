/* eslint-disable @typescript-eslint/naming-convention */
export class PetModel {
    uid?: string;
    userUid?: string;
    userName?: string;
    categoriesPet?: categoriesPet[];
    namePet?: string;
    agePet?: number;
    racePet?: string;
    cartillaPet?: boolean;
    vaccines?: vaccines[];
    picturesPet?: picturePet[];
    qualitysPet?: qualitysPet[];
    descriptionPet?: string;
    adoptatedPet?: boolean;
    dateCreated?: number;
    estatePet: string;
    delegationPet: string;
    colonyPet: string;

}
export class vaccines {
    vaccine?: string;
    description?: string;
    date?: number;
}
export class categoriesPet {
    type?: string;
    value?: string;
}

export class picturePet {
    file?: any;
    name?: string;
    url?: string;
}

export class qualitysPet {
    sentence?: string;
    value?: number;
}
