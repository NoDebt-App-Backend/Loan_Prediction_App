import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  fullName: String,
});

userSchema.pre('save', async function (next) {
  this.fullName = this.firstName + ' ' + this.lastName;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
