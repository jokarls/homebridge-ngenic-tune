export interface Tune {
    tuneUuid: string;
    tuneName: string;
}

export interface Room {
    uuid: string;
    name: string;
    nodeUuid: string;
}

export interface Measurement {
    value: string;
}
