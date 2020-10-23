import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { config } from "./config"
import { Transport } from "@nestjs/microservices"
import * as admin from "firebase-admin"
import { ServiceAccount } from "firebase-admin"

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot())
  const adminConfig: ServiceAccount = {
    projectId: config.FIREBASE.projectId,
    privateKey: config.FIREBASE.privateKey.replace(/\\n/g, "\n"),
    clientEmail: config.FIREBASE.email,
  }

  admin.initializeApp({ credential: admin.credential.cert(adminConfig) })

  app.enableCors()

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: config.REDIS_URL,
    },
  })

  await app.startAllMicroservicesAsync()
  await app.listen(config.APP_PORT || 3000)
}
bootstrap()
