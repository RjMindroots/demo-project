import dotenv from 'dotenv'
dotenv.config()

export const {
    CONNECTION_URL,
    JWT_SECRET,
    REFRESH_SECRET,
    DEBUG_MODE,
    HASH_SECRET
} = process.env