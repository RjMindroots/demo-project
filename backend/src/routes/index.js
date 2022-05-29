import express from "express";
import { register_controller, refresh_controller, login_controller, users_controller} from "../controller";
import {auth, admin} from '../middleware'

const router = express.Router()

//Authentication
router.post('/register', register_controller.register)
router.post('/login', login_controller.login)
router.post('/refresh', refresh_controller.refresh)
router.post('/logout', login_controller.logout)

router.post('/user', auth, users_controller.userIdentity)
router.post('/allusers', [auth], users_controller.allusers)

router.post('/admin/updateuser/:id', [auth, admin], users_controller.updateuser)

export default router