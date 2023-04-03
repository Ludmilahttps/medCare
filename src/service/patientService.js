import { connection } from "../config/database.js"
import { patientQuerie } from "../repositories/index.js"

export const getDoctorbyWord = async (search) => {
    try {
        return await connection.query(patientQuerie.getDoctorbyWord(), [search,])
    } catch (error) {
        console.log(error)
    }
}