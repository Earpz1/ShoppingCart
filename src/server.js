import express from 'express'
import cors from 'cors'
import { dbConnect, syncModels } from './db.js'
import productModel from '../api/products/model.js'

const server = express()
const port = process.env.PORT

server.use(express.json())

server.use('/products', productModel)

await dbConnect()
await syncModels()

server.listen(port, () => {
  console.log(`Server is connected on port ${port}`)
})
