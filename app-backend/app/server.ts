
import express from 'express'
import cors from 'cors'
import "express-async-errors"
import { routes } from './routes'
import { sendErros } from './middlewares/sendErrors'

const app = express()
const CORS = cors({ origin: '*' })

app.use(CORS)
app.use(express.json())
app.use(routes)
app.use(sendErros)

app.listen(3001, () => {
  console.log('Running on port 3001:')
  console.log('\x1b[32m', 'http://localhost:3001');
  console.log('\x1b[0m');
})