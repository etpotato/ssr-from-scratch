const redis = require('redis');

const { REDIS_URL } = process.env;

const client = redis.createClient({
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
  }
};

tryRedis();

export default client;
