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
    imageURL: {
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

categoryModel.belongsToMany(productModel, { through: ProductCategoryModel })
productModel.belongsToMany(categoryModel, { through: ProductCategoryModel })

export default productModel
