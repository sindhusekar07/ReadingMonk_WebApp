module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  mongoUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  mongoHost: process.env.MONGO_HOST,
  mongoDatabase: process.env.MONGO_INITDB_DATABASE,
  mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
  mongoPort: process.env.MONGO_PORT,
};