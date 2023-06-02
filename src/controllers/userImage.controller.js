import dotenv from "dotenv";
import crypto from "crypto";
import { config } from "../config/index.js";
import User from "../model/user.model.js";
import { s3 } from "../utils/s3.js";
import { updateUserValidator } from "../validators/user.validator.js";
import { mongoIdValidator } from "../validators/mongoId.validator.js";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { BadUserRequestError } from "../error/error.js";

dotenv.config();

// const randomImageName = (bytes = 32) =>
//   crypto.randomBytes(bytes).toString("hex");

export default class ImageController {
  static async uploadImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const updateValidatorResponse = updateUserValidator.validate(req.body);
    const updateUserError = updateValidatorResponse.error;
    if (error) throw updateUserError;

    // const imageName = randomImageName();
    const params = {
      Bucket: config.bucket_name,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read",
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    console.log(command);
    await s3.send(command);

    const user = await User.findById(id);

    if (req.file) {
      user.profileImage = req.file.buffer;
    }

    await user.save();

    if (!user.profileImage)
      throw new BadUserRequestError("Failed to update profile image");

    const { _id, profileImage } = user;

    res.status(200).json({
      status: "Success",
      message: "https://nodebt-photosbucket.s3.amazonaws.com/IMG-20201121-WA0000.jpg",
      data: {
        user_id: _id,
        imageName: req.file.originalname,
        profileImage: profileImage,
      },
    });
  }

  static async downloadImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const user = await User.findById(id);

    // if (req.file) {
    //   user.profileImage = req.body.imageName;
    // }
    const filename = req.body.filename;
    const key = `s3://${config.bucket_name}/${filename}`

    const params = {
      Bucket: config.bucket_name,
      Key: key,
    };

    const command = new GetObjectCommand(params);

    await s3.send(command);

    // user.profileImage = undefined;
    // await user.save();

    // await user.deleteOne(deleteImage);

    res.status(200).json({
      status: "Success",
      // message: "Profile Image has been deleted successfully"
    });
  }

  static async deleteImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const user = await User.findById(id);
    
    if (req.file) {
      user.profileImage = req.file.buffer;
    }
    
    const params = {
      Bucket: config.bucket_name,
      Key: req.file.originalname,
    };
    
    const command = new DeleteObjectCommand(params);
    
    await s3.send(command);

    user.profileImage = undefined;

    await user.save();

    // await user.deleteOne(deleteImage);

    res.status(200).json({
      status: "Success",
      message: "Profile Image has been deleted successfully",
    });
  }
}
