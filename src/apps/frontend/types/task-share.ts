import { JsonObject } from './common-types';

export class TaskShare {
    sharedWith: string[];

    constructor(json: JsonObject) {
        this.sharedWith = json.sharedWith as string[];
    }
}
