import { DatabaseConfig } from '../src/config';
import { DataSource } from 'typeorm';
const options = DatabaseConfig();
export default new DataSource(options);
