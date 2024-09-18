import bcrypt from 'bcrypt';

const generateHash = async (string) => {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(string, salt);
  return hashed
}

export default generateHash