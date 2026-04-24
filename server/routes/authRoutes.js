import {signUp,signin} from "../controllers/authController.js";
import express from "express"

const router = express.Router();


router.post("/sign-up", signUp);
router.post("/sign-in",signin)


export default router;