import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(process.cwd(), `.env`),
});

export default () => ({
  security: {
    defaultEmail: process.env.DEFAULT_USER_EMAIL,
    defaultPass: process.env.DEFAULT_USER_PASS,
    serverSecret: process.env.SERVER_SECRET,
    serverSalt: process.env.SERVER_SALT,
  },
  db: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    username: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASS,
    database: process.env.MONGODB_DB_NAME,
  },
  //   logger: {
  //     tableName: process.env.LOG_DB_TABLE,
  //   },
});
