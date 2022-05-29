import Joi from 'joi'
import bcrypt from 'bcrypt'
import { User, RefreshToken} from "../../model"
import CustomErrorHandler from '../../services/CustomErrorHandler'
import JwtServices from '../../services/JwtServices'
import { REFRESH_SECRET } from '../../config'

const register_controller = {
    async register(req, res, next) {
        const { email, password, user_name, mobile_number} = req.body

        //requested data valid or not
        const registerSchema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })
        const { error } = registerSchema.validate({ email, password})
        if (error) {
            return next(error)
        }

        try {
            const userData = await User.findOne({ email: req.body.email })
            if (userData) {
                return next(CustomErrorHandler.alreadyExist('This email is already exist'));
            }
        } catch (err) {
            return next(err)
        }

        //hashpassword
        const hashedpassword = await bcrypt.hash(password, 16)
        let user = new User({
            user_name,
            email,
            password: hashedpassword,
            mobile_number
        })

        let access_token;
        let refresh_token;
        let data;

        try {
            data = await user.save()
            // Token
            access_token = JwtServices.sign({ _id: data._id, role: data.role });
            refresh_token = JwtServices.sign({ _id: data._id, role: data.role }, '1y', REFRESH_SECRET)
            await RefreshToken.create({ token: refresh_token })

            const {user_name, status, email, mobile_number, _id, role} = await User.findOne({ email: data.email })

            res.json({ data:{access_token, refresh_token, userData : {user_name, status, email, mobile_number, id: _id, role}}, status: true, statusCode: 200, message: "User Register Succesfully" });
        } catch (err) {
            return next(err)
        }
    }

}

export default register_controller