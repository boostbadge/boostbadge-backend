import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import models from '../models';
import connection from './connection';

async function createUser(wpUser) {
  return models.User.create({
    wpId: wpUser.wpId,
    deleted: false,
    email: wpUser.email,
    displayName: wpUser.username,
    password: await bcrypt.hash('password', 10),
    verified: wpUser.verified,
    profilePhoto: `https://boostbadge.com/wp-content/uploads/ultimatemember/${wpUser.wpId}/${wpUser.profilePhoto}`,
    coverPhoto: `https://boostbadge.com/wp-content/uploads/ultimatemember/${wpUser.wpId}/${wpUser.coverPhoto}`,
    firstName: wpUser.firstName,
    lastName: wpUser.lastName,
    description: wpUser.description,
    url: wpUser.url,
    instagram: wpUser.instagram,
    twitter: wpUser.twitter,
    facebook: wpUser.facebook,
    youtube: wpUser.youtube,
  });
}

async function updateUser(user, wpUser) {
  return user.update({
    wpId: wpUser.wpId,
    deleted: false,
    email: wpUser.email,
    displayName: wpUser.username,
    verified: wpUser.verified,
    profilePhoto: `https://boostbadge.com/wp-content/uploads/ultimatemember/${wpUser.wpId}/${wpUser.profilePhoto}`,
    coverPhoto: `https://boostbadge.com/wp-content/uploads/ultimatemember/${wpUser.wpId}/${wpUser.coverPhoto}`,
    firstName: wpUser.firstName,
    lastName: wpUser.lastName,
    description: wpUser.description,
    url: wpUser.url,
    instagram: wpUser.instagram,
    twitter: wpUser.twitter,
    facebook: wpUser.facebook,
    youtube: wpUser.youtube,
  });
}

async function processUser(wpUser) {
  const user = await models.User.findOne({ where: { wpId: wpUser.wpId } });
  if (user) {
    const updatedUser = await updateUser(user, wpUser);
    console.log(`Updated User: ${updatedUser.id} (wpId: ${updatedUser.wpId})`);
  } else {
    const createdUser = await createUser(wpUser);
    console.log(`Created User: ${createdUser.id} (wpId: ${createdUser.wpId})`);
  }
}

async function getUsers() {
  const query = `SELECT ID AS wpId, user_login AS username, user_email AS email, user_url AS url, first_name_wp_usermeta.meta_value AS firstName, last_name_wp_usermeta.meta_value AS lastName, description_wp_usermeta.meta_value AS description, profile_photo_wp_usermeta.meta_value AS profilePhoto, cover_photo_wp_usermeta.meta_value AS coverPhoto, CASE WHEN _um_verified_wp_usermeta.meta_value = "verified" THEN TRUE ELSE FALSE END AS verified, DATE_FORMAT(birth_date_wp_usermeta.meta_value, "%Y-%m-%d") AS dob, facebook_wp_usermeta.meta_value AS facebook, instagram_wp_usermeta.meta_value AS instagram, twitter_wp_usermeta.meta_value AS twitter, youtube_wp_usermeta.meta_value AS youtube FROM wp_users LEFT OUTER JOIN wp_usermeta AS first_name_wp_usermeta ON first_name_wp_usermeta.user_id = wp_users.ID AND first_name_wp_usermeta.meta_key = 'first_name' LEFT OUTER JOIN wp_usermeta AS last_name_wp_usermeta ON last_name_wp_usermeta.user_id = wp_users.ID AND last_name_wp_usermeta.meta_key = 'last_name' LEFT OUTER JOIN wp_usermeta AS description_wp_usermeta ON description_wp_usermeta.user_id = wp_users.ID AND description_wp_usermeta.meta_key = 'description' LEFT OUTER JOIN wp_usermeta AS profile_photo_wp_usermeta ON profile_photo_wp_usermeta.user_id = wp_users.ID AND profile_photo_wp_usermeta.meta_key = 'profile_photo' LEFT OUTER JOIN wp_usermeta AS cover_photo_wp_usermeta ON cover_photo_wp_usermeta.user_id = wp_users.ID AND cover_photo_wp_usermeta.meta_key = 'cover_photo' LEFT OUTER JOIN wp_usermeta AS _um_verified_wp_usermeta ON _um_verified_wp_usermeta.user_id = wp_users.ID AND _um_verified_wp_usermeta.meta_key = '_um_verified' LEFT OUTER JOIN wp_usermeta AS birth_date_wp_usermeta ON birth_date_wp_usermeta.user_id = wp_users.ID AND birth_date_wp_usermeta.meta_key = 'birth_date' LEFT OUTER JOIN wp_usermeta AS facebook_wp_usermeta ON facebook_wp_usermeta.user_id = wp_users.ID AND facebook_wp_usermeta.meta_key = 'facebook' LEFT OUTER JOIN wp_usermeta AS instagram_wp_usermeta ON instagram_wp_usermeta.user_id = wp_users.ID AND instagram_wp_usermeta.meta_key = 'instagram' LEFT OUTER JOIN wp_usermeta AS twitter_wp_usermeta ON twitter_wp_usermeta.user_id = wp_users.ID AND twitter_wp_usermeta.meta_key = 'twitter' LEFT OUTER JOIN wp_usermeta AS youtube_wp_usermeta ON youtube_wp_usermeta.user_id = wp_users.ID AND youtube_wp_usermeta.meta_key = 'youtube' ORDER BY user_registered ASC`;

  const db = await mysql.createConnection(connection);
  const [rows] = await db.execute(query);
  return rows;
}

export async function scrapeUsers() {
  console.log(`Scraping Users...`);
  const wpUsers = await getUsers();
  for (const wpUser of wpUsers) {
    await processUser(wpUser);
  }
  console.log(`Scraping Users Completed...`);
}
