require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`


const pool = new Pool(getPool())

function getPool() {
  if (process.env.NODE_ENV === 'production') {
    newPool = {
      connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
      ssl: {rejectUnauthorized: false}
    }
    return newPool 
} else {
    newPool = {
      connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
      ssl: null
    }
    return newPool 
}}

module.exports = { pool }