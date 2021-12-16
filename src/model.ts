export class Node {
  constructor(readonly tuneId: string) {
    this.tuneId = tuneId;
  }
}

export interface Tune {

}

export interface Room {
    uuid: string;
    name: string;
    nodeUuid: string;
}
