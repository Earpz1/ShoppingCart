import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import categoryModel from '../category/model.js'
import ProductCategoryModel from './productCategoryModel.js'

const productModel = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
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
  through: 'productCategory',
  foreignKey: 'category_id',
})
categoryModel.belongsToMany(productModel, {
  through: 'productCategory',
  foreignKey: 'product_id',
})

export default productModel
