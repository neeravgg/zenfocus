import { Response } from "express";
import asyncHandler from "express-async-handler";
import { UserAuthInfoRequest } from "../types/index";


// @desc    Get server status
// @route   GET /api/server/check
// @access  Public
const checkServer = asyncHandler(
  async (req: UserAuthInfoRequest, res: Response) => {
    res.status(200).json({ message: "connected" });
  }
);

export default {
  checkServer,
};
