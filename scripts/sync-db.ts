import { sequelize } from '../models';

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database schema synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to synchronize database schema:', error);
    process.exit(1);
  }
})();
