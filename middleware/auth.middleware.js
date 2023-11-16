const jwt = require('jsonwebtoken');
const secretKey = 'coding';
exports.verifyToken = async(req,res,next) => {
    try {
        const {body} = req
        if(req.headers.authorization && req.headers.authorization.split(' ').length === 2) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,secretKey)

            console.log('decoded',decoded)
            req.body._id = decoded._id
            next()
        }

    }catch(error) {
        console.error('Token verification failed');
        console.error(error);
    }
}