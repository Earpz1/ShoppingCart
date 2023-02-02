import express from 'express'
import categoryModel from './model.js'

const categoryRouter = express()

categoryRouter.post('/', async (request, response, next) => {
  try {
    const { id } = await categoryModel.create(request.body)
    response.status(200).send({ id })
  } catch (error) {
    next(error)
  }
})

export default categoryRouter
