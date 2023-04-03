import { Router } from "express"
import { doctorMiddleware } from "../middlewares/index.js"
import { doctorController } from "../controllers/index.js"

const doctorRoute = Router()

doctorRoute.get(
  "/orders/:idDoctor",
  //ver consultas pendentes
  doctorMiddleware.validateDoctor,
  doctorMiddleware.checkEmail,
  doctorController.signUp
)

doctorRoute.post(
  "/schedule/:idDoctor/order",
  //aceitar ou rejeitar consulta
  doctorMiddleware.validateDoctor,
  doctorMiddleware.checkEmail,
  doctorController.signUp
)

doctorRoute.get(
  "/history/:idDoctor",
  //ver historico de consultas
  doctorMiddleware.validateDoctor,
  doctorMiddleware.checkEmail,
  doctorController.signUp
)

export { doctorRoute }