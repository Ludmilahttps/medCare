import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { authService } from "../service/index.js"

dotenv.config()
const EXPIRE_TIME = 60 * 60 * 24 // *1 DAY
const jwtExpire = {expiresIn: EXPIRE_TIME,}

export const signUp = async (request, response) => {
  const { type } = response.locals.newUser

  if( type )
  {
    // is Doctor
    const { name, email, password, specialty, locality } = response.locals.newUser
    const passwordCrypt = bcrypt.hashSync(password, 12)
    const doctor = {
      name,
      specialty,
      locality,
    }

    try {
      await authService.insertDoctor(doctor)
      console.log(doctor)
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }

    const userId = await authService.getDoctorId(name)
    console.log(userId)
    const user = {
      type,
      typeId: userId.id,
      email,
      password: passwordCrypt,
    }
    
    try {
      await authService.insertUser(user)
      console.log(user)
      return response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
   
    } catch (error) {
      console.log(error)
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }
  else{
    const { name, cellphone, email, password } = response.locals.newUser
    const passwordCrypt = bcrypt.hashSync(password, 12)
    const patient = {
      name,
      cellphone,
    }

    try {
      await authService.insertPatient(patient)
      console.log(patient)
    } catch (error) {
      console.log(error)
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }

    const userId = await authService.getPatientId(name)
    console.log(userId)
    const user = {
      type,
      typeId: userId.id,
      email,
      password: passwordCrypt,
    }
    
    try {
      await authService.insertUser(user)
      console.log(user)
      return response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
   
    } catch (error) {
      console.log(error)
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }
}

export const signIn = async (request, response) => {
  const { email } = response.locals.user
  
  try {
    const user = await authService.getUserByEmail(email)
    const { id: userId } = user
    const data = { userId }
  
    //const token = jwt.sign(data, jwtExpire)
    const token = {data, jwtExpire}
    return response.status(StatusCodes.OK).send(token)
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}