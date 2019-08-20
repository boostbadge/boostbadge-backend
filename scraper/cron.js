import cron from 'node-cron';
import { scrapeUsers } from './user';

cron.schedule(`0 * * * *`, () => {
  console.log(`RUNNING THE CRON`);
  scrapeUsers();
});
