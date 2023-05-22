import User from '../model/user.model.js';
import Validator from '../validators/user.validator.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { error } = Validator.signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(401).json({ error: 'Email already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: 'User successfully created',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

const Login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const { error } = Validator.loginSchema.validate(req.body);
    if (error) {
      return res.status(401).json({
        error: error.details[0].message,
      });
    }

    const user = await User.findOne().or([{ username: identifier }, { email: identifier }]);
    if (!user) {
      return res.status(401).json({
        error: 'Username/email/password is not correct',
      });
    }

    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (!PasswordMatch) {
      return res.status(401).json({
        error: 'Password is not correct',
      });
    }
    const payload = user._id
    const token = await jwt.sign({ payload }, process.env.JWT_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const protectedRoute = async (req, res) => {
  // Route logic for authenticated users only
  res.json({ message: 'Protected route accessed successfully' });
};

export default {
  signup,
  Login,
  protectedRoute,
  getAllUsers
};
