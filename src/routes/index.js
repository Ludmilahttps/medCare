import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { patientRoute } from "./patientRoute.js"
import { doctorRoute } from "./doctorRoute.js"

const router = Router()
router.use([authRoute, patientRoute, doctorRoute])

export default router