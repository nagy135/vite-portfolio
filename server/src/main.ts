import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Disable automatic redirect for trailing slashes
    // This is crucial for Socket.IO to work properly
    rawBody: false,
  })
  
  // Disable Express's strict routing which causes 308 redirects
  const expressApp = app.getHttpAdapter().getInstance()
  expressApp.set('strict routing', false)
  
  app.enableCors({
    origin: (origin, cb) => {
      const allowed = (process.env.CORS_ORIGIN ?? '*')
        .split(',')
        .map((s) => s.trim())
      if (!origin || allowed.includes('*') || allowed.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin ?? '')) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    },
    credentials: false,
  })

  const port = Number(process.env.PORT ?? 3001)
  await app.listen(port, '0.0.0.0')
  // eslint-disable-next-line no-console
  console.log(`Chat server running on http://0.0.0.0:${port}`)
}

bootstrap()
