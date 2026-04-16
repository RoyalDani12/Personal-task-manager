import User from "../database/mongodb/models/user.model.js";

export const userRepository = {
  async findUserByEmailWithPassword(email) {
    return await User.findOne({ email }).select("+password");
    // user is login the pass must be retrive
    // to check the pass is match that is why +password
  },

  async findUserByEmail(email) {
    return await User.findOne({ email });
    //user register
  },

  async createUser(data) {
    return await User.create(data);
  },

  async saveRefreshToken(userId, refreshToken) {
    return await User.findByIdAndUpdate(
      userId,
      { refreshToken },
      { returnDocument: "after" },
    );
  },
  async findUserById(id) {
    return await User.findById(id);
  },

  async findUserAndUpdate(userId, data) {
    return await User.findByIdAndUpdate(
      userId,
      { $set: data }, // only update the filed provided in the data
      {
        returnDocument: "after", //  Substitute new: true
        runValidators: true,
      },
    );
  },
  // find user by token

  async findUserByResetToken(token) {
    return await User.findOne({ resetPasswordToken: token });
  },

  //  update password and clear token
  async resetPasswordAndClearToken(token, hashedPass) {
    return await User.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        $set: { password: hashedPass },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      },
      { returnDocument:'after' }, // Returns the updated document
    );
  },
};
