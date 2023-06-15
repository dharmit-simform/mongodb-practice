import jwt from 'jsonwebtoken';

export async function generateJwt (payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}
