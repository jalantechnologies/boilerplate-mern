import App from '../../../src/app';
import AccountRepository from '../../../src/modules/account/internal/store/account-repository';
import TaskRepository from '../../../src/modules/task/internal/store/task-repository';

export let app;

before(async () => {
  console.log('starting server');
  app = await App.startRESTApiServer();
});

after(async () => {
  await AccountRepository.accountDB.deleteMany();
  await TaskRepository.taskDB.deleteMany();
});
