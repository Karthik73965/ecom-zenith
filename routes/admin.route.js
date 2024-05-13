import express from 'express'
import { AdminLogin, AdminSignup, GetAllUsers, GetAllCheckOuts } from '../controller/admin.controller.js'
import { VerifyAdminToken } from '../utils/VerifyToken.js'

const router = express.Router()

router.post('/signup', AdminSignup)
router.post('/Login', AdminLogin)
router.get('/getusers', VerifyAdminToken, GetAllUsers)
router.get('/getchekout', VerifyAdminToken, GetAllCheckOuts)


export default router