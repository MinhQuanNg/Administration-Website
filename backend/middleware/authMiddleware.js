import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // extract token from authHeader string
            token = authHeader.split(' ')[1]

            // verified token returns user
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded.id

            next()
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ error: 'Not authorized, token expired', expired: true })
            }

            return res.status(401).json({ error: 'Not authorized, invalid token' })
        }
    }
})

export { protect }