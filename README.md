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

    - [Update Admin Profile](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#put-methodupdate-admin-profile-adminsid-1)

    - [Update Admin Profile Picture(Uploading Image to AWS)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#put-methodupdate-admin-profile-picture-adminsidprofile-picture)

    - [Update Admin Profile Picture(Downloading Image from AWS)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methoddownload-admin-profile-picture-adminsidprofile-picture)

    - [Deleting Admin Profile Picture)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#delete-methodremove-admin-profile-picture-adminsidprofile-picture)

    - [Change Password](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#put-methodchange-password-adminsidchange-password)

    - [Add Admin](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#post-methodadd-admin-adminscreate)

    - [Get An Admin](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-a-single-admin-adminsoneidadminid)

    - [Get All Admins in a Company](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-admins-in-a-company-adminsorganisationidorganisationid)

    - [Get A Single Company](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-a-single-company-adminscompanyorganisationidorganisationid)

  - [Loans Routes](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#loans-routes---base-url---httpsnodebtdevonrendercomapi)

    - [Create New Loan](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#post-methodcreate-new-loan-loanscreate)

    - [Get A Single Loan](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-a-single-loan-loansidloanid)

    - [Check For Eligibility](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodcheck-for-eligibility-loanseligibilityidloanid)

    - [Send Eligibility via Email](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodsend-eligibity-status-via-email-loanssend-eligibility-statusidloanid)

    - [Get All Loans](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-loans-in-a-company-loanscompany-loans)

    - [Get All Loans Paginated](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-loans-in-a-company---paginated-loanspaginated-company-loans)

    - [Get All Loans Paginated Page 2](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-loans-in-a-company-paginated---page-2-loanspaginated-company-loanspage2)

    - [Get All Successful Loans - Ascending Order](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-successful-company-loans-in-ascending-order-loanssuccess-loansascending)

    - [Get All Successful Loans - Ascending Order - Page 2](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-successful-company-loans-in-ascending-order---page-2-loanssuccess-loansascendingpage2)

    - [Get All Rejected Loans - Ascending Order](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-rejected-company-loans-in-ascending-order-loansrejected-loansascending)

    - [Get All Rejected Loans - Ascending Order - Page 2](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-rejected-company-loans-in-ascending-order-page-2-loansrejected-loansascendingpage2)

    - [Get All Successful Loans - Descending Order](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-successful-company-loans-in-descending-order-loanssuccess-loansdescending)

    - [Get All Successful Loans - Descending Order - Page 2](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-successful-company-loans-in-descending-order---page-2-loanssuccess-loansdescendingpage2)

    - [Get All Rejected Loans - Descending Order](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-rejected-company-loans-in-descending-order-loansrejected-loansdescending)

    - [Get All Rejected Loans - Descending Order - Page 2](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-all-rejected-company-loans-in-descending-order-page-2-loansrejected-loansdescendingpage2)

    - [Get Loan By Name](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#get-methodget-loan-by-name-loansgetloanfullname)

  - [Contact Us Route](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#contact-us-routes)

    - [Contact Page](https://github.com/NoDebt-App-Backend/Loan_Prediction_App#post-methodcontact-us-page-contact)

- ### [Dependencies](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#dependencies)

- ### [DevDependencies (Development Dependdencies)](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#devdependencies)

- ### [Postman Documentation](https://github.com/NoDebt-App-Backend/Loan_Prediction_App#postman-documentation-1)

- ### [Troubleshooting](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#troubleshooting-1)

- ### [Project Status](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#project-status-1)

- ### [License](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#license-1)

- ### [Credits](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#credits-1)

## Prerequisites

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 12 or above)
- MongoDB (version 4 or above)
- Git

## Installation

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the following configurations:

```bash
   DATABASE_URL=mongodb://localhost:27017/{your-database-name}
   API_KEY=your-api-key
   PORT=your-port-number
```

## Directory Structure

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

To start the Loan_Prediction_App application on your local environment, run the following command:

npm start

Visit `http://localhost:PORT` in your web browser to access the application.

## API Documentation

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

API Documentation for NoDebt App (Loan Prediction application)

**Base URL**
Main URL for main branch
https://nodebt-application.onrender.com/api

Main URL for dev branch
https://nodebtdev.onrender.com/api

**NOTE**

- Client-Server data transfer (parameters as used in this documentation) should be via the standard JSON format
- For routes that require the Authorization header, if the token is incorrect or has expired, a **_401 Unauthorized_** error response is received

### ROUTES

We have the Admins Route and the Loan Route

#### Admins Routes

#### POST Method(Register Admin with CompanyID): /admins/signup

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: firstName, lastName, email, organisationName, password, confirmPassword, passwordURL(optional - this would be passed in for admins to reroute to login when they want to verify five digit token)

- EXAMPLE: Register Admin - Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/signup' \
--data-raw '{
    "firstName": "Kayode",
    "lastName": "Joshua",
    "email": "bortizamle@gufum.com",
    "organisationName": "Josh and Sons Associates",
    "password": "Lakun134$",
    "confirmPassword":"Lakun134$",
    "passwordLink": "https://nodebt-application.onrender.com/api"
}'

Response
(json)
{
    "message": "Company account created successfully",
    "status": "Success",
    "data": {
        "company_profile": {
            "company": "Josh and Sons Associates",
            "company_id": "64896fef5f8e622fe5e50a6b"
        },
        "admin": {
            "firstName": "Kayode",
            "lastName": "Joshua",
            "email": "bortizamle@gufum.com",
            "AdminId": "64896fef5f8e622fe5e50a6a",
            "createdAt": "2023-06-14T07:44:47.698Z",
            "updatedAt": "2023-06-14T07:44:47.698Z",
            "passwordLink": "https://nodebt-application.onrender.com/api",
            "imageUrl": "https://res.cloudinary.com/dondeickl/image/upload/v1686776416/User-Icon-Grey-300x300_rv58hh.png"
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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: email, password

- EXAMPLE: Login Admin - Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/login' \
--data-raw '{
    "email": "bortizamle@gufum.com",
    "password": "Lakun134$"
}'

Response
(json)
{
    "message": "User found successfully",
    "status": "Success",
    "data": {
        "adminId": "64896fef5f8e622fe5e50a6a",
        "email": "bortizamle@gufum.com",
        "firstName": "Kayode",
        "lastName": "Joshua",
        "imageUrl": "https://res.cloudinary.com/dondeickl/image/upload/v1686776416/User-Icon-Grey-300x300_rv58hh.png",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4OTZmZWY1ZjhlNjIyZmU1ZTUwYTZhIiwiZW1haWwiOiJib3J0aXphbWxlQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjcyOTgwMCwiZXhwIjoxNjg2ODE2MjAwfQ.TLTvaEOGH6Ev3z4vHDFHCWlIipG4uXwu-z1jhRu4a-0",
        "organisationId": {
            "_id": "64896fef5f8e622fe5e50a6b",
            "organisationName": "Josh and Sons Associates"
        }
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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, name, organisationEmail, numberOfStaffs, staffID, organisationType, website, position and phoneNumber (only authToken is required)

- EXAMPLE: Update Admin Profile - Successful (This can be one or more as it is optional)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/users/647ca411ef44ef3feafdac75' \
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
curl --location --request PUT 'https://nodebt-application.onrender.com/api/users/647cbac23b2e9187b575b67d' \
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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, profileImage - _Note please that profileImage should be the name of the input in the form data_

- EXAMPLE: Update Admin Profile Profile - (Successfully uploaded to AWS)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/users/647ca411ef44ef3feafdac75/profile-picture' \
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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, profileImage - _Note please that profileImage should be the name of the input in the form data_

- EXAMPLE: Download Admin Profile Picture - (Successfully uploaded to AWS)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/users/647ca411ef44ef3feafdac75/profile-picture' \
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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, profileImage - _Note please that profileImage should be the name of the input in the form data_

- EXAMPLE: Delete Admin Profile Picture - (Successfully uploaded to AWS)

**_STATUS: 200 OK_**

```json
Request
curl --location --request PUT 'https://nodebt-application.onrender.com/api/users/647ca411ef44ef3feafdac75/profile-picture' \
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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, firstName, lastName, email, phoneNumber, role, loginURL(optional - passed in as the URL the new admin gets as a mail to login directly along with their email and password)

- EXAMPLE: Add Admin Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3ZGVlYmJjMjQwMzJhMDY1MjUwMDNkIiwiZW1haWwiOiJwZXRyb3JpZHJhQGd1ZnVtLmNvbSIsImlhdCI6MTY4NTk3NTY2NywiZXhwIjoxNjg2MDYyMDY3fQ.nzIrcWTwYBFd_RNAy1KuPLr6yZaXbZmzKuXjzNR4k6c' \
--data-raw '{
       "firstName": "Oghene",
       "lastName": "Maro",
        "email": "nifyumilme@gufum.com",
        "phoneNumber": "+2348078906780",
        "role": "Financial Advisor",
        "loginURL": "http:omega.com/login"
}'

Response
(json)
{
    "message": "Protected route accessed successfully",
    "status": "Success",
    "data": {
        "newAdmin": {
            "firstName": "Oghene",
            "lastName": "Maro",
            "phoneNumber": "+2348078906780",
            "email": "nifyumilme@gufum.com",
            "password": "$2b$10$T/gqRuYQ.peOJ6czd/GVo.Czu83dS.dyzqSKkNphI1JuM3JQHsiBW",
            "role": "Financial Advisor",
            "imageUrl": "http://res.cloudinary.com/dondeickl/image/upload/v1686778622/dummy_image.png",
            "loginURL": "http:omega.com/login",
            "_id": "648be3f83d21551684f39fe4",
            "createdAt": "2023-06-16T04:24:24.834Z",
            "updatedAt": "2023-06-16T04:24:24.834Z",
            "__v": 0
        },
        "newpassword": "jI:30dEE"
    }
}
```

The new admin gets a mail with the login password, the login url and the email address as shown in the image below
![Adding-Admin](./images/ANA.png)

#### GET Method(Get A Single Admin): /admins/one/id={adminID}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

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

#### GET Method(Get All Admins in a Company): /admins/?organisationId={organisationId}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, organisation id as a req query

- EXAMPLE: Get A Single Admin Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/?organisationId=64807952def9edf471baf836' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MDc5NTJkZWY5ZWRmNDcxYmFmODM1IiwiZW1haWwiOiJuZXJ6YXNvbHR1QGd1ZnVtLmNvbSIsImlhdCI6MTY4NjE0NjUzNywiZXhwIjoxNjg2MjMyOTM3fQ.WnnEnLE8YSDRzVgBt6bBhsXWXFDaFztgXxg0sN1-rao'

Response
(json)
{
    "message": "Admins found successfully",
    "status": "Success",
    "data": {
        "admins": [
            {
                "_id": "64808c01f73efa6b84de2364",
                "firstName": "Cameroon",
                "lastName": "Jones",
                "phoneNumber": "07087987847",
                "email": "viltasiydu@gufum.com",
                "role": "Federal Agent"
            },
            {
                "_id": "64808c6be4d2ee4981b564cf",
                "firstName": "Casey",
                "lastName": "Jay",
                "phoneNumber": "08076895678",
                "email": "jayduholme@gufum.com",
                "role": "Federal Agent"
            }
        ]
    }
}
```

#### GET Method(Get A Single Company): /admins/company?organisationId={organisationId}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, organisation id as a req query

- EXAMPLE: Get A Single Admin Successful

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/admins/company?organisationId=648090907b25206154ea6c87' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MDkwOTA3YjI1MjA2MTU0ZWE2Yzg2IiwiZW1haWwiOiJydXJ0ZWRlbG1vQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjE0NzI5MiwiZXhwIjoxNjg2MjMzNjkyfQ.n0YN_E7j6Jf0ACLSQTH5kPBRbzPyGAer47yo-106o1M'

Response
(json)
{
    "message": "organisation retrieved successfully",
    "status": "Success",
    "data": {
        "organisation": {
            "_id": "648090907b25206154ea6c87",
            "organisationName": "Render Profits",
            "__v": 0
        }
    }
}
```

#### Loans Routes

#### POST Method(Create New Loan): /loans/create

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, loanAmount, fullname, email, address, employmentType, phoneNumber, dateOfBirth, nationalIdentityNumber, incomePerMonth, loanType, repaymentType, purposeOfLoan, collateralType, collateralValue, collateralInformation, guarantor details (fullname, phoneNumber, dateOfBirth, email, address, socialSecurityNumber, relationship, employment, incomePerMonth, otherSourcesOfIncome)

- EXAMPLE: Create A New Loan Successful

**_STATUS: 201 CREATED_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MWE2MDQyNTliYjA5MGMyOTc3ODY1IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI1NTU0MywiZXhwIjoxNjg2MzQxOTQzfQ.dd7dNexT48r4CcYV8DpIcxRND2UgNJquuIChs63FOt4' \
--data-raw '{
            "guarantor": {
                "fullname": "Victor Okpomfon",
                "phoneNumber": "+34529394500",
                "email": "cultihirze@gufum.com",
                "dateOfBirth": "1997-04-08",
                "address": "Anantigha Calabar South",
                "socialSecurityNumber": "43438487579",
                "relationship": "Mother",
                "employment": "Civil Servant",
                "incomePerMonth": 88900,
                "otherSourcesOfIncome": "none"
            },
            "loanAmount":50000,
            "fullname": "Stephanie Okpo-mfon",
            "email": "cultihirze@gufum.com",
            "address": "Anantigha Calabar South",
            "employmentType": "part-time",
            "phoneNumber": "09163426103",
            "dateOfBirth": "2003-09-07T00:00:00.000Z",
            "nationalIdentityNumber": "34589790070",
            "incomePerMonth": 100000,
            "loanType": "student-loan",
            "repaymentType": "principal-and-intrest",
            "purposeOfLoan": "Securing a loan is a crucial step towards realizing my aspirations. With determination and unwavering commitment, I aim to utilize the funds to expand my business, fostering growth, creating employment opportunities, and contributing to the local economy. This financial support will enable me to invest in cutting-edge technology, enhance operational efficiency, and propel my business to new heights. By accessing this loan, I will lay the foundation for a prosperous future, ensuring long-term sustainability and success.",
            "collateralType": "real-estate",
            "collateralValue": 55000,
            "collateralInformation": "Securing a loan is a crucial step towards realizing my aspirations. With determination and unwavering commitment, I aim to utilize the funds to expand my business, fostering growth, creating employment opportunities, and contributing to the local economy. This financial support will enable me to invest in cutting-edge technology, enhance operational efficiency, and propel my business to new heights. By accessing this loan, I will lay the foundation for a prosperous future, ensuring long-term sustainability and success."
        }'

Response
(json)
{
    "status": "success",
    "data": {
        "loan": {
            "eligibility": false,
            "fullname": "Stephanie Okpo-mfon",
            "loanAmount": 50000,
            "email": "cultihirze@gufum.com",
            "address": "Anantigha Calabar South",
            "employmentType": "part-time",
            "phoneNumber": "09163426103",
            "dateOfBirth": "2003-09-07T00:00:00.000Z",
            "nationalIdentityNumber": "34589790070",
            "incomePerMonth": 100000,
            "loanType": "student-loan",
            "repaymentType": "principal-and-intrest",
            "purposeOfLoan": "Securing a loan is a crucial step towards realizing my aspirations. With determination and unwavering commitment, I aim to utilize the funds to expand my business, fostering growth, creating employment opportunities, and contributing to the local economy. This financial support will enable me to invest in cutting-edge technology, enhance operational efficiency, and propel my business to new heights. By accessing this loan, I will lay the foundation for a prosperous future, ensuring long-term sustainability and success.",
            "collateralType": "real-estate",
            "collateralValue": 55000,
            "collateralInformation": "Securing a loan is a crucial step towards realizing my aspirations. With determination and unwavering commitment, I aim to utilize the funds to expand my business, fostering growth, creating employment opportunities, and contributing to the local economy. This financial support will enable me to invest in cutting-edge technology, enhance operational efficiency, and propel my business to new heights. By accessing this loan, I will lay the foundation for a prosperous future, ensuring long-term sustainability and success.",
            "guarantor": {
                "fullname": "Victor Okpomfon",
                "phoneNumber": "+34529394500",
                "email": "cultihirze@gufum.com",
                "dateOfBirth": "1997-04-08T00:00:00.000Z",
                "address": "Anantigha Calabar South",
                "socialSecurityNumber": "43438487579",
                "relationship": "Mother",
                "employment": "Civil Servant",
                "incomePerMonth": 88900,
                "otherSourcesOfIncome": "none"
            },
            "_id": "648246967bfd5752f2a19d4a",
            "adminInCharge": "Karen Chukwu",
            "organisationId": "6481a604259bb090c2977866",
            "organisation": "6481a604259bb090c2977866",
            "organisationName": "Manymillions Tech",
            "__v": 0
        }
    }
}
```

#### GET Method(Get A Single Loan): /loans?id={loanId}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, loanid as req query

- EXAMPLE: Get A Single Loan Successfully

**_STATUS: 200 OK_**

```json
Request
curl --location --request GET 'https://nodebtdev.onrender.com/api/loans?id=6483574dd
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MWE2MDQyNTliYjA5MGMyOTc3ODY1IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI1NTU0MywiZXhwIjoxNjg2MzQxOTQzfQ.dd7dNexT48r4CcYV8DpIcxRND2UgNJquuIChs63FOt4' \
--data ''

Response
(json)
{
    "status": "success",
    "data": {
        "borrower": {
            "guarantor": {
                "fullname": "Victor Okpo-mfon",
                "phoneNumber": "+34529394500",
                "email": "victor8@email.com",
                "age": 50,
                "address": "Anantigha Calabar South",
                "socialSecurityNumber": "43438487579",
                "relationship": "Sister",
                "employmentType": "Part-Time",
                "incomePerMonth": 5000,
                "otherSourcesOfIncome": "none"
            },
            "_id": "648bcf8f0766561263bcc410",
            "eligibility": false,
            "gender": "Female",
            "maritalStatus": "Single",
            "jobRole": "Teacher",
            "jobSector": "Engineering",
            "fullname": "Badmus Okpo",
            "loanAmount": 50000,
            "email": "balmuziydi@gufum.com",
            "address": "Anantigha Calabar South",
            "employmentType": "Part-Time",
            "phoneNumber": "09090675542",
            "age": 44,
            "nationalIdentityNumber": "20087689546",
            "incomePerMonth": 1000,
            "loanType": "Student Loan",
            "repaymentType": "principal-and-intrest",
            "purposeOfLoan": "Securing a loan is a crucial step towards realizing my aspirations. With determination and unwavering commitment, I aim to utilize the funds to expand my business, fostering growth.",
            "collateralType": "Real Estate",
            "collateralValue": 5000,
            "collateralInformation": "Securing a loan is a crucial step towards realizing my aspirations. With determination and unwavering commitment, I aim to utilize the funds to expand my business, fostering growth.",
            "adminInCharge": "Karen Chukwu",
            "organisationId": "648212385c5cef8a3fba48d5",
            "organisation": "648212385c5cef8a3fba48d5",
            "organisationName": "Manymillions Tech",
            "createdAt": "2023-06-16T02:57:19.861Z",
            "updatedAt": "2023-06-16T02:57:19.861Z",
            "__v": 0
        }
    }
}
```

#### GET Method(Check for Eligibility): /loans/eligibility?id={loanId}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, loanid as req query

- EXAMPLE: Check for Eligibility Success

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/eligibility?id=6483574dd79d9330ffc5df36' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MWE2MDQyNTliYjA5MGMyOTc3ODY1IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI1NTU0MywiZXhwIjoxNjg2MzQxOTQzfQ.dd7dNexT48r4CcYV8DpIcxRND2UgNJquuIChs63FOt4' \
--data ''

Response
(json)
{
    "status": "success",
    "data": {
        "eligibility": false
    }
}
```

#### GET Method(Send Eligibity Status via Email): /loans/send-eligibility-status?id={loanId}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken, loanid as req query

- EXAMPLE: Send Eligibity Status via Email

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/loans/send-eligibility-status?id=64824b0162da99fe3060d5a3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "status": "success",
    "message": "eligibility status successfully sent to borrowers mail"
}
```

The supposed borrower gets mail with the message as shown in the example below depending on his/her eligibility status (the one shown in the example is declined)

![Loan Declined Borrower](./images/loanimg.png)

#### GET Method(Get All Loans in A Company): /loans/company-loans

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Loans in a Company

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/company-loans' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loan Applications",
    "status": "Success",
    "results": 10,
    "data": {
        "loans": [
            {
                "_id": "6482f1bf9195100a71dfd93f",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "filtameltu@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T09:32:47.047Z"
            },
            {
                "_id": "6482f10a9195100a71dfd937",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T09:29:46.624Z"
            },
            {
                "_id": "6482eba89195100a71dfd909",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T09:06:48.782Z"
            },
            {
                "_id": "6482ea0fa25399c42a5c1491",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T08:59:59.339Z"
            },
            {
                "_id": "6482d796e02db3bfc780496e",
                "eligibility": true,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:41:10.900Z"
            },
            {
                "_id": "6482d773e02db3bfc7804969",
                "eligibility": true,
                "fullname": "Clinton Ayanchukwu",
                "loanAmount": 60000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:35.309Z"
            },
            {
                "_id": "6482d760e02db3bfc7804964",
                "eligibility": true,
                "fullname": "Ifunada Kenneth",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:16.471Z"
            },
            {
                "_id": "6482d74ce02db3bfc780495f",
                "eligibility": true,
                "fullname": "Samuel Eze",
                "loanAmount": 3000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:56.971Z"
            },
            {
                "_id": "6482d737e02db3bfc780495a",
                "eligibility": true,
                "fullname": "Okoli Bolade",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:35.832Z"
            },
            {
                "_id": "6482d72be02db3bfc7804955",
                "eligibility": true,
                "fullname": "Harry Ezechukwu",
                "loanAmount": 40000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:23.473Z"
            }
        ]
    }
}
```

This has no pagination with all the loans in a page.

#### GET Method(Get All Loans in A Company - Paginated): /loans/paginated-company-loans

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Loans in a Company

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/paginated-company-loans' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loan Applications",
    "status": "Success",
    "totalPages": 3,
    "results": 10,
    "data": {
        "loans": [
            {
                "_id": "6482f1bf9195100a71dfd93f",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "filtameltu@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T09:32:47.047Z"
            },
            {
                "_id": "6482f10a9195100a71dfd937",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T09:29:46.624Z"
            },
            {
                "_id": "6482eba89195100a71dfd909",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T09:06:48.782Z"
            },
            {
                "_id": "6482ea0fa25399c42a5c1491",
                "eligibility": false,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T08:59:59.339Z"
            },
            {
                "_id": "6482d796e02db3bfc780496e",
                "eligibility": true,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:41:10.900Z"
            },
            {
                "_id": "6482d773e02db3bfc7804969",
                "eligibility": true,
                "fullname": "Clinton Ayanchukwu",
                "loanAmount": 60000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:35.309Z"
            },
            {
                "_id": "6482d760e02db3bfc7804964",
                "eligibility": true,
                "fullname": "Ifunada Kenneth",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:16.471Z"
            },
            {
                "_id": "6482d74ce02db3bfc780495f",
                "eligibility": true,
                "fullname": "Samuel Eze",
                "loanAmount": 3000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:56.971Z"
            },
            {
                "_id": "6482d737e02db3bfc780495a",
                "eligibility": true,
                "fullname": "Okoli Bolade",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:35.832Z"
            },
            {
                "_id": "6482d72be02db3bfc7804955",
                "eligibility": true,
                "fullname": "Harry Ezechukwu",
                "loanAmount": 40000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:23.473Z"
            }
        ]
    }
}
```

#### GET Method(Get All Loans in A Company-Paginated - Page 2): /loans/paginated-company-loans?page=2

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken and the page as a req query

- EXAMPLE: Get All Loans in a Company (Page 2)

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/loans/paginated-company-loans?page=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loan Applications",
    "status": "Success",
    "totalPages": 3,
    "results": 10,
    "data": {
        "loans": [
            {
                "_id": "648bd331ad2e2f5db22e4ac9",
                "eligibility": false,
                "fullname": "Chris Jane",
                "loanAmount": 50000,
                "email": "temlucalti@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-16T03:12:49.852Z"
            },
            {
                "_id": "648bcf8f0766561263bcc410",
                "eligibility": false,
                "fullname": "Badmus Okpo",
                "loanAmount": 50000,
                "email": "balmuziydi@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-16T02:57:19.861Z"
            },
            {
                "_id": "64882755b67b95983a6ae10b",
                "eligibility": false,
                "fullname": "Nonso Ebulem",
                "loanAmount": 40000,
                "email": "firtuvulte@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T08:22:45.217Z"
            },
            {
                "_id": "6488259b3d04596f24f126fc",
                "eligibility": true,
                "fullname": "Jibola Kayode",
                "loanAmount": 3000,
                "email": "nepsinomlo@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T08:15:24.094Z"
            },
            {
                "_id": "648820067cd97f4bc729dac7",
                "eligibility": false,
                "fullname": "Jibola Kayode",
                "loanAmount": 3000,
                "email": "jakkibisti@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T07:51:34.461Z"
            },
            {
                "_id": "64881f968f204ac32eed2627",
                "eligibility": false,
                "fullname": "Justine Kayode",
                "loanAmount": 3000,
                "email": "jispuhalte@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T07:49:42.278Z"
            },
            {
                "_id": "64881e1fb4f8b1eb8532056a",
                "eligibility": false,
                "fullname": "Pascal Ariyo",
                "loanAmount": 3000,
                "email": "parkezugnu@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T07:43:28.023Z"
            },
            {
                "_id": "64881ca8e81cf7b2349a1d4e",
                "eligibility": false,
                "fullname": "Tolulope Ariyo",
                "loanAmount": 3000,
                "email": "jarkuhimlu@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T07:37:12.483Z"
            },
            {
                "_id": "648817282e605ad8b41c68c3",
                "eligibility": false,
                "fullname": "Tolulope Ariyo",
                "loanAmount": 3000,
                "email": "tatrabidri@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T07:13:44.816Z"
            },
            {
                "_id": "648815d27b2a521818d41f71",
                "eligibility": false,
                "fullname": "Monachi Caro",
                "loanAmount": 3000,
                "email": "modranemle@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-13T07:08:02.206Z"
            }
        ]
    }
}
```

This has pagination with each page listing 10 per page.

#### GET Method(Get All Successful Company Loans In Ascending Order): /loans/success-loans/ascending

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Successful Company Loans In Ascending Order

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Generated",
    "status": "Success",
    "totalPages": 4,
    "results": 10,
    "totalSuccessLoansFigure": 829000,
    "data": {
        "loans": [
            {
                "_id": "6482d60fe02db3bfc7804928",
                "eligibility": true,
                "fullname": "Precious Chinedu",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:34:39.082Z"
            },
            {
                "_id": "6482d629e02db3bfc780492d",
                "eligibility": true,
                "fullname": "King Onuche",
                "loanAmount": 50000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:35:05.314Z"
            },
            {
                "_id": "6482d63fe02db3bfc7804932",
                "eligibility": true,
                "fullname": "Mercy Justice",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:35:27.331Z"
            },
            {
                "_id": "6482d64de02db3bfc7804937",
                "eligibility": true,
                "fullname": "Sandra Funanya",
                "loanAmount": 20000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:35:41.491Z"
            },
            {
                "_id": "6482d67ce02db3bfc780493c",
                "eligibility": true,
                "fullname": "Kayode Joshua",
                "loanAmount": 60000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:36:28.176Z"
            },
            {
                "_id": "6482d692e02db3bfc7804941",
                "eligibility": true,
                "fullname": "Omoniyi Femi",
                "loanAmount": 9000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:36:50.337Z"
            },
            {
                "_id": "6482d6ede02db3bfc7804946",
                "eligibility": true,
                "fullname": "Ifunaya Christopher",
                "loanAmount": 10000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:38:21.679Z"
            },
            {
                "_id": "6482d700e02db3bfc780494b",
                "eligibility": true,
                "fullname": "Godspower Miracle",
                "loanAmount": 12000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:38:40.920Z"
            },
            {
                "_id": "6482d715e02db3bfc7804950",
                "eligibility": true,
                "fullname": "Zainab Kayode",
                "loanAmount": 6000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:01.255Z"
            },
            {
                "_id": "6482d72be02db3bfc7804955",
                "eligibility": true,
                "fullname": "Harry Ezechukwu",
                "loanAmount": 40000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:23.473Z"
            }
        ]
    }
}
```

This also works with pagination with each page in rows of 10.

#### GET Method(Get All Successful Company Loans In Ascending Order - Page 2): /loans/success-loans/ascending?page=2

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Successful Company Loans In Ascending Order (Part 2)

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending?page=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    {
    "message": "Loans found successfully",
    "title": "Loans Generated",
    "status": "Success",
    "totalPages": 4,
    "results": 5,
    "totalSuccessLoansFigure": 829000,
    "data": {
        "loans": [
            {
                "_id": "6482d737e02db3bfc780495a",
                "eligibility": true,
                "fullname": "Okoli Bolade",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:35.832Z"
            },
            {
                "_id": "6482d74ce02db3bfc780495f",
                "eligibility": true,
                "fullname": "Samuel Eze",
                "loanAmount": 3000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:56.971Z"
            },
            {
                "_id": "6482d760e02db3bfc7804964",
                "eligibility": true,
                "fullname": "Ifunada Kenneth",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:16.471Z"
            },
            {
                "_id": "6482d773e02db3bfc7804969",
                "eligibility": true,
                "fullname": "Clinton Ayanchukwu",
                "loanAmount": 60000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:35.309Z"
            },
            {
                "_id": "6482d796e02db3bfc780496e",
                "eligibility": true,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:41:10.900Z"
            }
        ]
    }
}
```

#### GET Method(Get All Rejected Company Loans In Ascending Order): /loans/rejected-loans/ascending

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Rejected Company Loans In Ascending Order

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Declined",
    "status": "Success",
    "totalPages": 4,
    "results": 10,
    "totalRejectedLoansFigure": 829000,
    "data": {
        "loans": [
            {
                "_id": "6482cf391c7ba914df55965c",
                "eligibility": false,
                "fullname": "Elijah Haruna",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:05:29.815Z"
            },
            {
                "_id": "6482d0a93a7f9d872a6d1126",
                "eligibility": false,
                "fullname": "Elijah Haruna",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:11:37.406Z"
            },
            {
                "_id": "6482d0ca3a7f9d872a6d112b",
                "eligibility": false,
                "fullname": "Kehinde Bamidele",
                "loanAmount": 25000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:12:10.956Z"
            },
            {
                "_id": "6482d0e33a7f9d872a6d1130",
                "eligibility": false,
                "fullname": "James Ferrer",
                "loanAmount": 76000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:12:35.015Z"
            },
            {
                "_id": "6482d0f93a7f9d872a6d1135",
                "eligibility": false,
                "fullname": "Abayomi Haruna",
                "loanAmount": 54000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:12:57.662Z"
            },
            {
                "_id": "6482d10e3a7f9d872a6d113a",
                "eligibility": false,
                "fullname": "Love Adebisi",
                "loanAmount": 32000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:13:18.835Z"
            },
            {
                "_id": "6482d1603a7f9d872a6d113f",
                "eligibility": false,
                "fullname": "Love Adebisi",
                "loanAmount": 75000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:14:40.678Z"
            },
            {
                "_id": "6482d16d3a7f9d872a6d1144",
                "eligibility": false,
                "fullname": "Bisola Adesi",
                "loanAmount": 75000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:14:53.747Z"
            },
            {
                "_id": "6482d1823a7f9d872a6d1149",
                "eligibility": false,
                "fullname": "Chinedu Emezua",
                "loanAmount": 75000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:15:14.391Z"
            },
            {
                "_id": "6482d1923a7f9d872a6d114e",
                "eligibility": false,
                "fullname": "Izuchi Ozumba",
                "loanAmount": 65000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:15:30.516Z"
            }
        ]
    }
}
```

This also works with pagination with each page in rows of 10.

#### GET Method(Get All Rejected Company Loans In Ascending Order (Page 2)): /loans/rejected-loans/ascending?page=2

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Rejected Company Loans In Ascending Order (Page 2)

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending?page=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Declined",
    "status": "Success",
    "totalPages": 4,
    "results": 5,
    "totalRejectedLoansFigure": 829000,
    "data": {
        "loans": [
            {
                "_id": "6482d1d13a7f9d872a6d1153",
                "eligibility": false,
                "fullname": "Kay James",
                "loanAmount": 20000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:16:33.035Z"
            },
            {
                "_id": "6482d1ee3a7f9d872a6d1158",
                "eligibility": false,
                "fullname": "Emily Olaniyi",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:17:02.912Z"
            },
            {
                "_id": "6482d26c3a7f9d872a6d115d",
                "eligibility": false,
                "fullname": "Bello Yusuf",
                "loanAmount": 42000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:19:08.727Z"
            },
            {
                "_id": "6482d39e3a7f9d872a6d1162",
                "eligibility": false,
                "fullname": "Ebenezer Jasu",
                "loanAmount": 65000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:24:14.660Z"
            },
            {
                "_id": "6482d3c13a7f9d872a6d1167",
                "eligibility": false,
                "fullname": "Korede Israel",
                "loanAmount": 35000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:24:49.508Z"
            }
        ]
    }
}
```

#### GET Method(Get All Successful Company Loans In Descending Order): /loans/success-loans/descending

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Successful Company Loans In Descending Order

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Generated",
    "status": "Success",
    "totalPages": 4,
    "results": 10,
    "data": {
        "loans": [
            {
                "_id": "6482d796e02db3bfc780496e",
                "eligibility": true,
                "fullname": "David Adeleke",
                "loanAmount": 43000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:41:10.900Z"
            },
            {
                "_id": "6482d773e02db3bfc7804969",
                "eligibility": true,
                "fullname": "Clinton Ayanchukwu",
                "loanAmount": 60000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:35.309Z"
            },
            {
                "_id": "6482d760e02db3bfc7804964",
                "eligibility": true,
                "fullname": "Ifunada Kenneth",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:40:16.471Z"
            },
            {
                "_id": "6482d74ce02db3bfc780495f",
                "eligibility": true,
                "fullname": "Samuel Eze",
                "loanAmount": 3000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:56.971Z"
            },
            {
                "_id": "6482d737e02db3bfc780495a",
                "eligibility": true,
                "fullname": "Okoli Bolade",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:35.832Z"
            },
            {
                "_id": "6482d72be02db3bfc7804955",
                "eligibility": true,
                "fullname": "Harry Ezechukwu",
                "loanAmount": 40000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:23.473Z"
            },
            {
                "_id": "6482d715e02db3bfc7804950",
                "eligibility": true,
                "fullname": "Zainab Kayode",
                "loanAmount": 6000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:39:01.255Z"
            },
            {
                "_id": "6482d700e02db3bfc780494b",
                "eligibility": true,
                "fullname": "Godspower Miracle",
                "loanAmount": 12000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:38:40.920Z"
            },
            {
                "_id": "6482d6ede02db3bfc7804946",
                "eligibility": true,
                "fullname": "Ifunaya Christopher",
                "loanAmount": 10000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:38:21.679Z"
            },
            {
                "_id": "6482d692e02db3bfc7804941",
                "eligibility": true,
                "fullname": "Omoniyi Femi",
                "loanAmount": 9000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:36:50.337Z"
            }
        ]
    }
}
```

This also works with pagination with each page in rows of 10.

#### GET Method(Get All Successful Company Loans In Descending Order - Page 2): /loans/success-loans/descending?page=2

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Successful Company Loans In Descending Order (Page 2)

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending?page=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Generated",
    "status": "Success",
    "totalPages": 4,
    "results": 5,
    "data": {
        "loans": [
            {
                "_id": "6482d67ce02db3bfc780493c",
                "eligibility": true,
                "fullname": "Kayode Joshua",
                "loanAmount": 60000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:36:28.176Z"
            },
            {
                "_id": "6482d64de02db3bfc7804937",
                "eligibility": true,
                "fullname": "Sandra Funanya",
                "loanAmount": 20000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:35:41.491Z"
            },
            {
                "_id": "6482d63fe02db3bfc7804932",
                "eligibility": true,
                "fullname": "Mercy Justice",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:35:27.331Z"
            },
            {
                "_id": "6482d629e02db3bfc780492d",
                "eligibility": true,
                "fullname": "King Onuche",
                "loanAmount": 50000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:35:05.314Z"
            },
            {
                "_id": "6482d60fe02db3bfc7804928",
                "eligibility": true,
                "fullname": "Precious Chinedu",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:34:39.082Z"
            }
        ]
    }
}
```

#### GET Method(Get All Rejected Company Loans In Descending Order): /loans/rejected-loans/descending

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Rejected Company Loans In Descending Order

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Declined",
    "status": "Success",
    "totalPages": 4,
    "results": 10,
    "totalRejectedLoansFigure": 829000,
    "data": {
        "loans": [
            {
                "_id": "6482d3c13a7f9d872a6d1167",
                "eligibility": false,
                "fullname": "Korede Israel",
                "loanAmount": 35000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:24:49.508Z"
            },
            {
                "_id": "6482d39e3a7f9d872a6d1162",
                "eligibility": false,
                "fullname": "Ebenezer Jasu",
                "loanAmount": 65000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:24:14.660Z"
            },
            {
                "_id": "6482d26c3a7f9d872a6d115d",
                "eligibility": false,
                "fullname": "Bello Yusuf",
                "loanAmount": 42000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:19:08.727Z"
            },
            {
                "_id": "6482d1ee3a7f9d872a6d1158",
                "eligibility": false,
                "fullname": "Emily Olaniyi",
                "loanAmount": 30000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:17:02.912Z"
            },
            {
                "_id": "6482d1d13a7f9d872a6d1153",
                "eligibility": false,
                "fullname": "Kay James",
                "loanAmount": 20000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:16:33.035Z"
            },
            {
                "_id": "6482d1923a7f9d872a6d114e",
                "eligibility": false,
                "fullname": "Izuchi Ozumba",
                "loanAmount": 65000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:15:30.516Z"
            },
            {
                "_id": "6482d1823a7f9d872a6d1149",
                "eligibility": false,
                "fullname": "Chinedu Emezua",
                "loanAmount": 75000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:15:14.391Z"
            },
            {
                "_id": "6482d16d3a7f9d872a6d1144",
                "eligibility": false,
                "fullname": "Bisola Adesi",
                "loanAmount": 75000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:14:53.747Z"
            },
            {
                "_id": "6482d1603a7f9d872a6d113f",
                "eligibility": false,
                "fullname": "Love Adebisi",
                "loanAmount": 75000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:14:40.678Z"
            },
            {
                "_id": "6482d10e3a7f9d872a6d113a",
                "eligibility": false,
                "fullname": "Love Adebisi",
                "loanAmount": 32000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:13:18.835Z"
            }
        ]
    }
}
```

This also works with pagination with each page in rows of 10.

#### GET Method(Get All Rejected Company Loans In Descending Order (Page 2)): /loans/rejected-loans/descending?page=2

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get All Rejected Company Loans In Ascending Order (Page 2)

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/success-loans/ascending?page=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "message": "Loans found successfully",
    "title": "Loans Declined",
    "status": "Success",
    "totalPages": 4,
    "results": 5,
    "totalRejectedLoansFigure": 829000,
    "data": {
        "loans": [
            {
                "_id": "6482d0f93a7f9d872a6d1135",
                "eligibility": false,
                "fullname": "Abayomi Haruna",
                "loanAmount": 54000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:12:57.662Z"
            },
            {
                "_id": "6482d0e33a7f9d872a6d1130",
                "eligibility": false,
                "fullname": "James Ferrer",
                "loanAmount": 76000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:12:35.015Z"
            },
            {
                "_id": "6482d0ca3a7f9d872a6d112b",
                "eligibility": false,
                "fullname": "Kehinde Bamidele",
                "loanAmount": 25000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:12:10.956Z"
            },
            {
                "_id": "6482d0a93a7f9d872a6d1126",
                "eligibility": false,
                "fullname": "Elijah Haruna",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:11:37.406Z"
            },
            {
                "_id": "6482cf391c7ba914df55965c",
                "eligibility": false,
                "fullname": "Elijah Haruna",
                "loanAmount": 80000,
                "email": "cultihirze@gufum.com",
                "address": "Anantigha Calabar South",
                "adminInCharge": "Karen Chukwu",
                "createdAt": "2023-06-09T07:05:29.815Z"
            }
        ]
    }
}
```

#### GET Method(Get Loan By Name): /loans/getloan/{fullname}

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: authToken

- EXAMPLE: Get Loan By Name

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebtdev.onrender.com/api/loans/getloan/Kelvin Hart' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ4MjRhYjQ2MmRhOTlmZTMwNjBkNTk5IiwiZW1haWwiOiJtaXRyb25hcnpvQGd1ZnVtLmNvbSIsImlhdCI6MTY4NjI2MDQxNywiZXhwIjoxNjg2MzQ2ODE3fQ.Z4kRnkACtjdt2T0DjpS_WZ5PHBmpgsXSPHPn72TCX4E' \
--data ''

Response
(json)
{
    "results": 1,
    "loans": [
        {
            "_id": "64825405b06bb5a0d38a9b50",
            "eligibility": false,
            "fullname": "Kelvin Hart",
            "loanAmount": 50000,
            "email": "cultihirze@gufum.com",
            "address": "Anantigha Calabar South"
        }
    ]
}
```

#### Contact Us Route

#### POST Method(Contact Us Page): /contact

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

Parameters: fullName, email, message and loginURL

- EXAMPLE: Contact Us Page

**_STATUS: 200 OK_**

```json
Request
curl --location 'https://nodebt-application.onrender.com/api/contact' \
--data-raw '{
    "fullName": "Pelumi James",
    "email": "peydofirzi@gufum.com",
    "message": "Hello, please I would like to find out the services you are rendering on this application as I need a service to helps with monitoring and maintaining our loan clients and checking if they are eligible.",
    "loginURL": "https://omega-prediction-app.netlify.app/login"
}'

Response
(json)
{
    "message": "Email has been sent successfully to contact",
    "status": "Success",
    "data": {
        "contactId": "648ccea32839b17fcf51e6cd",
        "fullName": "Pelumi James",
        "email": "peydofirzi@gufum.com",
        "message": "Hello, please I would like to find out the services you are rendering on this application as I need a service to helps with monitoring and maintaining our loan clients and checking if they are eligible.",
        "createdAt": "2023-06-16T21:05:39.695Z"
    }
}
```

The user gets a mail notification that the message has been recieved as shown below:
![Contact Us Mail](./images/contactus.png)

## Dependencies

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

The following dependencies were used to build the application:

- **express** - This is an npm package built on node that serves as a HTTP server tool, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.

You install using

```bash
npm i express
```

- **joi** - This is a data validator for JavaScript. This was used in the application to validate the data before it gets to the database.

You install using

```bash
npm i joi
```

- **joi-objectid** - This is a A MongoDB ObjectId validator for Joi. This was used in the application to validate the object id from mongodb.

You install using

```bash
npm i joi-objectid
```

- **jsonwebtoken** - JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

This was used in the application to generate tokens to authorize users to access certain services in the application.

You install using

```bash
npm i jsonwebtoken
```

- **bcrypt** - bcrypt is a pasword-hashing function used to encrypt and decrypt passwords or other credentials.This was used in the application to encrypt and decrypt passwords of users.

You install using

```bash
npm i bcrypt
```

- **@aws-sdk/client-s3** - This is a AWS SDK for JavaScript S3 Client for Node.js used to access S3 client bucket and objects. This was used in the application to store and retrieve images.

You install using

```bash
npm i @aws-sdk/client-s3
```

- **@aws-sdk/s3-request-presigner** - This package provides a presigner based on signature V4 that will attempt to generate signed url for S3. This was used in the application to download and gain access to the objects stored in s3 buckets.

You install using

```bash
npm i @aws-sdk/s3-request-presigner
```

- **cloudinary** - The Cloudinary Node SDK allows you to quickly and easily integrate your application with Cloudinary. Effortlessly optimize, transform, upload and manage your cloud's assets. This was used in the application to create the dummy image used as a default for the users.

You install using

```bash
npm i cloudinary
```

- **axios** - This is a promise based HTTP client for the browser and node.js. This was used in the application to access and integrate the API built from the model of the data science team for predictability.

You install using

```bash
npm i axios
```

- **cors** - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable cross origin resource sharing with various options. This was used in the application to enable cross origin resource sharing.

You install using

```bash
npm i cors
```

- **mongoose** - Mongoose provides a straight-forward, schema-based solution to model your application data. This was used in the application to create schemas and models.

You install using

```bash
npm i mongoose
```

- **handlebars** - Handlebars are logicless templating languages that keep the view and the code separated like we all know they should be. This was used in the application to create templating for emails.

You install using

```bash
npm i handlebars
```

- **morgan** - Morgan is an HTTP request logger middleware for node.js. This was used in the application for logging out our responses in real time.

You install using

```bash
npm i morgan
```

- **multer** - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. This was used in our application to handle uploading images to cloudinary and AWS S3 bucket.

You install using

```bash
npm i multer
```

- **nodemailer** - Nodemailer is a module for Node.js applications to allow easy as cake email sending. This was used in our application to send emails to users.

You install using

```bash
npm i nodemailer
```

## DevDependencies

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

The following development dependencies were used to build the application:

- **dotenv** - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This was used in our application to store sensitive information and prevent them from being exposed.

You install using

```bash
npm i dotenv
```

- **nodemailer** - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. This was used in the application to prevent restarting the server on every change made.

You install using

```bash
npm i nodemailer
```

## Postman Documentation

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

- If you would rather use the postman documentation and find it easier to read and understand, here is the [PostmanDocs](https://documenter.getpostman.com/view/26756602/2s93m7X29s)

## Troubleshooting

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and MongoDB installed.
- If the application fails to start, make sure the MongoDB server is running and accessible.

## Project Status

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

This app is currently developed and maintained by the Stutern 1.4 Cohort Group 5 intertrack Backend Dev team. At this time, we do not accept external contributions or pull requests. The project is primarily for personal use or demonstration purposes.

## License

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

**[Back to Table of Contents](https://github.com/NoDebt-App-Backend/Loan_Prediction_App/tree/main#table-of-contents)**

The Loan Prediction App codebase is being developed by the following individuals:

- [Stephanie Okpomfon](https://github.com/StephanieMfon)
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Edikan Akpan](https://github.com/Edidiva)
