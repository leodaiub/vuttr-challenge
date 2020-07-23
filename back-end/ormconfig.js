module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['build/entity/**/*.js'],
  migrations: ['build/migration/**/*.ts'],
  subscribers: ['build/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'build/entity',
    migrationsDir: 'build/migration',
    subscribersDir: 'build/subscriber',
  },
};
