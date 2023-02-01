import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_DATABSE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
)

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the Database')
  } catch (error) {
    console.log(`Failed to connect ${error}`)
    process.exit(1)
  }
}

export const syncModels = async () => {
  await sequelize.sync({ alter: true })
  console.log(`Tables have been syncd`)
}

export default sequelize
