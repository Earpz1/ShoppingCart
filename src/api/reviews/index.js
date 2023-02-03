import express from 'express'
import reviewModel from './model.js'

const reviewRouter = express()

reviewRouter.post('/', async (request, response, next) => {
  try {
    const post = await reviewModel.create(request.body)

    response.status(200).send(post)
  } catch (error) {
    next(error)
  }
})

reviewRouter.get('/', async (request, response, next) => {
  try {
    const reviews = await reviewModel.findAll({})

    if (reviews) {
      response.status(200).send(reviews)
    }
  } catch (error) {
    next(error)
  }
})

export default reviewRouter
