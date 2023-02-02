import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'

const productModel = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  category: {
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
})

export default productModel
