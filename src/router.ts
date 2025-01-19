import Elysia from 'elysia'

import { ItemController } from './controllers/item-controller'

const routes = new Elysia({ prefix: 'api/v1' })
  .use(ItemController)

export { routes as AppRoutes }
