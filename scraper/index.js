import { scrapeUsers } from './user';
import { scrapeVehicles } from './vehicle';
import { scrapePhotos } from './photo';
import { scrapeBadges } from './badge';
import models from '../models';

const scrape = async () => {
  await models.sequelize.sync({ force: true });

  await scrapeUsers();
  await scrapeVehicles();
  await scrapePhotos();
  await scrapeBadges();
};

scrape();
