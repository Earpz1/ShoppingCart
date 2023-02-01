import express from 'express'
import cors from 'cors'
import { dbConnect, syncModels } from './db.js'
import productRouter from '../api/products/index.js'

const server = express()
const port = process.env.PORT

server.use(cors())
server.use(express.json())

server.use('/products', productRouter)

await dbConnect()
await syncModels()

server.listen(port, () => {
  console.log(`Server is connected on port ${port}`)
})
