import bcrypt from "bcrypt"
import { authService } from "../service/index.js"
import { authSchema } from "../schemas/index.js"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export const checkEmail = async (request, response, next) => {
  const { email } = response.locals.newUser
  const emailExists = await authService.emailExists(email)

  if (emailExists) return response.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT)

  next()
  return true
}

export const validateDoctor = (request, response, next) => {
  const Body = authSchema.signupSchemaDoctor.validate(request.body)

  const newUser = {
    name: Body.value.name,
    type: 1,
    specialty: Body.value.specialty,
    locality: Body.value.locality,
    email: Body.value.email,
    password: Body.value.password,
  }
  
  response.locals.newUser = newUser
  next()
  return true
}

export const validatePatient = (request, response, next) => {
  const Body = authSchema.signupSchemaPatient.validate(request.body)
  
  const newUser = {
    name: Body.value.name,
    type: 0,
    cellphone: Body.value.cellphone,
    email: Body.value.email,
    password: Body.value.password,
  }

  response.locals.newUser = newUser
  next()
  return true
}

export const validateSignIn = (request, response, next) => {
  const Body = authSchema.signinSchema.validate(request.body)

  if (Body.error) return response.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
  
  const user = {
    email: Body.value.email,
    password: Body.value.password,
  }

  response.locals.user = user
  next()
  return true
}

export const checkPassword = async (request, response, next) => {
  const { email, password } = response.locals.user
  const passwordCrypt = await authService.getPasswordEmail(email)
  
  if (!passwordCrypt) return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)

  const IsValid = bcrypt.compareSync(password, passwordCrypt)
  if (!IsValid) return response.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  next()
  return true
}

export async function checkToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  try {
    

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }
  }
  catch (error) {
    console.error(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }

  res.locals.token = token
  next()

}