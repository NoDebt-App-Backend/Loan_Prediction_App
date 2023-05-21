import User from "../model/user.model.js";


export default class UserController {
  static async createUser(req, res) {
    const user = new User(req.body);

    await user.save();
    
    res.status(200).json({
      message: "Account created successfully",
      status: "Success",
      data: {
        user: user
      }
    });
  }
};

// export { createUser };