import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { patientService } from "../service/index.js"

dotenv.config()
const EXPIRE_TIME = 60 * 60 * 24 // *1 DAY
const jwtExpire = {expiresIn: EXPIRE_TIME,}

export const search = async (request, response) => {
  const { search } = request.params
  try {
    const { rows: doctors } = await patientService.getDoctorbyWord(search)
    console.log(doctors)
    if (doctors.length === 0) return response.sendStatus(404)
    
    const allDoctors = orders.map((element) => {
      const order = {
        id: element.id,
        name: element.name,
        specialty: element.specialty,
        locality: element.locality,
      }
      return order
    })
    response.status(200).send(allDoctors)
  } catch (error) {
    console.log(error)
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }

}