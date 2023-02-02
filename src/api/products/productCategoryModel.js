import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'

const ProductCategoryModel = sequelize.define(
  'productCategory',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false },
)

export default ProductCategoryModel
