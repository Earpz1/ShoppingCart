import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import productModel from '../products/model.js'

const cartModel = sequelize.define(
  'cart',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      default: 500,
    },
    userId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
)

cartModel.belongsTo(productModel)
productModel.hasMany(cartModel)

export default cartModel
