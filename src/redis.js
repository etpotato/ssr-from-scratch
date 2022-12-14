/* eslint-disable no-console */
const redis = require('redis');

const { REDIS_URL } = process.env;

// eslint-disable-next-line import/no-mutable-exports
let client = redis.createClient({
  url: `redis://${REDIS_URL}`,
});

console.log('REDIS_URL', REDIS_URL);

const tryRedis = async () => {
  try {
    await client.connect();
    console.log('REDIS successfully connected');
  } catch (err) {
    console.log('REDIS connection error');
    console.error(err);
    client = null;
  }
};

await tryRedis();

export default client;
