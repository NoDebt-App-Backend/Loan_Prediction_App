import dotenv from "dotenv";
import crypto from "crypto";
import { config } from "../config/index.js";
import User from "../model/user.model.js";
import { s3 } from "../utils/s3.js";
import { updateUserValidator } from "../validators/user.validator.js";
import { mongoIdValidator } from "../validators/mongoId.validator.js";
import { S3Client, PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
  getSignedUrl
} from "@aws-sdk/s3-request-presigner";
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
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    // console.log(command);
    await s3.send(command);

    const user = await User.findByIdAndUpdate(id, {
      profileImage: req.file.buffer,
      imageName: req.file.originalname
    }, {new: true});

    // if (req.file) {
      // user.profileImage = req.file.buffer;
      // user.imageName = req.file.originalname;
    // }

    await user.save();

    if (!user.profileImage)
      throw new BadUserRequestError("Failed to update profile image");

    const { _id, profileImage, imageName } = user;

    res.status(200).json({
      status: "Success",
      message: "Profile Uploaded Successfully",
      data: {
        user_id: _id,
        imageName: imageName,
        profileImage: profileImage,
      },
    });
  }

  static async downloadImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const user = await User.findById(id);

    const { imageName } = user;
    
    const getObjectParams = {
      Bucket: config.bucket_name,
      Key: imageName,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    await s3.send(command);

    res.status(200).json({
      status: "Success",
      message: "Profile Image Downloaded Successfully",
      data: {
        imageName: imageName,
        imageUrl: url
      }
    });
  }

  static async deleteImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const user = await User.findById(id);

    const { imageName } = user;

    const params = {
      Bucket: config.bucket_name,
      Key: imageName,
    };

    const command = new DeleteObjectCommand(params);

    await s3.send(command);

    user.profileImage = undefined;
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Profile Image has been deleted successfully",
    });
  }
}
