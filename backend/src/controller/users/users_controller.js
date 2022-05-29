import { User } from '../../model'
import CustomErrorHandler from '../../services/CustomErrorHandler'

const users_Controller = {
    async userIdentity(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }
            res.json({data:user, status: true});
        } catch(err) {
           return next(err);
        }
    },

    async allusers (req, res, next){
        try {
            const alluser = await User.find().select('-password -updatedAt -__v');;
            if(!alluser) {
                return next(CustomErrorHandler.notFound());
            }
            res.json({data:alluser, status: true});      
        }catch (err) {
            return next(err)
        }
    },

    async updateuser (req, res, next) {
        let updatedUser
        try {
            updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    status: req.body.status
                },
                { new: true }
            );
        } catch (err) {
            return next(err);
        }
        res.status(201).json({data:updatedUser, status: true});
    }
}

export default users_Controller