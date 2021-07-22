import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const MONGODB_PROTOCOL = process.env.MONGODB_PROTOCOL ?? 'mongodb://';
const MONGODB_HOST = process.env.MONGODB_HOST ?? 'localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB ?? 'concern-kalte-dev';
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;

if (!MONGODB_HOST || !MONGODB_USER || !MONGODB_PASS) {
  throw new Error(
    'Please define the MONGODB_HOST environment variable inside .env.local'
  );
}

const MONGODB_ENDPOINT =
  MONGODB_PROTOCOL +
  MONGODB_USER +
  ':' +
  MONGODB_PASS +
  '@' +
  MONGODB_HOST +
  '/' +
  MONGODB_DB +
  '?retryWrites=true&w=majority&authSource=admin';

export const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
  bufferMaxEntries: 0,
  useFindAndModify: false,
  useCreateIndex: true,
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const globalAny: any = global;
let cached = globalAny.mongoose;

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_ENDPOINT, dbOptions)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
