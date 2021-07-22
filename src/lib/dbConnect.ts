import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB ?? 'concern-kalte';
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;

if (!MONGODB_URI || !MONGODB_USER || !MONGODB_PASS) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

export const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
  bufferMaxEntries: 0,
  useFindAndModify: false,
  useCreateIndex: true,
  user: MONGODB_USER,
  pass: MONGODB_PASS,
  dbName: MONGODB_DB,
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
      .connect(MONGODB_URI, dbOptions)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
