export class Node {
  constructor(readonly tuneId: string) {
    this.tuneId = tuneId;
  }
}

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
