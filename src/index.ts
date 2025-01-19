import swagger from '@elysiajs/swagger'
import  Elysia  from "elysia"
import logger from 'logixlysia'
import { cors } from '@elysiajs/cors'

import { env } from './utils/config/env'
import { AppRoutes } from './router'

const app = new Elysia()

app.listen({ port: env.PORT })
  .use(cors())
  .use(logger())
  .use(
    swagger({
      exclude: ['/swagger'],
      autoDarkMode: true,
      documentation: {
        info: {
          title: 'Windows Explorer Web Service',
          description:
            'Clean Architecture pattern for ElysiaJS + Bun + Postgres.js',
          version: '1.0.0',
          license: {
            name: 'MIT',
            url: 'https://opensource.org/license/mit/',
          },
          contact: {
            name: 'Rizki Wahyudi',
            url: 'https://www.linkedin.com/in/rizki-wahyudi-24aaa6155/',
          },
        },
      },
    }),
  )
  .use(AppRoutes)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)