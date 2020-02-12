import mysql from 'mysql2/promise';
import models from '../models';
import connection from './connection';

async function createPhoto(wpPhoto) {
  const vehicle = await models.Vehicle.findOne({
    where: { wpId: wpPhoto.vehicleId },
  });
  return models.Photo.create({
    wpId: wpPhoto.wpId,
    vehicleId: vehicle.id,
    url: wpPhoto.url,
    localUrl: wpPhoto.url,
  });
}

async function processPhoto(wpPhoto) {
  const photo = await models.Photo.findOne({ where: { wpId: wpPhoto.wpId } });
  if (!photo) {
    const createdPhoto = await createPhoto(wpPhoto);
    console.log(
      `Created Photo: ${createdPhoto.id} (wpId: ${createdPhoto.wpId})`
    );
  }
}

async function getPhotos() {
  const query = `SELECT photoPosts.ID AS wpId, vehiclePosts.ID AS vehicleId, photoPosts.guid AS url FROM wp_postmeta JOIN wp_posts AS vehiclePosts ON vehiclePosts.ID = wp_postmeta.post_id JOIN wp_posts AS photoPosts ON photoPosts.ID = wp_postmeta.meta_value WHERE wp_postmeta.meta_key = 'photos' AND vehiclePosts.post_type = 'vehicle'  AND vehiclePosts.post_status = 'publish'  ORDER BY vehiclePosts.post_date ASC`;

  const db = await mysql.createConnection(connection);
  const [rows] = await db.execute(query);
  return rows;
}

export async function scrapePhotos() {
  console.log(`Scraping Photos...`);
  const wpPhotos = await getPhotos();
  for (const wpPhoto of wpPhotos) {
    await processPhoto(wpPhoto);
  }
  console.log(`Scraping Photos Completed...`);
}
