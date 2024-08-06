import { Account } from './account';

export class SharedTask {
  id: string;
  task: {
    id: string;
    title: string;
    description: string;
    account: Account;
  };
  account: string;

  constructor(json: any) {
    this.id = json.id;
    this.task = {
      id: json.task.id,
      title: json.task.title,
      description: json.task.description,
      account: new Account(json.task.account),
    };
    this.account = json.account;
  }
}