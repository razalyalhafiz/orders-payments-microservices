import * as dotenv from 'dotenv';

const configFromProcess = {
  PROCESS_PAYMENT_TIMEOUT: process.env.PROCESS_PAYMENT_TIMEOUT,
  REDIS_URL: process.env.REDIS_URL,
  MONGO_URL: process.env.MONGO_URL,
};
export const config = { ...configFromProcess, ...dotenv.config().parsed };
