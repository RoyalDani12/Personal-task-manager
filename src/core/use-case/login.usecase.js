import bcrypt from "bcrypt";

const loginUseCase = async (userData, userRepository) => {

  if (!userData) {
    const error = new Error("User data is required");
    error.statusCode = 400;
    throw error;
  }

  const { email, password } = userData;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const existUser = await userRepository.findUserByEmailWithPassword(email);

  if (!existUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, existUser.password);

  if (!isMatch) {
    const error = new Error("Invalid Email or Password");
    error.statusCode = 400;
    throw error;
  }

  const { password: _, ...safeUser } = existUser.toObject();

  return safeUser;
};

export default loginUseCase;