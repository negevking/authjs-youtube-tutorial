// File: lib/db.js
// This query is used for getting the dynamic exam content and submitting answers
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function query(text, params) {
  const res = await pool.query(text, params)
  return res.rows
}