import { type SchemaTypeDefinition } from 'sanity'
import { Product } from './product'
import { Category } from './category'
import customer from './customer'
import order from './order'
import cartitem from './cartItem'
import user from './user'
import environment from './environment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, order, customer, cartitem, user, environment],
}
