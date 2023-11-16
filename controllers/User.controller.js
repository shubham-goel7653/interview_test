const UserQueries = require('../Queries/User.Queries')
const UUID = require('uuid')
const utils = require('../utils/response')
const {STATUS_CODE} = require('../helpers/StatusCode')
const CONSTANT = require('../helpers/Constant')
const jwt = require('jsonwebtoken');
const secretKey = 'coding';
const User = require('../model/User.Model')

exports.createUser = async (req,res) => {
    try {

        const {body} = req
        const {name,email,password,address,latitude,longitude,status } = body
        
        let alreadyUser = await UserQueries.findByEmail(email)
        if(alreadyUser) {
            return utils.sendResponse(res,STATUS_CODE.OK,CONSTANT.USER_ALREADY_EXISTS,alreadyUser)
        }

        const userData = {
            _id : UUID.v4(),
            name,email,password,address,latitude,longitude,status  
        }

        const token = createToken(userData)
        userData.token = token
        const user = await UserQueries.createUser(userData)
        return utils.sendResponse(res,STATUS_CODE.CREATED,CONSTANT.USER_CREATED_SUCCESSFULL,user)

    }catch(error) {
        console.log('error in createUser controller',error)
        return utils.sendResponse(res,STATUS_CODE.INTERNAL_SERVER_ERROR,CONSTANT.SOMETHING_WENT_WRONG)
    }
}

function createToken(user) {
    // Token expiration time (e.g., 1 hour)
    const expiresIn = '1h';
 

    // Create the token with the user information and secret key
    const token = jwt.sign(user, secretKey, { expiresIn });

    return token;
}

exports.updateUserStatus = async(req,res) => {
    try {

        const filter = {}
        const updateObj =  [
            { $set: { status: { $not: "$status" } } }
        ]

        let updatedUserData = await UserQueries.updateUser({filter,updateObj})
        return utils.sendResponse(res,STATUS_CODE.OK,CONSTANT.Response.USER_UPDATE,updatedUserData)

    }catch(error) {
        console.log('error in updateUserStatus controller',error)
        return utils.sendResponse(res,STATUS_CODE.INTERNAL_SERVER_ERROR,CONSTANT.SOMETHING_WENT_WRONG)
    }
}

exports.calculateDistance = async(req,res) => {
    try {

        const {body} = req
        const {destination_long,destination_lat,_id} = body

        const user = await UserQueries.findById(_id)

        let distance = calculateDistance(destination_lat,destination_long,user.latitude,user.longitude)

        return utils.sendResponse(res,STATUS_CODE.OK,CONSTANT.Response.USER_DISTANCE,distance)

    }catch(error) {
        console.log('error in calculateDistance controller',error)
        return utils.sendResponse(res,STATUS_CODE.INTERNAL_SERVER_ERROR,CONSTANT.SOMETHING_WENT_WRONG)
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI / 180) * lat1;
    const radLon1 = (Math.PI / 180) * lon1;
    const radLat2 = (Math.PI / 180) * lat2;
    const radLon2 = (Math.PI / 180) * lon2;

    // Calculate the differences between the latitudes and longitudes
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    // Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance = earthRadius * c;

    return distance;
}