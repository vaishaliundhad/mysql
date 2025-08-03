
import NodeCache from 'node-cache'
const cache = new NodeCache({ stdTTL: 120, maxKeys: 200 });

export const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.json(cachedData);
  }

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (data?.success) {
      cache.set(key, data);
    }
    originalJson(data);
  };

  next();
};

