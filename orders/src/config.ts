import * as dotenv from "dotenv"

const configFromProcess = {
  APP_PORT: process.env.APP_PORT,
  DELIVERY_TIMEOUT: process.env.DELIVERY_TIMEOUT,
  REDIS_URL: process.env.REDIS_URL,
  MONGO_URL: process.env.MONGO_URL,
  FIREBASE: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    email: process.env.FIREBASE_EMAIL,
  },
}
export const config = { ...configFromProcess, ...dotenv.config().parsed }
