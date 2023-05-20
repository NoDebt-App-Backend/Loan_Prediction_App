import { Schema, model } from "mongoose";

// Setting up our user model
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        // lowercase: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        lowercase: true,
        validators: {
            match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please enter a valid email address"]
        }
    },
    password: {
        type: String,
        required: true,
        validators: {
            match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please enter a valid email address"]
        }
    }
},
{timestamps: true});

export default model('User', UserSchema);