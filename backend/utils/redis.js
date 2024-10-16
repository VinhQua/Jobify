import { createClient } from "redis";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
dotenv.config();
const client = await createClient({
  password: process.env.Redis_Password,
  socket: {
    host: process.env.Redis_Host,
    port: 11834,
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

// Middleware to cache responses
const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  try {
    const data = await client.get(cacheKey);
    if (data !== null) {
      res.status(StatusCodes.OK).json(JSON.parse(data));
    } else {
      next();
    }
  } catch (error) {
    throw error;
  }
};
// Common function for cache invalidation
const invalidateCache = async (cacheKey) => {
  const allKeys = await client.keys("*");
  console.log(allKeys);
  allKeys.map((key) => {
    if (key.includes(cacheKey)) {
      client.del(key, (err, response) => {
        if (err) throw err;
        console.log(`Cache key "${key}" invalidated`);
      });
    }
  });
};

export { cacheMiddleware, invalidateCache, client };
