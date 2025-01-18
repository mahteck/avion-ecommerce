import { type SchemaTypeDefinition } from 'sanity'
import { Product } from './product'
import { Category } from './category'
import customer from './customer'
import order from './order'
import cartitem from './cartitem'
// import { SubCategory } from './SubCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, order, customer, cartitem],
}
