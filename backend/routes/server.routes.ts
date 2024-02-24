import express from "express";
import controller from "../controllers/server.controller";

const router = express.Router();

router.get("/check", controller.checkServer);


export default router;
