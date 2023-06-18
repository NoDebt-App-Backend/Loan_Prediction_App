import dotenv from "dotenv";
import { config } from "../config/index.js";
import Admin from "../model/admin.model.js";
import { s3 } from "../utils/s3.js";
import { updateAdminValidator } from "../validators/admin.validator.js";
import { mongoIdValidator } from "../validators/mongoId.validator.js";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BadUserRequestError } from "../error/error.js";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export default class ImageController {
  static async uploadImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const updateValidatorResponse = updateAdminValidator.validate(req.body);
    const updateAdminError = updateValidatorResponse.error;
    if (error) throw updateAdminError;

    const params = {
      Bucket: config.bucket_name,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    const admin = await Admin.findByIdAndUpdate(
      id,
      {
        profileImage: req.file.buffer,
        imageName: req.file.originalname,
      },
      { new: true }
    );

    await admin.save();

    if (!admin.profileImage)
      throw new BadUserRequestError("Failed to update profile image");

    const { _id, profileImage, imageName } = admin;

    res.status(200).json({
      status: "Success",
      message: "Profile Uploaded Successfully",
      data: {
        adminId: _id,
        imageName: imageName,
        // profileImage: profileImage,
      },
    });
  }

  static async downloadImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const admin = await Admin.findById(id);

    const { imageName } = admin;

    const getObjectParams = {
      Bucket: config.bucket_name,
      Key: imageName,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 518400 });

    await s3.send(command);

    const adminProfileURL = await Admin.findByIdAndUpdate(
      id,
      { imageUrl: url },
      { new: true }
    );

    await adminProfileURL.save();

    res.status(200).json({
      status: "Success",
      message: "Profile Image Downloaded Successfully",
      data: {
        imageName: imageName,
        imageUrl: url,
      },
    });
  }

  static async deleteImage(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const admin = await Admin.findById(id);

    const { imageName } = admin;

    const deleteObjectParams = {
      Bucket: config.bucket_name,
      Key: imageName,
    };

    const command = new DeleteObjectCommand(deleteObjectParams);

    await s3.send(command);

    const result = await cloudinary.v2.uploader.upload(
      "https://res.cloudinary.com/dondeickl/image/upload/v1686778622/dummy_image.png",
      { public_id: "dummy_image" }
    );

    const imageDefaultUrl = result.url;

    const adminImage = Admin.findByIdAndUpdate(id, {
      imageUrl: imageDefaultUrl,
    });
    // admin.imageUrl = imageDefaultUrl;
    await adminImage.save();

    res.status(200).json({
      status: "Success",
      message: "Profile Image has been deleted successfully",
    });
  }
}
