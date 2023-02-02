import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'

const categoryModel = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    categoryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  },
)

export default categoryModel
