import pg from "pg"
import dotenv from "dotenv"

dotenv.config()
const { Pool } = pg

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const connection = new Pool(databaseConfig)

export { connection }
export * as authModel from "./authModel.js"
export * as doctorModel from "./doctorModel.js"
export * as patientModel from "./patientModel.js"
export * as queries from "../repositories/index.js"
export * as schemas from "../schemas/index.js"
