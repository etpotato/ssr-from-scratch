/* eslint-disable no-console */
import fetch from 'node-fetch';

import redisClient from './redis';

const fetchWithRedisCache = async (key, endpoint) => {
  const fromCache = await redisClient.get(key);
  let data;

  if (fromCache) {
    console.log(`get from redis cache: ${key}`);
    data = JSON.parse(fromCache);
  } else {
    console.log(`fetch: ${endpoint}`);
    const res = await fetch(endpoint);
    data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.status}. ${data?.message || res.statusText}`);
    }
    redisClient.set(key, JSON.stringify(data));
  }

  return data;
};

export default {
  getProduct: async (id) => {
    try {
      const key = `product/${id}`;
      const endpoint = `https://dummyjson.com/products/${id}`;
      const data = await fetchWithRedisCache(key, endpoint);

      return {
        product: { [data.id]: data },
      };
    } catch (err) {
      console.error('api error');
      throw err;
    }
  },

  getProducts: async (limit = 20) => {
    try {
      const key = `products/?limit=${limit}`;
      const endpoint = `https://dummyjson.com/${key}`;
      const data = await fetchWithRedisCache(key, endpoint);
      return data;
    } catch (err) {
      console.error('api error');
      throw err;
    }
  },
};
