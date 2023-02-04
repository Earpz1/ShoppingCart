import express from 'express'
import productModel from './model.js'
import { Op } from 'sequelize'
import createHttpError from 'http-errors'
import categoryModel from '../category/model.js'
import ProductCategoryModel from './productCategoryModel.js'
import reviewModel from '../reviews/model.js'

const productRouter = express.Router()

//Post a new product

productRouter.post('/', async (request, response, next) => {
  try {
    const { id } = await productModel.create(request.body)

    if (request.body.console) {
      await ProductCategoryModel.create({
        categoryId: request.body.console,
        productId: id,
      })
    }

    response.status(200).send({ id })
  } catch (error) {
    next(error)
  }
})

//Get product by ID

productRouter.get('/:productID', async (request, response, next) => {
  try {
    const product = await productModel.findByPk(request.params.productID, {
      attributes: ['id', 'name', 'description', 'imageURL', 'price'],
      include: [
        {
          model: reviewModel,
          attributes: ['review', 'rating'],
        },
        {
          model: categoryModel,
          attributes: { exclude: ['id'] },
        },
      ],
    })

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

//Delete product by ID

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

//Edit Product by ID
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

//Get products by filter

productRouter.get('/', async (request, response, next) => {
  try {
    const query = {}

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
          attributes: ['category'],
          where: {
            ...query.category,
          },
        },
      ],
      order: [['price', request.query.price]],
      limit: request.query.limit,
      attributes: ['id', 'name', 'description', 'imageURL', 'price'],
    })
    response.send(products)
  } catch (error) {
    next(error)
  }
})

//Get products by filter

productRouter.get('/filter/:category', async (request, response, next) => {
  try {
    const products = await productModel.findAll({
      include: [
        {
          model: categoryModel,
          attributes: ['category'],
          where: {
            category: { [Op.iLike]: request.params.category },
          },
        },
      ],
      limit: request.params.limit,
      attributes: ['id', 'name', 'description', 'imageURL', 'price'],
    })
    response.send(products)
  } catch (error) {
    next(error)
  }
})

//Get reviews by productID

productRouter.get('/:productID/reviews', async (request, response, next) => {
  try {
    const reviews = await productModel.findByPk(request.params.productID, {
      attributes: {
        exclude: ['id', 'name', 'description', 'imageURL', 'price'],
      },
      include: [
        {
          model: reviewModel,
        },
      ],
    })
    response.status(200).send(reviews)
  } catch (error) {
    next(error)
  }
})

//Add a new product by supplying the productID and getting the categoryID from the body

productRouter.post(
  '/:productID/addCategory',
  async (request, response, next) => {
    try {
      const { id } = ProductCategoryModel.create({
        categoryId: request.body.categoryId,
        productId: request.params.productID,
      })

      response.status(200).send(`Category added!`)
    } catch (error) {
      next(error)
    }
  },
)

//Delete a category from a product by giving the productID and categoryID

productRouter.delete(
  '/:productID/removeCategory',
  async (request, response, next) => {
    try {
      const categoryDeleted = await ProductCategoryModel.destroy({
        where: {
          [Op.and]: [
            { categoryId: request.body.categoryId },
            { productId: request.params.productID },
          ],
        },
      })

      if (categoryDeleted === 1) {
        response.status(200).send(`Category has been deleted`)
      } else {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  },
)

export default productRouter
