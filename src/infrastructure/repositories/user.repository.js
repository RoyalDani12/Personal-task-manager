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
  }

};