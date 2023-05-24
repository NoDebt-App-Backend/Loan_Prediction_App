# Loan Prediction App (Backend)

Welcome to the Loan Prediction App codebase! This repository contains the source code for the Loan Prediction Application.
The server itself is implemented in node using express.
Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#api-documentation)

# Table of Contents

- ### [Prerequisites](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#prerequisites)

- ### [Installation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#installation)

- ### [Configuration](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#configuration)

- ### [Directory Structure](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#directory-structure)

- ### [Usage](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#usage)

- ### [API Documentation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#api-documentation)

  - [Users Routes](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#users-routes)

- ### [Troubleshooting](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#troubleshooting)

### [Project Status](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#project-status)

### [License](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#license)

### [Credits](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/dev#credits)

## Prerequisites

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 12 or above)
- MongoDB (version 4 or above)
- Git

## Installation

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/NoDebt-App-Backend/Loan_Prediction_App.git
   ```
2. Change into the project directory:

```bash
   cd Loan_Prediction_App
```

3. Install the required dependencies:

```bash
   npm install
```

## Configuration

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the following configurations:

```bash
   DATABASE_URL=mongodb://localhost:27017/{your-database-name}
   API_KEY=your-api-key
   PORT=your-port-number
```

## Directory Structure

The codebase follows the following directory structure:

```bash
NoDebt-App-Backend/Loan_Prediction_App/
└───src
    ├───config
    ├───controllers
    ├───error
    ├───middlewares
    ├───model
    ├───router
    ├───utils
    └───validators
```

- `src/`:Contains the main source code files
- `tests/`:Contains the unit tests for the codebase.

## Usage

To start the Loan_Prediction_App application on your local environment, run the following command:

npm start

Visit `http://localhost:PORT` in your web browser to access the application.

## API Documentation

API Documentation for NoDebt App (Loan Prediction application)

**Base URL**
http://localhost:4000/api

**NOTE**

- Client-Server data transfer (parameters as used in this documentation) should be via the standard JSON format
- For routes that require the Authorization header, if the token is incorrect or has expired, a **_401 Unauthorized_** error response is received

### ROUTES

We have the Users Route and the Loan Route

#### Users Routes

**POST Method(Create User): /users/create**

Parameters: name, email, password, confirmPassword

- EXAMPLE: Create User - Successful with all the details included

**_STATUS: 200 OK_**

```json
Request
curl --location 'localhost:4000/api/users/create' \
--data-raw '{
    "name": "Buchi Nwabueze",
    "email": "buchieze@gmail.com",
    "password": "Yayi123#@",
    "confirmPassword": "Yayi123#@"
}'

Response
(json)
{
    "message": "Account created successfully",
    "status": "Success",
    "data": {
        "user": {
            "name": "Buchi Nwabueze",
            "email": "buchieze@gmail.com",
            "password": "$2b$10$RFAsR4rjHNcx.fSRn8CeIeLJUYDV2kuqyNAdKeN3/yD9hk0RQIQqe",
            "confirmPassword": "$2b$10$RFAsR4rjHNcx.fSRn8CeIeLJUYDV2kuqyNAdKeN3/yD9hk0RQIQqe",
            "_id": "646e5ccda8413b6801ef0fca",
            "createdAt": "2023-05-24T18:51:57.017Z",
            "updatedAt": "2023-05-24T18:51:57.017Z",
            "__v": 0
        }
    }
}
```

- EXAMPLE: Create User - Successful without the password

**_STATUS: 200 OK_**

```json
Request
curl --location 'localhost:4000/api/users/create' \
--data-raw '{
    "name": "Emmanuella Pius",
    "email": "emmanuella@gmail.com",
    "password": "Chem324#@",
    "confirmPassword": "Chem324#@"
}'

Response
(json)
{
    "message": "Account created successfully",
    "status": "Success",
    "data": {
        "name": "Emmanuella Pius",
        "email": "emmanuella@gmail.com",
        "id": "646e5ef538d114f8b047d379",
        "createdAt": "2023-05-24T19:01:09.582Z",
        "updatedAt": "2023-05-24T19:01:09.582Z"
    }
}
```

- EXAMPLE: Create User - when one or all of the parameters are missing

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'localhost:4000/api/users/create' \
--data '{}'

Response
(json)
{
    "message": "\"name\" is required",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Create User - when Password and confirm password do not match

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'localhost:4000/api/users/create' \
--data-raw '{
    "name": "Buchi Nwabueze",
    "email": "buchieze@gmail.com",
    "password": "Yayi123#@",
    "confirmPassword": "Jay123"
}'

Response
(json)
{
    "message": "\"Passwords\" do not match. Please check again",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Create User - Invalid Email Format

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'localhost:4000/api/users/create' \
--data-raw '{
    "name": "Buchi Nwabueze",
    "email": "buchieze",
    "password": "Yayi123#@",
    "confirmPassword": "Yayi123#@"
}'

Response
(json)
{
    "message": "Not a valid email address. Please input a valid email address.",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Create User - Invalid Password Format

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'localhost:4000/api/users/create' \
--data-raw '{
    "name": "Cameroon Johnson",
    "email": "camjohnson@gmail.com",
    "password": "Chem32",
    "confirmPassword": "Chem32"
}'

Response
(json)
{
    "message": "Password must be more than 8 characters long with at least one number, one alphanumeric character, one uppercase letter",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

**POST Method(Login User): /users/login**

Parameters: email, password

- EXAMPLE: Login User - Successful with all the details included

**_STATUS: 200 OK_**

```json
Request
curl --location 'localhost:4000/api/users/login' \
--data-raw '{
    "email": "kennedybrown@gmail.com",
    "password": "Amazing456@"
}'

Response
(json)
{
    "message": "User found successfully",
    "status": "Success",
    "data": {
        "user": {
            "_id": "646dbda3f1c20c4075f7fd53",
            "name": "Kennedy Brown",
            "email": "kennedybrown@gmail.com",
            "password": "$2b$10$QWL1dxXNOh7kuGkkP7iC3OiRCNrsdvNScZ3U3pFCSRrm6ekpKSNi.",
            "confirmPassword": "$2b$10$QWL1dxXNOh7kuGkkP7iC3OiRCNrsdvNScZ3U3pFCSRrm6ekpKSNi.",
            "createdAt": "2023-05-24T07:32:51.745Z",
            "updatedAt": "2023-05-24T07:32:51.745Z",
            "__v": 0
        },
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkYmRhM2YxYzIwYzQwNzVmN2ZkNTMiLCJlbWFpbCI6Imtlbm5lZHlicm93bkBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTUwMDEsImV4cCI6MTY4NTA0MTQwMX0.f2iltAVTb3c5413uwb19662vkrJEPpKEYtpkBUyPS-k"
    }
}
```

- EXAMPLE: Login User - Successful without the password

**_STATUS: 200 OK_**

```json
Request
curl --location 'localhost:4000/api/users/login' \
--data-raw '{
    "email": "kennedybrown@gmail.com",
    "password": "Amazing456@"
}'

Response
(json)
{
    "message": "User found successfully",
    "status": "Success",
    "data": {
        "email": "kennedybrown@gmail.com",
        "id": "646dbda3f1c20c4075f7fd53",
        "createdAt": "2023-05-24T07:32:51.745Z",
        "updatedAt": "2023-05-24T07:32:51.745Z",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkYmRhM2YxYzIwYzQwNzVmN2ZkNTMiLCJlbWFpbCI6Imtlbm5lZHlicm93bkBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTU2MDIsImV4cCI6MTY4NTA0MjAwMn0.C6_FU4YwpFSK7bwb-0aY1BjHBbyyZ-fSCYSPklTbvU8"
    }
}
```

- EXAMPLE: Login User - when one or all of the parameters are missing
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'localhost:4000/api/users/login' \
--data '{ }'

Response
(json)
{
    "message": "\"email\" is required",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Login User - with wrong Email Address
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'localhost:4000/api/users/login' \
--data-raw '{
    "email": "kennybrown@gmail.com",
    "password": "Amazing456@"
}'

Response
(json)
{
    "message": "Please provide a valid email address and password before you can login.",
    "status": "Failed"
}
```

- EXAMPLE: Login User - with wrong Password
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'localhost:4000/api/users/login' \
--data-raw '{
    "email": "kennedybrown@gmail.com",
    "password": "Amazing45"
}'

Response
(json)
{
    "message": "Please provide a valid email address and password before you can login.",
    "status": "Failed"
}
```

- EXAMPLE: Login User - with wrong Password
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'localhost:4000/api/users/login' \
--data-raw '{
    "email": "kennedybrown@gmail.com",
    "password": "Amazing45"
}'

Response
(json)
{
    "message": "Please provide a valid email address and password before you can login.",
    "status": "Failed"
}
```

**GET Method(Login Authentication/Authorization): /users/protected**

Parameters: email, password, authToken

- EXAMPLE: Login Auth - Successful

**_STATUS: 200 OK_**

```json
Request
curl --location --request GET 'localhost:4000/api/users/protected' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkYmRhM2YxYzIwYzQwNzVmN2ZkNTMiLCJlbWFpbCI6Imtlbm5lZHlicm93bkBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTUwMDEsImV4cCI6MTY4NTA0MTQwMX0.f2iltAVTb3c5413uwb19662vkrJEPpKEYtpkBUyPS-k' \
--data-raw '{
    "email": "kennybrown@gmail.com",
    "password": "Amazing456@"
}'

Response
(json)
{
    "message": "Protected route accessed successfully",
    "status": "Success"
}
```

- EXAMPLE: Login Auth - Invalid Token

**_STATUS: 401 UNAUTHORIZED_**

```json
Request
curl --location --request GET 'localhost:4000/api/users/protected' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkYmRhM2YxYzIwYzQwNzVmN2ZkNTMiLCJlbWFpbCI6Imtlbm5lZHlicm93bkBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTUwMDEsImV4cCI6MTY4NTA0MTQwMX0.f2iltAVTb3c5413uwb19662vkrJ' \
--data-raw '{
    "email": "kennybrown@gmail.com",
    "password": "Amazing456@"
}'

Response
(json)
{
    "message": "Access denied, invalid token.",
    "status": "Failed"
}
```

## Troubleshooting

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and MongoDB installed.
- If the application fails to start, make sure the MongoDB server is running and accessible.

## Project Status

This app is currently developed and maintained by the Stutern 1.4 Cohort Group 5 intertrack Backend Dev team. At this time, we do not accept external contributions or pull requests. The project is primarily for personal use or demonstration purposes.

## License

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

The Loan Prediction App codebase is being developed by the following individuals:

- [Stephanie Okpomfon](https://github.com/StephanieMfon)
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Edikan Akpan](https://github.com/Edidiva)
