import asyncHandler from 'express-async-handler'

import User from '../../models/userModel.js'
import generateHash from '../../utils/generateHash.js'
import generateToken from '../../utils/generateToken.js'

export const registerUser = asyncHandler(async (req, res) => {
    const { id, username, password, admin } = req.body;

    console.log(id)

    const userExists = await User.findOne({
        where: {
            username: username
        }
    });

    // user exists
    if (userExists) {
        return res.status(400).json({ error: 'ID already registered.' });
    }

    User.update({
        username: username,
        passhash: await generateHash(password),
        admin: admin
    }, {
        where: {
            id: id
        },
        returning: true,
        plain: true, // return only first updated object
    }).then(([, user]) => {
        res.status(201).json({
            username: user.username,
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
        })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({ error: 'Invalid user data' });
    });
})

export const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({
        where: {
            username: username
        }
    });

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
            userToken: generateToken(user.id),
          })
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
})

export const getUserProfile = asyncHandler(async (req, res) => {
    // find user's obj in db
    User.findByPk(req.user, { 
        attributes: {
            exclude: ['passhash']
        }
    }).then((user) => {
        res.status(200).json(user)
    }).catch((error) => {
        res.status(404).json({ error: 'User not found' })
    })
})

export const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
        return res.status(400).json({ error: 'New password must be different from old password' });
    } else {
        const user = await User.findByPk(req.params.id);

        if (user && (await user.matchPassword(currentPassword))) {
            user.passhash = await generateHash(newPassword);
            user.save().then(() => {
                res.status(200).json({ message: 'Password changed successfully' });
            }).catch((error) => {
                console.log(error)
                res.status(400).json({ error: 'Invalid user data' });
            });
        } else {
            res.status(401).json({ error: 'Incorrect old password' });
        }
    }
})