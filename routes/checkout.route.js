import express from 'express'
import jwt from 'jsonwebtoken'
import { ChekOutController } from '../controller/checkout.controller.js'
import { verifyToken } from '../utils/VerifyToken.js'

const router = express.Router()

router.post('/' ,verifyToken ,  ChekOutController)

export default router 