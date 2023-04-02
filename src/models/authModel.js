import { connection } from "./index.js"
import { queries } from "../repositories/index.js"

export const emailExists = async (email) => {
    const { rows: user } = await connection.query(queries.getEmailByEmail(), [
      email,
    ])
    if (user && user.length !== 0) return true
    return false
  }
  
  export const insertUser = async (user) => {
    const { type, typeId, email, password } = user
    await connection.query(queries.insertInUsers(), [type, typeId, email, password])
  }

  export const insertDoctor = async (user) => {
    const { name, specialty, locality } = user
    await connection.query(queries.insertDoctors(), [name, specialty, locality])
  }

  export const getDoctorId = async (name) => {
    const { rows: id } = await connection.query(queries.getDoctorId(), [ name,])
    return id[0]
  }
  
  export const getPasswordEmail = async (email) => {
    const { rows: passwordCrypt } = await connection.query(
      queries.getPasswordByEmail(),
      [email]
    )
    return passwordCrypt[0]?.password
  }
  
  export const getUserByEmail = async (email) => {
    const { rows: user } = await connection.query(queries.getUserByEmail(), [
      email,
    ])
    return user[0]
  }