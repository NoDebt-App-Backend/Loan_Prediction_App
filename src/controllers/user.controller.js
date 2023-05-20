import User from "../model/user.model.js";

export default class UserController {
  static async createUser(req, res) {
    if (error) throw error;
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists.length > 0) throw new Error(`User ${req.body.email} already exists`);
    const nameExists = await User.findOne({ name: req.body.name });
    if (nameExists.length > 0) throw new Error(`User ${req.body.name} already exists`);
    const user = {
      Name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const newUser = await User.create(user);
    res.status(200).json({
      message: "Account created successfully",
      status: "Success",
      data: {
        user: newUser,
      },
    });
  }
}
