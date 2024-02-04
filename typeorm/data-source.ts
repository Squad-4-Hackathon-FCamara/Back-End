import { DataSource } from 'typeorm';
import { Tag1706386671546 } from './migrations/1706386671546-tag';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  url: String(process.env.DB_URL),
  migrations: ['dist/typeorm/migrations/*.js'],
});

export default dataSource;
