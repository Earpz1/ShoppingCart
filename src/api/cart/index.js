import express from 'express'
import { Sequelize } from 'sequelize'
import sequelize from '../../db.js'
import productModel from '../products/model.js'
import cartModel from './model.js'

const cartRouter = express()

cartRouter.post('/Dan/:productId', async (request, response, next) => {
  try {
    const { id } = await cartModel.create({
      productId: request.params.productId,
      userId: 'Dan',
    })
    response.status(200).send({ id })
  } catch (error) {
    next(error)
  }
})

//Get a cart by userId

cartRouter.get('/:userId', async (request, response, next) => {
  try {
    const cart = await cartModel.findAll({
      where: { userId: [request.params.userId] },
      include: [{ model: productModel }],
    })
    response.status(200).send(cart)
  } catch (error) {
    next(error)
  }
})

//Delete an item from the cart
cartRouter.delete('/:userId/:productId', async (request, response, next) => {
  try {
    const removeProduct = cartModel.destroy({
      where: { productId: request.params.productId },
    })

    if (removeProduct === 1) {
      response.status(200).send(`Product deleted`)
    } else {
      response.status(200).send(`Product deleted`)
    }
  } catch (error) {
    next(error)
  }
})

export default cartRouter
