# API Documentation

## Accounts

### Create Account
- **Description**: Creates a new account using either username and password or phone number.
- **Endpoint**: `/api/accounts`
- **HTTP Method**: `POST`

#### Request Body Parameters
- **By Username and Password**
  - `firstName` (string, required): The first name of the account holder.
  - `lastName` (string, required): The last name of the account holder.
  - `username` (string, required): The username for the account.
  - `password` (string, required): The password for the account.

- **By Phone Number**
  - `phoneNumber` (object, required):
    - `countryCode` (string, required): The country code of the phone number.
    - `phoneNumber` (string, required): The phone number.

#### Response
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "id": "string",
  "phoneNumber": {
    "countryCode": "string",
    "phoneNumber": "string"
  },
  "firstName": "string",
  "lastName": "string",
  "username": "string"
}
```
---

### Update Account
- **Description**: Updates account details or resets the account password.
- **Endpoint**: `/api/accounts/:accountId`
- **HTTP Method**: `PATCH`

#### Request Body Parameters
- **Update Account Details**
  - `firstName` (string, optional): The new first name of the account holder.
  - `lastName` (string, optional): The new last name of the account holder.

- **Reset Password**
  - `newPassword` (string, required): The new password for the account.
  - `token` (string, required): The token for password reset.

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "id": "string",
  "phoneNumber": {
    "countryCode": "string",
    "phoneNumber": "string"
  },
  "firstName": "string",
  "lastName": "string",
  "username": "string"
}
```
---

### Delete Account
- **Description**: Deletes an account by its ID.
- **Endpoint**: `/api/accounts/:accountId`
- **HTTP Method**: `DELETE`

#### Response
- **Status Code**: `204 No Content`
- **Response Body**: None
---
  
### Get Account by ID
- **Description**: Retrieves account details by account ID.
- **Endpoint**: `/api/accounts/:accountId`
- **HTTP Method**: `GET`

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "id": "string",
  "phoneNumber": {
    "countryCode": "string",
    "phoneNumber": "string"
  },
  "firstName": "string",
  "lastName": "string",
  "username": "string"
}
```
---

## Access Tokens

### Create Access Token
- **Description**: Generates an access token using either username and password or phone number with OTP.
- **Endpoint**: `/api/access-tokens`
- **HTTP Method**: `POST`

#### Request Body Parameters
- **By Username and Password**
  - `username` (string, required): The username for authentication.
  - `password` (string, required): The password for authentication.

- **By Phone Number and OTP**
  - `phoneNumber` (object, required):
    - `countryCode` (string, required): The country code of the phone number.
    - `phoneNumber` (string, required): The phone number.
  - `otpCode` (string, required): The OTP code sent to the phone number.

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "token": "string",
  "accountId": "string",
  "expiresAt": "Date"
}
```
---

## Password Reset Tokens

### Create Password Reset Token
- **Description**: Creates a password reset token for a user.
- **Endpoint**: `/api/password-reset-tokens`
- **HTTP Method**: `POST`

#### Request Body Parameters
- `username` (string, required): The username for which to create the reset token.

#### Response
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "id": "string",
  "account": "string",
  "expiresAt": "Date",
  "isExpired": false,
  "token": "string",
  "isUsed": false
}
```
---

## Tasks

### Create Task
- **Description**: Creates a new task for the authenticated account.
- **Endpoint**: `/api/tasks`
- **HTTP Method**: `POST`

#### Request Body Parameters
- `title` (string, required): The title of the task.
- `description` (string, required): The description of the task.

#### Response
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "id": "string",
  "account": "string",
  "description": "string",
  "title": "string"
}
```
---

### Get Tasks
- **Description**: Retrieves all tasks for the authenticated account with pagination.
- **Endpoint**: `/api/tasks`
- **HTTP Method**: `GET`

#### Query Parameters
- `page` (integer, optional): The page number for pagination.
- `size` (integer, optional): The number of tasks per page.

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
[
  {
    "id": "string",
    "account": "string",
    "description": "string",
    "title": "string"
  }
]
```
---

### Get Task
- **Description**: Retrieves a specific task by its ID for the authenticated account.
- **Endpoint**: `/api/tasks/:id`
- **HTTP Method**: `GET`

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "id": "string",
  "account": "string",
  "description": "string",
  "title": "string"
}
```
---

### Update Task
- **Description**: Updates an existing task by its ID for the authenticated account.
- **Endpoint**: `/api/tasks/:id`
- **HTTP Method**: `PATCH`

#### Request Body Parameters
- `title` (string, optional): The new title of the task.
- `description` (string, optional): The new description of the task.

#### Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "id": "string",
  "account": "string",
  "description": "string",
  "title": "string"
}
```
---

### Delete Task
- **Description**: Deletes a task by its ID for the authenticated account.
- **Endpoint**: `/api/tasks/:id`
- **HTTP Method**: `DELETE`

#### Response
- **Status Code**: `204 No Content`
- **Response Body**: None
---