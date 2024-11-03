# API Documentation

## Accounts

### Create Account
- **Endpoint:** `/api/accounts/`
- **Method:** `POST`
- **Request Body:**
  - `firstName`: string
  - `lastName`: string
  - `password`: string (required if `username` is provided)
  - `username`: string (required if `password` is provided)
  - `phoneNumber`: object (required if `username` and `password` are not provided)
    - `countryCode`: string
    - `phoneNumber`: string

- **Response:**
  - **Status Code:** 201 Created
  - **Response Body:**
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

### Update Account
- **Endpoint:** `/api/accounts/:accountId`
- **Method:** `PATCH`
- **Request Body:**
  - `firstName`: string (optional)
  - `lastName`: string (optional)
  - `newPassword`: string (required if `token` is provided)
  - `token`: string (required if `newPassword` is provided)

- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
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

### Delete Account
- **Endpoint:** `/api/accounts/:accountId`
- **Method:** `DELETE`
- **Response:**
  - **Status Code:** 204 No Content

### Get Account by ID
- **Endpoint:** `/api/accounts/:accountId`
- **Method:** `GET`
- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
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

## Access Tokens

### Create Access Token
- **Endpoint:** `/api/access-tokens/`
- **Method:** `POST`
- **Request Body:**
  - `username`: string (required if `password` is provided)
  - `password`: string (required if `username` is provided)
  - `phoneNumber`: object (required if `otpCode` is provided)
    - `countryCode`: string
    - `phoneNumber`: string
  - `otpCode`: string (required if `phoneNumber` is provided)

- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
    ```json
    {
      "token": "string",
      "accountId": "string",
      "expiresAt": "date"
    }
    ```

## Password Reset Tokens

### Create Password Reset Token
- **Endpoint:** `/api/password-reset-tokens`
- **Method:** `POST`
- **Request Body:**
  - `username`: string

- **Response:**
  - **Status Code:** 201 Created
  - **Response Body:**
    ```json
    {
      "id": "string",
      "account": "string",
      "expiresAt": "date",
      "isExpired": false,
      "token": "string",
      "isUsed": false
    }
    ```

## Tasks

### Create Task
- **Endpoint:** `/api/tasks/`
- **Method:** `POST`
- **Request Body:**
  - `description`: string
  - `title`: string

- **Response:**
  - **Status Code:** 201 Created
  - **Response Body:**
    ```json
    {
      "id": "string",
      "account": "string",
      "description": "string",
      "title": "string"
    }
    ```

### Get Tasks
- **Endpoint:** `/api/tasks/`
- **Method:** `GET`
- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
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

### Get Task
- **Endpoint:** `/api/tasks/:id`
- **Method:** `GET`
- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
    ```json
    {
      "id": "string",
      "account": "string",
      "description": "string",
      "title": "string"
    }
    ```

### Update Task
- **Endpoint:** `/api/tasks/:id`
- **Method:** `PATCH`
- **Request Body:**
  - `description`: string
  - `title`: string

- **Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
    ```json
    {
      "id": "string",
      "account": "string",
      "description": "string",
      "title": "string"
    }
    ```

### Delete Task
- **Endpoint:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Response:**
  - **Status Code:** 204 No Content