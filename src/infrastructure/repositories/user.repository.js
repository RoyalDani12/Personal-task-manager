import User from '../database/mongodb/models/user.model.js'

export const userRepository = {

  async findUserByEmailWithPassword(email) {
    return await User.findOne({ email }).select("+password");
  },

  async findUserByEmail(email) {
    return await User.findOne({ email });
  },

  async createUser(data) {
    return await User.create(data);
  },

  async saveRefreshToken (userId,refreshToken) {
    return await User.findByIdAndUpdate(userId,
      { refreshToken },
      { returnDocument:'after' }
    )
  },
  async findUserById (id){
    return await User.findById(id)
  },

  async findUserAndUpdate (userId,data){
    return await User.findByIdAndUpdate(
      userId,
      { $set:data }, // only update the filde provided in the data
      {
        returnDocument:"after", //  substitute new: true
        runValidators:true
      }
    )
  }

};