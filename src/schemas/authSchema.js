import joi from "joi"

export const signupSchemaDoctor = joi.object({
    name: joi.string().required,
    specialty: joi.string().required,
    locality: joi.string().required,
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
})

export const signupSchemaPatient = joi.object({
    name: joi.string().required,
    cellphone: joi.number().required,
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
})
  
  export const signinSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
 })