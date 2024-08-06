import { JsonObject } from './common-types';

export class Comment {
    id: string;
    task: string;
    account: {
        id: string;
        firstName: string;
        lastName: string;
        username:string;
    };
    comment:string;
    createdAt: Date;
    updateAt: Date;

    constructor(json: JsonObject){
        this.id = json.id as string;
        this.task = json.task as string;
        this.account= {
            id: (json.account as JsonObject).id as string,
            firstName: (json.account as JsonObject).firstName as string,
            lastName: (json.account as JsonObject).lastName as string,
            username: (json.account as JsonObject).username as string,
        };
        this.comment=json.comment as string;
        this.createdAt= new Date(json.createdAt as string);
        this.updateAt= new Date(json.updateAt as string);
    }
}
