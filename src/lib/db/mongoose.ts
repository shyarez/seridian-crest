import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME!;

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI is not defined. Database features will return mock data or fail.');
}

// Augment global for hot-reload caching in development
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnPromise: Promise<typeof mongoose> | null;
}

let cachedPromise = global._mongooseConnPromise ?? null;

export async function connectDB(): Promise<typeof mongoose> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
    bufferCommands: false,
  });

  global._mongooseConnPromise = cachedPromise;
  return cachedPromise;
}
