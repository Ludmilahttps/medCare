import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { doctorService } from "../service/index.js"
