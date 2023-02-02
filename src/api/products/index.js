import express from 'express'
import productModel from './model.js'
import { Op } from 'sequelize'
import createHttpError from 'http-errors'
import categoryModel from '../category/model.js'
import ProductCategoryModel from './productCategoryModel.js'

const productRouter = express.Router()

productRouter.post('/', async (request, response, next) => {
  try {
    const { id } = await productModel.create(request.body)
    response.status(200).send({ id })
  } catch (error) {
    next(error)
  }
})

productRouter.get('/:productID', async (request, response, next) => {
  try {
    const product = await productModel.findByPk(request.params.productID)

    if (product) {
      response.status(200).send(product)
    } else {
      next(
        createHttpError(
          404,
          `There was no product with the id ${request.params.productID}`,
        ),
      )
    }
  } catch (error) {
    next(error)
  }
})

productRouter.delete('/:productID', async (request, response, next) => {
  try {
    const productsDeleted = await productModel.destroy({
      where: { id: request.params.productID },
    })
    if (productsDeleted === 1) {
      response.status(200).send(`Product has been deleted`)
    } else {
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

productRouter.put('/:productID', async (request, response, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await productModel.update(
      request.body,
      {
        where: { id: request.params.productID },
        returning: true,
      },
    )
    if (numberOfUpdatedRows === 1) {
      response.status(200).send(updatedRecords[0])
    } else {
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

productRouter.get('/', async (request, response, next) => {
  try {
    const query = {}
    if (request.query.category)
      query.category = { [Op.like]: `${request.query.category}%` }

    if (request.query.minPrice && request.query.maxPrice)
      query.price = {
        [Op.between]: [request.query.minPrice, request.query.maxPrice],
      }

    if (request.query.name) query.name = { [Op.like]: `${request.query.name}%` }

    const products = await productModel.findAll({
      where: { ...query },
      include: [
        {
          model: categoryModel,
          attributes: ['categoryName'],
        },
      ],

      attributes: ['id', 'name', 'price', 'categoryId'],
    })
    response.send(products)
  } catch (error) {
    next(error)
  }
})

export default productRouter
