import { connection } from "./index.js"
import { authQuerie } from "../repositories/index.js"

export const emailExists = async (email) => {
    const { rows: user } = await connection.query(authQuerie.getEmailByEmail(), [
      email,
    ])
    if (user && user.length !== 0) return true
    return false
  }
  
  export const insertUser = async (user) => {
    const { type, typeId, email, password } = user
    await connection.query(authQuerie.insertInUsers(), [type, typeId, email, password])
  }

  export const insertDoctor = async (user) => {
    const { name, specialty, locality } = user
    await connection.query(authQuerie.insertDoctors(), [name, specialty, locality])
  }

  export const getDoctorId = async (name) => {
    const { rows: id } = await connection.query(authQuerie.getDoctorId(), [ name, ])
    return id[0]
  }

  export const insertPatient = async (user) => {
    const { name, cellphone } = user
    await connection.query(authQuerie.insertPatient(), [ name, cellphone])
  }

  export const getPatientId = async (name) => {
    const { rows: id } = await connection.query(authQuerie.getPatientId(), [ name, ])
    return id[0]
  }
  
  export const getPasswordEmail = async (email) => {
    const { rows: passwordCrypt } = await connection.query(
      authQuerie.getPasswordByEmail(), [email])
    return passwordCrypt[0]?.password
  }
  
  export const getUserByEmail = async (email) => {
    const { rows: user } = await connection.query(authQuerie.getUserByEmail(), [
      email,
    ])
    return user[0]
  }