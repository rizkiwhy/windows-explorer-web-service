import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['test', 'development', 'production'])
    .default('development'),
  PORT: z.string().default('4000'),

  MYSQL_HOST: z.string().default('localhost'),
  MYSQL_PORT: z.string().default('3306'),
  MYSQL_DATABASE: z.string().default('test'),
  MYSQL_USER: z.string().default('test'),
  MYSQL_PASSWORD: z.string(),
  MYSQL_IDLE_TIMEOUT: z.string().default('0'),
  MYSQL_CONNECT_TIMEOUT: z.string().default('30'),

  
  MYSQL_DOCKER_DB: z.string().default('test'),
  MYSQL_DOCKER_USER: z.string().default('test'),
  MYSQL_DOCKER_PASSWORD: z.string(),

  ELYSIA_VERSION: z.string().default('0.0.0'),
  RUNTIME: z.enum(['bun', 'edge']).default('bun'),
})

export const env = envSchema.parse(process.env)