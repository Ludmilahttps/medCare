import { Router } from "express"
import { authMiddleware } from "../middlewares/index.js"
import { authController } from "../controllers/index.js"

const authRoute = Router()

authRoute.post(
  "/signupDoctor",
  authMiddleware.validateDoctor,
  authMiddleware.checkEmail,
  authController.signUp
)

authRoute.post(
  "/signupPatient",
  authMiddleware.validatePatient,
  authMiddleware.checkEmail,
  authController.signUp
)

authRoute.post(
  "/signin",
  authMiddleware.validateSignIn,
  authMiddleware.checkPassword,
  authController.signIn
)

export { authRoute }