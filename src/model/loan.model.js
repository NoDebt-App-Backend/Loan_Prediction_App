import { Schema, model, Types } from "mongoose";

const LoanSchema = new Schema({
  organisation: {
    type: Types.ObjectId,
    ref: "AdminCompanyMap",
    // required: false,
  },
  organisationId: String,
  organisationName: String,
  eligibility: {
    type: Boolean,
    default: false,
    required: true,
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
    enum: ["part-time", "full-time", "contract", "self-employed", "unemployed"],
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
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function (value) {
        // Validate that the date is in the past
        return value < new Date();
      },
      message: "Date of birth must be in the past.",
    },
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
      "bussiness-loan",
      "student-loan",
      "agricultural-loan",
      "housing-loan",
      "others",
    ],
  },
  repaymentType: {
    type: String,
    default: "principal-and-interest",
    required: true,
  },
  purposeOfLoan: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length >= 100;
      },
      message: "Field must have a minimum of 100 characters.",
    },
    required: true,
  },
  collateralType: {
    type: String,
    enum: [
      "real-estate",
      "bussiness-equipment",
      "inventory",
      "invoices",
      "cash",
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
        return value.length >= 100;
      },
      message: "Field must have a minimum of 100 characters.",
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
  financialAdvise: {
    type: String,
  },
  adminInCharge: {
    type: String,
    // required: true,
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
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value) {
          // Validate that the date is in the past
          return value < new Date();
        },
        message: "Date of birth must be in the past.",
      },
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
    },
    employment: {
      type: String,
      required: true,
    },
    incomePerMonth: {
      type: Number,
      required: true,
    },
    otherSourcesOfIncome: {
      type: String,
    },
  },
});

const Loan = model("Loan", LoanSchema);

export { Loan };
