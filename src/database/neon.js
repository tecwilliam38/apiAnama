import { Pool } from "pg";
const URL = 'postgresql://neondb_owner:npg_nMLpeEIz0l5K@ep-summer-morning-acw5r4fj-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  host: 'ep-summer-morning-acw5r4fj-pooler.sa-east-1.aws.neon.tech',
  database: 'neondb',
  user: 'neondb_owner',
  password: 'npg_nMLpeEIz0l5K',
  ssl: {
    rejectUnauthorized: false,
  },
  channelBinding: 'require'
});

export default pool;

