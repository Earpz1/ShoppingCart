import express from 'express'
import cors from 'cors'
import { dbConnect, syncModels } from './db.js'
import productRouter from '../src/api/products/index.js'
import categoryRouter from './api/category/index.js'
import { notFoundError } from './errorHandling.js'

const server = express()
const port = process.env.PORT

server.use(cors())
server.use(express.json())

//End points
server.use('/products', productRouter)
server.use('/categories', categoryRouter)

//Error Handlers
server.use(notFoundError)

await dbConnect()
await syncModels()

server.listen(port, () => {
  console.log(`Server is connected on port ${port}`)
})
