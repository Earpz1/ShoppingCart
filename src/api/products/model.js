import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import categoryModel from '../category/model.js'
import ProductCategoryModel from './productCategoryModel.js'

const productModel = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
  },
)

productModel.belongsToMany(categoryModel, {
  through: ProductCategoryModel,
})

categoryModel.belongsToMany(productModel, {
  through: ProductCategoryModel,
})

export default productModel
