import data from '@/lib/data'
import { loadEnvConfig } from '@next/env'
import { cwd } from 'process'
import { connectToDatabase } from '.'
import Product from './models/product.models'
import User from './models/user.models'

loadEnvConfig(cwd())

const main = async () => {
  try {
    const { products, users } = data
    await connectToDatabase(process.env.MONGODB_URI)

    await User.deleteMany()
    const createdUser = await User.insertMany(users)

    await Product.deleteMany()
    const createdProducts = await Product.insertMany(products)

    console.log({
      createdUser,
      createdProducts,
      message: 'Seeded database successfuly',
    })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()