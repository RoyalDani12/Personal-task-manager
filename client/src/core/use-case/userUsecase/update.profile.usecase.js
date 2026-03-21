import fs from 'fs';
import path from 'path';

const uploadProfileUseCase = async (userId, profileData, userRepository) => {
  // 1. Check if user exists
  const user = await userRepository.findUserById(userId);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Delete old avatar if a new one is uploaded
  if (profileData.avatar && user.avatar) {
    const oldFilePath = path.join(process.cwd(), user.avatar);
    if (fs.existsSync(oldFilePath)) {
      fs.unlink(oldFilePath, (err) => {
        if (err) console.log('Failed to delete old avatar');
        else console.log('Old avatar deleted successfully');
      });
    }
  }

  // 3. Fill in missing required fields to prevent validation errors
  const updatedData = {
    name: profileData.name || user.name,
    phone: profileData.phone || user.phone,
    bio: profileData.bio || user.bio,
    avatar: profileData.avatar || user.avatar,
  };

  // 4. Update user
  const updateUser = await userRepository.findUserAndUpdate(userId, updatedData);

  return updateUser;
};

export default uploadProfileUseCase;