import dotenv from 'dotenv'
dotenv.config()

const API = {
  PORT: process.env.PORT || 2000,
  DB_URI: process.env.DB_URI
}

const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

export { API, HTTP_CODES }