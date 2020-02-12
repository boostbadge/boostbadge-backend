import mysql from 'mysql2/promise';
import models from '../models';
import connection from './connection';

const baseUrl = 'https://boostbadge.com/wp-content/uploads/';

async function createBadge(wpBadge) {
  const vehicle = await models.Vehicle.findOne({
    where: { wpId: wpBadge.vehicleId },
  });
  return models.Badge.create({
    wpId: wpBadge.wpId,
    bbId: wpBadge.bbId,
    activated: wpBadge.activated,
    imageUrl: wpBadge.imageUrl != null ? baseUrl + wpBadge.imageUrl : '',
    vehicleId: vehicle != null ? vehicle.id : null,
  });
}

async function updateBadge(badge, wpBadge) {
  const vehicle = await models.Vehicle.findOne({
    where: { wpId: wpBadge.vehicleId },
  });
  return badge.update({
    wpId: wpBadge.wpId,
    bbId: wpBadge.bbId,
    activated: wpBadge.activated,
    imageUrl: wpBadge.imageUrl != null ? baseUrl + wpBadge.imageUrl : '',
    vehicleId: vehicle != null ? vehicle.id : null,
  });
}

async function processBadge(wpBadge) {
  const badge = await models.Badge.findOne({
    where: { wpId: wpBadge.wpId },
  });
  if (badge) {
    const updatedBadge = await updateBadge(badge, wpBadge);
    console.log(
      `Updated Badge: ${updatedBadge.id} (wpId: ${updatedBadge.wpId})`
    );
  }
  const createdBadge = await createBadge(wpBadge);
  console.log(`Created Badge: ${createdBadge.id} (wpId: ${createdBadge.wpId})`);
}

async function getBadges() {
  const query = `SELECT wp_posts.id AS wpId, bbid_wp_postmeta.meta_value AS bbId, activated_wp_postmeta.meta_value AS activated, image_post_wp_postmeta.meta_value AS imageUrl, vehicle_wp_postmeta.meta_value AS vehicleId FROM wp_posts LEFT OUTER JOIN wp_postmeta AS bbid_wp_postmeta ON bbid_wp_postmeta.post_id = wp_posts.ID AND bbid_wp_postmeta.meta_key = 'bbid' LEFT OUTER JOIN wp_postmeta AS activated_wp_postmeta ON activated_wp_postmeta.post_id = wp_posts.ID AND activated_wp_postmeta.meta_key = 'activated' LEFT OUTER JOIN wp_postmeta AS vehicle_wp_postmeta ON vehicle_wp_postmeta.post_id = wp_posts.ID AND vehicle_wp_postmeta.meta_key = 'vehicle' LEFT OUTER JOIN wp_postmeta AS image_wp_postmeta ON wp_posts.ID = image_wp_postmeta.post_id AND image_wp_postmeta.meta_key = '_thumbnail_id' LEFT OUTER JOIN wp_posts AS image_wp_posts ON image_wp_postmeta.meta_value = image_wp_posts.id AND image_wp_posts.post_type = 'attachment' LEFT OUTER JOIN wp_postmeta AS image_post_wp_postmeta ON image_wp_posts.ID = image_post_wp_postmeta.post_id AND image_post_wp_postmeta.meta_key = '_wp_attached_file' WHERE wp_posts.post_type = 'qrcode' AND wp_posts.post_status = 'publish' ORDER BY wp_posts.post_date ASC`;

  const db = await mysql.createConnection(connection);
  const [rows] = await db.execute(query);
  return rows;
}

export async function scrapeBadges() {
  console.log(`Scraping Badges...`);
  const wpBadges = await getBadges();
  for (const wpBadge of wpBadges) {
    await processBadge(wpBadge);
  }
  console.log(`Scraping Badges Completed...`);
}
