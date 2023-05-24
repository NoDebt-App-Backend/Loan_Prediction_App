# Loan Prediction App (Backend)

Welcome to the Loan Prediction App codebase! This repository contains the source code for the Loan Prediction Application.
The server itself is implemented in node using express.
Follow the instructions below to set up the codebase on your local machine.

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
    └───validators
```

- `src/`:Contains the main source code files
- `tests/`:Contains the unit tests for the codebase.

## Usage

To start the Loan_Prediction_App application on your local environment, run the following command:

npm start

Visit `http://localhost:PORT` in your web browser to access the application.

## API Documentation



## Troubleshooting

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and MongoDB installed.
- If the application fails to start, make sure the MongoDB server is running and accesible.

## Project Status

This app is currently developed and maintained by the Stutern 1.4 Cohort Group 5 intertrack Backend Dev team. At this time, we do not accept external contributions or pull requests. The project is primarily for personal use or demonstration purposes.

## License

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

The Loan Prediction App codebase is being developed by the following individuals:

- [Stephanie Okpomfon](https://github.com/StephanieMfon)
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Edikan Akpan](https://github.com/Edidiva)
