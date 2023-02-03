import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import productModel from '../products/model.js'

const reviewModel = sequelize.define(
  'review',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
)

productModel.hasMany(reviewModel)
reviewModel.belongsTo(productModel)

export default reviewModel
