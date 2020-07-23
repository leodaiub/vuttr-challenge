module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts', 'diist/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts', 'dist/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts', 'dist/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
