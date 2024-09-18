import User from '../models/userModel.js';
import generateHash from './generateHash.js';

export const createAccount = async (info) => {
    const { username, password, ...rest } = info;
    try {
        const userExists = await User.findOne({
            where: {
                username: username
            }
        });

        if (userExists) {
            console.log('User already exists');
            return null;
        }

        const newUser = await User.create({
            username: username,
            passhash: await generateHash(password),
            ...rest
        });

        console.log('User created:', username, 'with password:', password);

        return newUser;
    } catch (error) {
        console.error('Error creating account:', error);
        return null;
    }
}