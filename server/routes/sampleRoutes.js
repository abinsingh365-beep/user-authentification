import testServer from "../controllers/samplecontroller.js"
import express from "express"
const router= express.Router()
router.get("/test",testServer)
export default router
