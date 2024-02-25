import express from "express";
import controller from "../controllers/server.controller.ts";

const router = express.Router();

router.get("/check", controller.checkServer);


export default router;
