import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtServices from "../services/JwtServices";

const auth = async (req, res, next) => {
    let authHeader = req.headers.token
    if(!authHeader || authHeader === "null") {
        return next(CustomErrorHandler.unAuthorized())
    }
    try {
        const {_id, role} = await JwtServices.verify(authHeader)
        const user = {
            _id,
            role
        }
        req.user = user
        next()

    } catch (err) {
        return next(err)
    }

}

export default auth;