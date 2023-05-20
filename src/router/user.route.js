import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = new express.Router();

router.post("/create", UserController.createUser)

export { router };