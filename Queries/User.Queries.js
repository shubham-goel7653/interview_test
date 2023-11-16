const User = require('../model/User.Model')

class UserQuries  {
    async findByEmail(email) {
        return User.findOne({email})
    }
    
    async findById(id) {
        return User.findOne({_id : id})
    }

    async createUser(data) {
        return new User(data).save()
    }

    async updateUser(data) {
        const {filter,updateObj} = data
        console.log(filter,'-=------',updateObj)
        return User.updateMany(filter,updateObj)
    }
    

}

module.exports = new UserQuries()