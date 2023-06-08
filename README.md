# Loan Prediction App (No Debt App - Backend)

Welcome to the Loan Prediction App codebase!

This is a Software as a Service Provider that helps potential customers predict if an applicant is eligible to take a loan. Please refer to the documentation for further information.

This repository contains the source code for the Loan Prediction Application. The server itself is implemented in node using express. Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#api-documentation-1)

# Table of Contents

- ### [Prerequisites](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#prerequisites-1)

- ### [Installation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#installation-1)

- ### [Configuration](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#configuration-1)

- ### [Directory Structure](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#directory-structure-1)

- ### [Usage](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#usage-1)

- ### [API Documentation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#api-documentation-1)

  - [Admin Routes](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#admins-routes)

    - [Register Admin with Company ID](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#post-methodregister-admin-with-companyid-adminssignup)

    - [Login Admin](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#post-methodlogin-admin-adminslogin)

    - [Login Authentication](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodlogin-authenticationauthorization-adminsprotected)

    - [Reset Password](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodreset-password-password-reset)

    - [Reset Password(Token)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#post-methodreset-password-five-digit-token-password-reset)

    - [Reset Password(Password Change)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#put-methodreset-password-password-change-password-reset)

    - [Update Admin Profile Picture(Uploading Image to AWS)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#put-methodupdate-admin-profile-picture-adminsidadminidprofile-picture)

    - [Update Admin Profile Picture(Downloading Image from AWS)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methoddownload-image-from-aws-adminsidadminidprofile-picture)

    - [Deleting Admin Profile Picture)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#delete-methoddelete-image-from-aws-and-the-database-adminsidadminidprofile-picture)

    - [Update Admin Profile](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#put-methodupdate-admin-profile-adminsid-1)

    

- ### [Troubleshooting](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#troubleshooting-1)

- ### [Project Status](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#project-status-1)

- ### [License](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#license-1)

- ### [Credits](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#credits-1)

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
https://nodebt-application.onrender.com/api

**NOTE**

- Client-Server data transfer (parameters as used in this documentation) should be via the standard JSON format
- For routes that require the Authorization header, if the token is incorrect or has expired, a **_401 Unauthorized_** error response is received

### ROUTES

We have the Users Route and the Loan Route

#### Admins Routes

#### POST Method(Register Admin with CompanyID): /admins/signup

Parameters: firstName, lastName, email, organisationName, password, confirmPassword

- EXAMPLE: Register Admin - Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Patricia",
    "lastName": "Lange",
    "email": "petroridra@gufum.com",
    "organisationName": "Patricia Tech",
    "password": "Patto567%",
    "confirmPassword":"Patto567%"
}'

Response
(json)
{
    "message": "Company account created successfully",
    "status": "Success",
    "data": {
        "company_profile": {
            "company": "Patricia Tech",
            "company_id": "647deebbc24032a06525003e"
        },
        "admin": {
            "firstName": "Patricia",
            "lastName": "Lange",
            "email": "petroridra@gufum.com",
            "AdminId": "647deebbc24032a06525003d",
            "createdAt": "2023-06-05T14:18:35.258Z",
            "updatedAt": "2023-06-05T14:18:35.258Z"
        }
    }
}
```

- EXAMPLE: Register Admin - Invalid Password Format

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Patricia",
    "lastName": "Lange",
    "email": "petroridra@gufum.com",
    "organisationName": "Patricia Tech",
    "password": "Patto7%",
    "confirmPassword":"Patto567%"
}'

Response
(json)
{
    "message": "Password must be more than 8 characters long with at least one number, one special character, one uppercase letter and one lowercase letter",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Register Admin - Invalid Email Format

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Patricia",
    "lastName": "Lange",
    "email": "petroridra@g",
    "organisationName": "Patricia Tech",
    "password": "Patto7%",
    "confirmPassword":"Patto567%"
}'

Response
(json)
{
    "message": "Not a valid email address. Please input a valid email address.",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Register Admin - when Password and confirm password do not match

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Patricia",
    "lastName": "Lange",
    "email": "petroridra@gufum.com",
    "organisationName": "Patricia Tech",
    "password": "Patto567%",
    "confirmPassword":"Patto57%"
}'

Response
(json)
{
    "message": "\"Passwords\" do not match. Please check again",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Register Admin - When a field or all the fields are empty

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Patricia",
    "email": "petroridra@gufum.com",
    "organisationName": "Patricia Tech",
    "password": "Patto567%",
    "confirmPassword":"Patto57%"
}'

Response
(json)
{
    "message": "\"lastName\" is required",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Register Admin - When the email already exists

**_STATUS: 400 BAD REQUEST_**

```json
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Patricia",
    "lastName": "Lange",
    "email": "petroridra@gufum.com",
    "organisationName": "Patricia Tech",
    "password": "Patto567%",
    "confirmPassword":"Patto567%"
}'

Response
(json)
{
    "message": "An account with this email already exists",
    "status": "Failed"
}
```

#### POST Method(Login Admin): /admins/login

Parameters: email, password

- EXAMPLE: Login Admin - Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/login' \
--data-raw '{
    "email": "petroridra@gufum.com",
    "password": "Patto567%"
}'

Response
(json)
{
    "message": "User found successfully",
    "status": "Success",
    "data": {
        "adminId": "647deebbc24032a06525003d",
        "email": "petroridra@gufum.com",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGVlYmJjMjQwMzJhMDY1MjUwMDNkIiwiZW1haWwiOiJwZXRyb3JpZHJhQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk3NTM5MCwiZXhwIjoxNjg2MDYxNzkwfQ.CceELmq__mqtO6emva-2lZXSNJ3Jpp1ewVEI0_RGNDU"
    }
}
```

- EXAMPLE: Login Admin - when one or all of the parameters are missing
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/login' \
--data-raw '{
    "email": "petroridra@gufum.com"
}'

Response
(json)
{
    "message": "\"password\" is required",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Login Admin - with wrong Email Address
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/login' \
--data-raw '{
    "email": "kennybrown@gmail.com",
    "password": "Patto567%"
}'

Response
(json)
{
    "message": "Please provide a valid email address and password before you can login.",
    "status": "Failed"
}
```

- EXAMPLE: Login Admin - with wrong Password
  **_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/login' \
--data-raw '{
    "email": "petroridra@gufum.com",
    "password": "Pao567%"
}'

Response
(json)
{
    "message": "Please provide a valid email address and password before you can login.",
    "status": "Failed"
}
```

#### GET Method(Login Authentication/Authorization): /admins/protected

Parameters: email, password, authToken

- EXAMPLE: Login Auth - Successful

**_STATUS: 200 OK_**

```json
Request
curl --location --request GET 'https://nodebt-application.onrender.com/api/admins/protected' \
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
curl --location --request GET 'https://nodebt-application.onrender.com/api/admins/protected' \
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

#### GET Method(Reset Password): /password-reset

Parameters: email

- EXAMPLE: Reset Password Link sent

**_STATUS: 200 OK_**

```json
Request Query Params
curl --location 'https://nodebt-application.onrender.com/api/password-reset?email=lidreforko%40gufum.com' \
--data ''

Response
(html)
password reset link sent to your email account
```

When the link has been sent successfully, the admin gets a mail with a link and a five digit token as seen in the screenshot below.

![Password Request Sent Successfully](./images/PRS.png)

- EXAMPLE: Reset Password Link (When the admin requests two times in a row)

**_STATUS: 400 BAD REQUEST_**

```json
Request Query Params
curl --location 'https://nodebt-application.onrender.com/api/password-reset?email=lidreforko%40gufum.com' \
--data ''

Response
(json)
{
    "message": "A password reset request has already been made, Try again in 1 hour",
    "status": "Failed"
}
```

- EXAMPLE: Reset Password Link (Invalid Email Format)

**_STATUS: 400 BAD REQUEST_**

```json
Request Query Params
curl --location 'https://nodebt-application.onrender.com/api/password-reset?email=murdugopsi' \
--data ''

Response
(json)
{
    "message": "Invalid email format",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Reset Password Link (Email Field Empty)

**_STATUS: 400 BAD REQUEST_**

```json
Request Query Params
curl --location 'https://nodebt-application.onrender.com/api/password-reset?email=' \
--data ''

Response
(json)
{
    "message": "\"email\" is not allowed to be empty",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Reset Password Link (Email/User Does not Exist)

**_STATUS: 400 BAD REQUEST_**

```json
Request Query Params
curl --location 'https://nodebt-application.onrender.com/api/password-reset?email=peryhigh%40gmail.com' \
--data ''

Response
(json)
{
    "message": "Admin with given email does not exist",
    "status": "Failed"
}
```

#### POST Method(Reset Password-Five Digit Token): /password-reset

Parameters: fiveDigitToken

- EXAMPLE: Reset Password(Token Validated)

The link is a redirect for the user to input the five digit token sent to their mail.

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/password-reset/64721eba27f5e945bf191237' \
--data '{
    "fiveDigitToken": 65721
}'

Response
(html)
Token Validated
```

- EXAMPLE: Reset Password(Invalid/Expired Token)

The link is a redirect for the user to input the five digit token sent to their mail.

**_STATUS: 401 UNAUTHORIZED_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/password-reset/64721eba27f5e945bf191237' \
--data '{
    "fiveDigitToken": 65123
}'

Response
(json)
{
    "message": "Invalid token link or expired",
    "status": "Failed"
}
```

#### PUT Method(Reset Password-Password Change): /password-reset

Parameters: secret_key, password, confirmPassword

- EXAMPLE: Reset Password(Password Changed Successfully)

The secret_key is passed in, and the user puts in the new password.

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/password-reset/64721eba27f5e945bf191237' \
--data-raw '{
    "secret_key": 12345,
    "password": "Helen23@",
    "confirmPassword": "Helen23@"
}''

Response
(json)
{
    "status": "Success",
    "message": "Your password has been changed"
}
```

The user gets a mail with a message as seen below.

![Password Request Sent Successfully](./images/PCS.png)

- EXAMPLE: Reset Password(Invalid Password Format)

The secret_key is passed in, and the user puts in the new password.

**_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/password-reset/64721eba27f5e945bf191237' \
--data '{
    "secret_key": 12345,
    "password": "H23"
}'

Response
(json)
{
    "message": "Password must be more than 8 characters long with at least one number, one special character, one uppercase letter",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Reset Password(Passwords Mismatch-when password and confirmPassword are different)

The secret_key is passed in, and the user puts in the new password.

**_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/password-reset/64721eba27f5e945bf191237' \
--data-raw '{
    "secret_key": 12345,
    "password": "Helen23@",
    "confirmPassword": "H"
}'

Response
(json)
{
    "message": "\"Passwords\" do not match. Please check again",
    "status": "Failed",
    "errorType": "ValidationError"
}
```

- EXAMPLE: Reset Password(Invalid Secret Key)

The secret_key is passed in, and the user puts in the new password.

**_STATUS: 401 UNAUTHORIZED_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/password-reset/64721eba27f5e945bf191237' \
--data-raw '{
    "secret_key": 12347,
    "password": "Helen23@",
    "confirmPassword": "Helen23@"
}'

Response
(json)
{
    "message": "Invalid Password change request",
    "status": "Failed"
}
```

#### PUT Method(Update Admin Profile): /admins/:id

Parameters: id(as a req parameter), optional parameters (firstName, lastName, organisationEmail, numberOfStaffs, staffID, organisationType, website, position and phoneNumber)

- EXAMPLE: Update Admin Profile (success for all the fields)

**_STATUS: 200 OK_**

```json
curl --location --request PUT 'https://nodebt-application.onrender.com/api/admins/647deebbc24032a06525003d' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGEyZGVhOTZkNzVlYmI0MmI0ZDkyIiwiZW1haWwiOiJub3JkZWppc3R1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk1NTUzNywiZXhwIjoxNjg2MDQxOTM3fQ.--7d4q3S8DCp0puv7Om7Vf8kZ8SGWmid36Z-TzPH3KY' \
--data-raw '{
    "firstName": "Justine",
    "lastName": "Kennedy",
    "organisationEmail": "kennedyjay@keren.com",
    "numberOfStaffs": 34,
    "staffID": "HP003",
    "organisationType": "Loan App Organisation",
    "website": "https://www.health-plus.ng",
    "position": "Head of Finance",
    "phoneNumber": "09076890980"
}'

Response
(json)
{
    "message": "Profile updated successfully",
    "status": "Success",
    "data": {
        "admin": {
            "_id": "647deebbc24032a06525003d",
            "firstName": "Justine",
            "lastName": "Kennedy",
            "email": "petroridra@gufum.com",
            "password": "$2b$10$JtyQoJwswLFNe9i.TxKLnOQJAmQXe2pmy0UhHoLFdUt1NzE09mWl6",
            "confirmPassword": "$2b$10$JtyQoJwswLFNe9i.TxKLnOQJAmQXe2pmy0UhHoLFdUt1NzE09mWl6",
            "createdAt": "2023-06-05T14:18:35.258Z",
            "updatedAt": "2023-06-05T14:47:49.115Z",
            "__v": 0,
            "numberOfStaffs": 34,
            "organisationEmail": "kennedyjay@keren.com",
            "organisationType": "Loan App Organisation",
            "phoneNumber": "09076890980",
            "position": "Head of Finance",
            "staffID": "HP003",
            "website": "https://www.health-plus.ng"
        }
    }
}
```


#### PUT Method(Update Admin Profile): /admins/:id

Parameters: authToken, name, organisationEmail, numberOfStaffs, staffID, organisationType, website, position and phoneNumber (only authToken is required)

- EXAMPLE: Update Admin Profile - Successful (This can be one or more as it is optional)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'localhost:4000/api/users/647ca411ef44ef3feafdac75' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3Y2E0MTFlZjQ0ZWYzZmVhZmRhYzc1IiwiZW1haWwiOiJrYXRyaW1hbHRpQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTg5MTc0OSwiZXhwIjoxNjg1OTc4MTQ5fQ.0PBh0-dOi9MeoWH72zMqzqe_f27Y9FIXnbcGKD18' \
--data-raw '{
    "name": "Justine Obayemi",
    "organisationEmail": "justineobayemi@healthplus.com",
    "numberOfStaffs": 34,
    "staffID": "HP003",
    "organisationType": "Health Organisation",
    "website": "https://www.health-plus.ng",
    "position": "Head of Finance",
    "phoneNumber": "09076890980"
}'

Response
(json)
{
    "message": "Profile updated successfully",
    "status": "Success",
    "data": {
        "user": {
            "_id": "647ca411ef44ef3feafdac75",
            "name": "Justine Obayemi",
            "email": "katrimalti@gufum.com",
            "password": "$2b$10$7TQt7KbCi0YMAEWhYSamze5fgOkm8h/.GH2t3ZtAr4yPV2hU/TiYi",
            "confirmPassword": "$2b$10$RvTXiLeABSf0L7cOAIN6muNUdbfdCJJwKaqRxi0zWES.n3lLr5hWK",
            "createdAt": "2023-06-04T14:47:45.854Z",
            "updatedAt": "2023-06-04T16:20:26.776Z",
            "__v": 0,
            "numberOfStaffs": 34,
            "organisationEmail": "justineobayemi@healthplus.com",
            "organisationType": "Health Organisation",
            "phoneNumber": "09076890980",
            "position": "Head of Finance",
            "staffID": "HP003",
            "website": "https://www.health-plus.ng"
        }
    }
}
```

- EXAMPLE: Update Admin Profile - Successful (for a few fields)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'localhost:4000/api/users/647cbac23b2e9187b575b67d' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3Y2E0MTFlZjQ0ZWYzZmVhZmRhYzc1IiwiZW1haWwiOiJrYXRyaW1hbHRpQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTg5MTc0OSwiZXhwIjoxNjg1OTc4MTQ5fQ.0PBh0-dOi9MeoWH72zMqzqe_f27Y9FPR8IXnbcGKD18' \
--data-raw '{
    "organisationEmail": "justineobayemi@healthplus.com",
    "numberOfStaffs": 34,
    "staffID": "HP003"
}'

Response
(json)
{
    "message": "Profile updated successfully",
    "status": "Success",
    "data": {
        "user": {
            "_id": "647cbac23b2e9187b575b67d",
            "name": "Katrina Jacobs",
            "email": "boltehakku@gufum.com",
            "password": "$2b$10$51eq.gUGi..uvejrfSE7FOfzQZYtXOPqhiX9OcLi5.HOPWju3kJum",
            "confirmPassword": "$2b$10$51eq.gUGi..uvejrfSE7FOfzQZYtXOPqhiX9OcLi5.HOPWju3kJum",
            "createdAt": "2023-06-04T16:24:34.459Z",
            "updatedAt": "2023-06-04T16:25:08.619Z",
            "__v": 0,
            "numberOfStaffs": 34,
            "organisationEmail": "justineobayemi@healthplus.com",
            "staffID": "HP003"
        }
    }
}
```

#### PUT Method(Update Admin Profile Picture): /admins/:id/profile-picture

Parameters: authToken, profileImage - _Note please that profileImage should be the name of the input in the form data_

- EXAMPLE: Update Admin Profile Profile - (Successfully uploaded to AWS)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'localhost:4000/api/users/647ca411ef44ef3feafdac75/profile-picture' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3Y2E0MTFlZjQ0ZWYzZmVhZmRhYzc1IiwiZW1haWwiOiJrYXRyaW1hbHRpQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTg5MTc0OSwiZXhwIjoxNjg1OTc4MTQ5fQ.0PBh0-dOi9MeoWH72zMqzqe_f27Y9FPR8IXnbcGKD18' \
--form 'profileImage=@"/C:/Users/USER/Desktop/PICS/Screenshot 2021-07-07 082822.jpg"'

Response
(json)
{
    "status": "Success",
    "message": "Profile Uploaded Successfully",
    "data": {
        "user_id": "647ca411ef44ef3feafdac75",
        "imageName": "Screenshot 2021-07-07 082822.jpg",
        "profileImage": "\ufffd\ufffd\ufffd\ufffd\u0000\u0010JFIF\u0000\u0001\u0001\u0001\u0...very long buffer"
    }
}
```

#### GET Method(Download Admin Profile Picture): /admins/:id/profile-picture

Parameters: authToken, profileImage - _Note please that profileImage should be the name of the input in the form data_

- EXAMPLE: Download Admin Profile Picture - (Successfully uploaded to AWS)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'localhost:4000/api/users/647ca411ef44ef3feafdac75/profile-picture' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3Y2E0MTFlZjQ0ZWYzZmVhZmRhYzc1IiwiZW1haWwiOiJrYXRyaW1hbHRpQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTg5MTc0OSwiZXhwIjoxNjg1OTc4MTQ5fQ.0PBh0-dOi9MeoWH72zMqzqe_f27Y9FPR8IXnbcGKD18' \
--form 'profileImage=@"/C:/Users/USER/Desktop/PICS/Screenshot 2021-07-07 082822.jpg"'

Response
(json)
{
    "status": "Success",
    "message": "Profile Image Downloaded Successfully",
    "data": {
        "imageName": "Screenshot 2021-07-07 082822.jpg",
        "imageUrl": "https://nodebt-photosbucket.s3.us-east-1.amazonaws.com/Screenshot%202021-07-07%20082822.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2PPOPHMTOWCRXHUC%2F20230604%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230604T163224Z&X-Amz-Expires=3600&X-Amz-Signature=6d6b20221b23967dec24c73d7db8caa7969be8624605f1a41d6c745441d6b152&X-Amz-SignedHeaders=host&x-id=GetObject"
    }
}
```

_Please note that the url is the actual image itself. This is what is being used as the profile picture_

#### DELETE Method(Remove Admin Profile Picture): /admins/:id/profile-picture

Parameters: authToken, profileImage - _Note please that profileImage should be the name of the input in the form data_

- EXAMPLE: Delete Admin Profile Picture - (Successfully uploaded to AWS)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'localhost:4000/api/users/647ca411ef44ef3feafdac75/profile-picture' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3Y2E0MTFlZjQ0ZWYzZmVhZmRhYzc1IiwiZW1haWwiOiJrYXRyaW1hbHRpQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTg5MTc0OSwiZXhwIjoxNjg1OTc4MTQ5fQ.0PBh0-dOi9MeoWH72zMqzqe_f27Y9FPR8IXnbcGKD18' \
--form 'profileImage=@"/C:/Users/USER/Desktop/PICS/Screenshot 2021-07-07 082822.jpg"'

Response
(json)
{
    "status": "Success",
    "message": "Profile Image has been deleted successfully"
}
```

#### PUT Method(Change Password): /admins/:id/change-password

Parameters: authToken, oldPassword, newPassword, confirmNewPassword

- EXAMPLE: Change Password Successful

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/admins/647deebbc24032a06525003d/change-password' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGEyZGVhOTZkNzVlYmI0MmI0ZDkyIiwiZW1haWwiOiJub3JkZWppc3R1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk1NTUzNywiZXhwIjoxNjg2MDQxOTM3fQ.--7d4q3S8DCp0puv7Om7Vf8kZ8SGWmid36Z-TzPH3KY' \
--data-raw '{
    "oldPassword": "Patto567%",
    "newPassword": "Carry123@",
    "confirmNewPassword": "Carry123@"
}'

Response
(json)
{
    "status": "Success",
    "message": "Password changed successfully"
}
```

- EXAMPLE: Change Password (Incorrect old password)

**_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/admins/647deebbc24032a06525003d/change-password' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGEyZGVhOTZkNzVlYmI0MmI0ZDkyIiwiZW1haWwiOiJub3JkZWppc3R1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk1NTUzNywiZXhwIjoxNjg2MDQxOTM3fQ.--7d4q3S8DCp0puv7Om7Vf8kZ8SGWmid36Z-TzPH3KY' \
--data-raw '{
    "oldPassword": "Kiki123$",
    "newPassword": "Carry123@",
    "confirmNewPassword": "Car123@"
}'

Response
(json)
{
    "message": "Password incorrect. Please provide a correct password",
    "status": "Failed"
}
```

- EXAMPLE: Change Password (Password and confirm Password mismatch)

**_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/admins/647deebbc24032a06525003d/change-password' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGEyZGVhOTZkNzVlYmI0MmI0ZDkyIiwiZW1haWwiOiJub3JkZWppc3R1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk1NTUzNywiZXhwIjoxNjg2MDQxOTM3fQ.--7d4q3S8DCp0puv7Om7Vf8kZ8SGWmid36Z-TzPH3KY' \
--data-raw '{
    "oldPassword": "Kiki123$",
    "newPassword": "Carry123@",
    "confirmNewPassword": "Car123@"
}'

Response
(json)
{
    "message": "New Password and confirm New Password do not match.",
    "status": "Failed"
}
```

#### POST Method(Add Admin): /admins/create

Parameters: authToken, firstName, lastName, email, phoneNumber, role

- EXAMPLE: Add Admin Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGVlYmJjMjQwMzJhMDY1MjUwMDNkIiwiZW1haWwiOiJwZXRyb3JpZHJhQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk3NTY2NywiZXhwIjoxNjg2MDYyMDY3fQ.nzIrcWTwYBFd_RNAy1KuPLr6yZaXbZmzKuXjzNR4k6c' \
--data-raw '{
       "firstName": "Francis",
       "lastName": "Makinde",
        "email": "yorkukiltu@gufum.com",
        "phoneNumber": "09087654356",
        "role": "Financial Analyst"
}'

Response
(json)
{
    "message": "Protected route accessed successfully",
    "status": "Success",
    "data": {
        "newAdmin": {
            "firstName": "Francis",
            "lastName": "Makinde",
            "phoneNumber": "09087654356",
            "email": "yorkukiltu@gufum.com",
            "password": "$2b$10$ARc0JaZWJHtBkYVkCjkpwuhQUc/ZM.v7.X7Susc2icXqImNFsnsOu",
            "role": "Financial Analyst",
            "_id": "647e3e7de101695c5a8f86e9",
            "createdAt": "2023-06-05T19:58:53.101Z",
            "updatedAt": "2023-06-05T19:58:53.101Z",
            "__v": 0
        },
        "newpassword": "uN<6_,Jg"
    }
}
```

The new admin gets a mail with the login password, the login url and the email address as shown in the image below
![Adding-Admin](./images/ANA.png)

#### GET Method(Get A Single Admin): /admins/one/id={adminID}

Parameters: authToken, id as a req query

- EXAMPLE: Get A Single Admin Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/one?id=647e3e7de101695c5a8f86e9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZTNlN2RlMTAxNjk1YzVhOGY4NmU5IiwiZW1haWwiOiJ5b3JrdWtpbHR1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk5NTQ3NCwiZXhwIjoxNjg2MDgxODc0fQ.x-2YLsZHbfimhBrXx1WXV0Q6teBG1GRW6sttJbiCsQo'

Response
(json)
{
    "message": "Admin found successfully",
    "status": "Success",
    "data": {
        "admin": {
            "_id": "647e3e7de101695c5a8f86e9",
            "firstName": "Francis",
            "lastName": "Makinde",
            "phoneNumber": "09087654356",
            "email": "yorkukiltu@gufum.com",
            "password": "$2b$10$ARc0JaZWJHtBkYVkCjkpwuhQUc/ZM.v7.X7Susc2icXqImNFsnsOu",
            "role": "Financial Analyst",
            "createdAt": "2023-06-05T19:58:53.101Z",
            "updatedAt": "2023-06-05T19:58:53.101Z",
            "__v": 0
        }
    }
}
```

- EXAMPLE: Get A Single Admin - Invalid ID

**_STATUS: 400 BAD REQUEST_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/one?id=647e3e7de101695c5a8f86e9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZTNlN2RlMTAxNjk1YzVhOGY4NmU5IiwiZW1haWwiOiJ5b3JrdWtpbHR1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk5NTQ3NCwiZXhwIjoxNjg2MDgxODc0fQ.x-2YLsZHbfimhBrXx1WXV0Q6teBG1GRW6sttJbiCsQo'

Response
(json)
{
    "message": "Please pass in a valid mongoId",
    "status": "Failed"
}
```

- EXAMPLE: Get A Single Admin - Invalid Auth Token

**_STATUS: 401 UNAUTHORIZED_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/one?id=647e3e7de101695c5a8f86e9' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZTNlN2RlMTAxNjk1YzVhOGY4NmU5IiwiZW1haWwiOiJ5b3JrdWtpbHR1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk5NTQ3NCwiZXhwIjoxNjg2MDgxODc0fQ.x-2YLsZHbfimhBrXx1WXV0Q6teBG1GRW6sttJbiCsQo'

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
