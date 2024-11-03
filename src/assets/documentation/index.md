[
  {
    "method": "POST",
    "rootRouterPath": "/accounts/",
    "routerPath": "/",
    "controllerMethod": "createAccount = applicationController(\n    async (req: Request<CreateAccountParams>, res: Response) => {\n      let account: Account;\n      const { firstName, lastName, password, username } =\n        req.body as CreateAccountParamsByUsernameAndPassword;\n      const { phoneNumber } = req.body as CreateAccountParamsByPhoneNumber;\n\n      if (username && password) {\n        account = await AccountService.createAccountByUsernameAndPassword(\n          firstName,\n          lastName,\n          password,\n          username,\n        );\n      } else if (phoneNumber) {\n        account = await AccountService.getOrCreateAccountByPhoneNumber(\n          new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber),\n        );\n      }\n\n      const accountJSON = serializeAccountAsJSON(account);\n\n      res.status(HttpStatusCodes.CREATED).send(accountJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class Account {\n  firstName: string;\n  hashedPassword: string;\n  id: string;\n  lastName: string;\n  phoneNumber: PhoneNumber;\n  username: string;\n}",
    "serializerMethod": "export const serializeAccountAsJSON = (account: Account): unknown => ({\n  id: account.id,\n  phoneNumber: account.phoneNumber,\n  firstName: account.firstName,\n  lastName: account.lastName,\n  username: account.username,\n});"
  },
  {
    "method": "PATCH",
    "rootRouterPath": "/accounts/",
    "routerPath": "/:accountId",
    "controllerMethod": "updateAccount = applicationController(\n    async (req: Request<UpdateAccountParams>, res: Response) => {\n      const { accountId } = req.params;\n      let account: Account;\n      const { firstName, lastName } = req.body as UpdateAccountDetailsParams;\n\n      const { newPassword, token } = req.body as ResetPasswordParams;\n\n      if (newPassword && token) {\n        account = await AccountService.resetAccountPassword({\n          accountId,\n          newPassword,\n          token,\n        });\n      } else {\n        account = await AccountService.updateAccountDetails({\n          accountId,\n          firstName,\n          lastName,\n        });\n      }\n\n      const accountJSON = serializeAccountAsJSON(account);\n\n      res.status(HttpStatusCodes.OK).send(accountJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class Account {\n  firstName: string;\n  hashedPassword: string;\n  id: string;\n  lastName: string;\n  phoneNumber: PhoneNumber;\n  username: string;\n}",
    "serializerMethod": "export const serializeAccountAsJSON = (account: Account): unknown => ({\n  id: account.id,\n  phoneNumber: account.phoneNumber,\n  firstName: account.firstName,\n  lastName: account.lastName,\n  username: account.username,\n});"
  },
  {
    "method": "DELETE",
    "rootRouterPath": "/accounts/",
    "routerPath": "/:accountId",
    "controllerMethod": "deleteAccount = applicationController(\n    async (req: Request<DeleteAccountParams>, res: Response) => {\n      const { accountId } = req.params as DeleteAccountParams;\n      await AccountService.deleteAccountById({\n        accountId,\n      });\n\n      res.status(HttpStatusCodes.NO_CONTENT).send();\n    },\n  );",
    "responseObjectTypeDefinition": null,
    "serializerMethod": null
  },
  {
    "method": "GET",
    "rootRouterPath": "/accounts/",
    "routerPath": "/:accountId",
    "controllerMethod": "getAccountById = applicationController(\n    async (req: Request<GetAccountParams>, res: Response) => {\n      const account = await AccountService.getAccountById({\n        accountId: req.params.accountId,\n      });\n      const accountJSON = serializeAccountAsJSON(account);\n\n      res.status(HttpStatusCodes.OK).send(accountJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class Account {\n  firstName: string;\n  hashedPassword: string;\n  id: string;\n  lastName: string;\n  phoneNumber: PhoneNumber;\n  username: string;\n}",
    "serializerMethod": "export const serializeAccountAsJSON = (account: Account): unknown => ({\n  id: account.id,\n  phoneNumber: account.phoneNumber,\n  firstName: account.firstName,\n  lastName: account.lastName,\n  username: account.username,\n});"
  },
  {
    "method": "POST",
    "rootRouterPath": "/access-tokens/",
    "routerPath": "/",
    "controllerMethod": "createAccessToken = applicationController(\n    async (req: Request<CreateAccessTokenParams>, res: Response) => {\n      let accessToken: AccessToken;\n      const { username, password } =\n        req.body as EmailBasedAuthAccessTokenRequestParams;\n      const { phoneNumber, otpCode } =\n        req.body as OTPBasedAuthAccessTokenRequestParams;\n\n      if (username && password) {\n        accessToken =\n          await AccessTokenService.createAccessTokenByUsernameAndPassword(\n            password,\n            username,\n          );\n      } else if (phoneNumber && otpCode) {\n        accessToken = await AccessTokenService.createAccessTokenByPhoneNumber(\n          otpCode,\n          new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber),\n        );\n      }\n\n      const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);\n\n      res.send(accessTokenJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class AccessToken {\n  token: string;\n  accountId: string;\n  expiresAt: Date;\n}",
    "serializerMethod": "export const serializeAccessTokenAsJSON = (\n  accessToken: AccessToken,\n): unknown => ({\n  accountId: accessToken.accountId,\n  expiresAt: accessToken.expiresAt.toUTCString(),\n  token: accessToken.token,\n});"
  },
  {
    "method": "POST",
    "rootRouterPath": "/",
    "routerPath": "/password-reset-tokens",
    "controllerMethod": "createPasswordResetToken = applicationController(\n    async (req: Request<CreatePasswordResetTokenParams>, res: Response) => {\n      const passwordResetToken =\n        await PasswordResetTokenService.createPasswordResetToken({\n          username: req.body.username,\n        });\n\n      const passwordResetTokenJSON =\n        serializePasswordResetTokenAsJSON(passwordResetToken);\n\n      res.status(HttpStatusCodes.CREATED).send(passwordResetTokenJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class PasswordResetToken {\n  id: string;\n\n  account: string;\n\n  expiresAt: Date;\n\n  isExpired: boolean;\n\n  token: string;\n\n  isUsed: boolean;\n}",
    "serializerMethod": "export const serializePasswordResetTokenAsJSON = (\n  passwordResetToken: PasswordResetToken,\n): unknown => ({\n  id: passwordResetToken.id,\n  account: passwordResetToken.account,\n  expiresAt: passwordResetToken.expiresAt,\n  token: passwordResetToken.token,\n  isUsed: passwordResetToken.isUsed,\n  isExpired: passwordResetToken.isExpired,\n});"
  },
  {
    "method": "POST",
    "rootRouterPath": "/tasks/",
    "routerPath": "/",
    "controllerMethod": "createTask = applicationController(\n    async (req: Request<CreateTaskParams>, res: Response) => {\n      const task: Task = await TaskService.createTask({\n        accountId: req.accountId,\n        description: req.body.description,\n        title: req.body.title,\n      });\n      const taskJSON = serializeTaskAsJSON(task);\n\n      res.status(HttpStatusCodes.CREATED).send(taskJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class Task {\n  id: string;\n  account: string;\n  description: string;\n  title: string;\n}",
    "serializerMethod": "export const serializeTaskAsJSON = (task: Task): unknown => ({\n  id: task.id,\n  account: task.account,\n  description: task.description,\n  title: task.title,\n});"
  },
  {
    "method": "GET",
    "rootRouterPath": "/tasks/",
    "routerPath": "/",
    "controllerMethod": "getTasks = applicationController(async (req: Request, res: Response) => {\n    const page = +req.query.page;\n    const size = +req.query.size;\n    const params: GetAllTaskParams = {\n      accountId: req.accountId,\n      page,\n      size,\n    };\n\n    const tasks = await TaskService.getTasksForAccount(params);\n    const tasksJSON = tasks.map((task) => serializeTaskAsJSON(task));\n\n    res.status(HttpStatusCodes.OK).send(tasksJSON);\n  });",
    "responseObjectTypeDefinition": "export class Task {\n  id: string;\n  account: string;\n  description: string;\n  title: string;\n}",
    "serializerMethod": "export const serializeTaskAsJSON = (task: Task): unknown => ({\n  id: task.id,\n  account: task.account,\n  description: task.description,\n  title: task.title,\n});"
  },
  {
    "method": "GET",
    "rootRouterPath": "/tasks/",
    "routerPath": "/:id",
    "controllerMethod": "getTask = applicationController(\n    async (req: Request<GetTaskParams>, res: Response) => {\n      const task = await TaskService.getTaskForAccount({\n        accountId: req.accountId,\n        taskId: req.params.id,\n      });\n      const taskJSON = serializeTaskAsJSON(task);\n\n      res.status(HttpStatusCodes.OK).send(taskJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class Task {\n  id: string;\n  account: string;\n  description: string;\n  title: string;\n}",
    "serializerMethod": "export const serializeTaskAsJSON = (task: Task): unknown => ({\n  id: task.id,\n  account: task.account,\n  description: task.description,\n  title: task.title,\n});"
  },
  {
    "method": "PATCH",
    "rootRouterPath": "/tasks/",
    "routerPath": "/:id",
    "controllerMethod": "updateTask = applicationController(\n    async (req: Request<UpdateTaskParams>, res: Response) => {\n      const updatedTask: Task = await TaskService.updateTask({\n        accountId: req.accountId,\n        taskId: req.params.id,\n        description: req.body.description,\n        title: req.body.title,\n      });\n      const taskJSON = serializeTaskAsJSON(updatedTask);\n\n      res.status(HttpStatusCodes.OK).send(taskJSON);\n    },\n  );",
    "responseObjectTypeDefinition": "export class Task {\n  id: string;\n  account: string;\n  description: string;\n  title: string;\n}",
    "serializerMethod": "export const serializeTaskAsJSON = (task: Task): unknown => ({\n  id: task.id,\n  account: task.account,\n  description: task.description,\n  title: task.title,\n});"
  },
  {
    "method": "DELETE",
    "rootRouterPath": "/tasks/",
    "routerPath": "/:id",
    "controllerMethod": "deleteTask = applicationController(\n    async (req: Request<DeleteTaskParams>, res: Response) => {\n      await TaskService.deleteTask({\n        accountId: req.accountId,\n        taskId: req.params.id,\n      });\n\n      res.status(HttpStatusCodes.NO_CONTENT).send();\n    },\n  );",
    "responseObjectTypeDefinition": null,
    "serializerMethod": null
  }
]