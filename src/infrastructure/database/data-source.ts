import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const pool = new pg.Pool({
    user: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    port: Number(process.env.DB_PORT_DEV),
    host: process.env.DB_HOST_DEV
})

export default pool