import { Schema, model, Types } from "mongoose";

const LoanSchema = new Schema(
  {
    organisation: {
      type: Types.ObjectId,
      ref: "AdminCompanyMap",
    },
    organisationId: String,
    organisationName: String,
    eligibility: {
      type: Boolean,
      default: false,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Widowed", "Divorced", "Separated"],
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    jobSector: {
      type: String,
      required: true,
      enum: [
        "Sales and Customer Service",
        "Education and Training",
        "Information Technology",
        "Operations and Logistics",
        "Accounting and Finance",
        "Human Resources",
        "Engineering",
        "Marketing and Advertising",
        "Legal",
        "Healthcare",
        "Project Management",
        "Others",
      ],
    },
    fullname: {
      type: String,
      required: true,
      match: [
        /^[\w\s\S]{3,}$/,
        "Fullname must have at least two words in the fullname path",
      ],
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address to the address path",
      ],
    },
    address: {
      type: String,
      required: true,
    },
    employmentType: {
      type: String,
      required: true,
      enum: [
        "Contract",
        "Self-Employed",
        "Full-Time",
        "Part-Time",
        "Unemployed",
      ],
    },
    phoneNumber: {
      type: String,
      match: [
        /^(\+\d{1,3}\s?)?(\d{3,})$/,
        "Please enter a valid phone number to the path",
      ],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    nationalIdentityNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Customize the validation logic for NIN
          const regex = /^\d{11}$/;
          return regex.test(value);
        },
        message: "Invalid NIN format.",
      },
    },
    incomePerMonth: {
      type: Number,
      required: true,
    },
    loanType: {
      type: String,
      enum: [
        "Bussiness Loan",
        "Student Loan",
        "Agricultural Loan",
        "Housing Loan",
        "Others",
      ],
    },
    repaymentType: {
      type: String,
      default: "Principal and Interest",
      required: true,
    },
    purposeOfLoan: {
      type: String,
      validate: {
        validator: function (value) {
          return value.length >= 50;
        },
        message: "Field must have a minimum of 50 characters.",
      },
      required: true,
    },
    collateralType: {
      type: String,
      enum: [
        "Real Estate",
        "Bussiness Equipment",
        "Inventory",
        "Invoices",
        "Cash",
      ],
      required: true,
    },
    collateralValue: {
      type: Number,
      required: true,
    },
    collateralInformation: {
      type: String,
      validate: {
        validator: function (value) {
          return value.length >= 50;
        },
        message: "Field must have a minimum of 50 characters.",
      },
      required: true,
    },
    creditScore: {
      type: Number,
      default: undefined,
    },
    reasonForEligibilityStatusResult: {
      type: String,
    },
    financialAdvice: {
      type: String,
    },
    adminInCharge: {
      type: String,
    },
    guarantor: {
      fullname: {
        type: String,
        required: true,
        match: [
          /^[\w\s\S]{3,}$/,
          "Fullname must have at least two words in the fullname path",
        ],
        required: true,
      },
      phoneNumber: {
        type: String,
        match: [
          /^(\+\d{1,3}\s?)?(\d{3,})$/,
          "Please enter a valid phone number to the path",
        ],
        required: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [
          /^\S+@\S+\.\S+$/,
          "Please enter a valid email address to the address path",
        ],
      },
      age: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      socialSecurityNumber: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Customize the validation logic for NIN
            const regex = /^\d{11}$/;
            return regex.test(value);
          },
          message: "Invalid NIN format.",
        },
      },
      relationship: {
        type: String,
        required: true,
        enum: ["Sister", "Brother", "Parent", "Friend", "Spouse"],
      },
      employmentType: {
        type: String,
        required: true,
        enum: [
          "Contract",
          "Self-Employed",
          "Full-Time",
          "Part-Time",
          "Unemployed",
        ],
      },
      incomePerMonth: {
        type: Number,
        required: true,
      },
      otherSourcesOfIncome: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Loan = model("Loan", LoanSchema);

export { Loan };
