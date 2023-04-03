import { Router } from "express"
import { patientMiddleware } from "../middlewares/index.js"
import { patientController } from "../controllers/index.js"

const patientRoute = Router()

patientRoute.get(
  "/search",
  //pesquisar por nome, localidade e especialidade
  patientController.search
)

// patientRoute.get(
//   "/schedule/:idDoctor",
//   //ver datas e horarios de cada medico
//   patientMiddleware.validateDoctor,
//   patientMiddleware.checkEmail,
//   patientController.signUp
// )

// patientRoute.get(
//   "/orders/:idPatient",
//   //ver consultas pendentes, aceitas e rejeitadas
//   patientMiddleware.validateDoctor,
//   patientMiddleware.checkEmail,
//   patientController.signUp
// )

// patientRoute.get(
//   "/history/:idPatient",
//   //ver historico de consultas
//   patientMiddleware.validateDoctor,
//   patientMiddleware.checkEmail,
//   patientController.signUp
// )

// patientRoute.post(
//   "/schedule/:idDoctor/order",
//   //marcar consulta
//   patientMiddleware.validateDoctor,
//   patientMiddleware.checkEmail,
//   patientController.signUp
// )

export { patientRoute }