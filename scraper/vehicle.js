import mysql from 'mysql2/promise';
import models from '../models';
import connection from './connection';

async function createVehicleLikes(vehicle) {
  const numOfLikes = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < numOfLikes; i += 1) {
    await models.Like.create({
      vehicleId: vehicle.id,
      userId: vehicle.userId,
    });
  }
}

async function createVehicle(wpVehicle) {
  const user = await models.User.findOne({
    where: { wpId: wpVehicle.ownerId },
  });
  return models.Vehicle.create({
    wpId: wpVehicle.wpId,
    userId: user.id,
    featuredImage: wpVehicle.featuredImage,
    forSale: wpVehicle.forSale != null ? wpVehicle.forSale : false,
    year: wpVehicle.year,
    make: wpVehicle.make,
    model: wpVehicle.model,
    nickname: wpVehicle.nickname,
    location: wpVehicle.homeState,
    description: wpVehicle.blurb,
    exteriorColor: wpVehicle.color,
    miles: wpVehicle.miles,
    awards: wpVehicle.awards,
    engine: wpVehicle.engine,
    horsepower: wpVehicle.horsepower,
    torque: wpVehicle.torque,
    transmission: wpVehicle.transmission,
    suspension: wpVehicle.suspension,
    wheels: wpVehicle.wheels,
    tires: wpVehicle.tires,
    brakes: wpVehicle.brakes,
    curbWeight: wpVehicle.curbWeight,
    acceleratingTime: wpVehicle.acceleratingTime,
    quarterMileTime: wpVehicle.quarterMileTime,
    brakingTime: wpVehicle.brakingTime,
    instagram: wpVehicle.instagram,
  });
}

async function updateVehicle(vehicle, wpVehicle) {
  const user = await models.User.findOne({
    where: { wpId: wpVehicle.ownerId },
  });
  return vehicle.update({
    wpId: wpVehicle.wpId,
    userId: user.id,
    featuredImage: wpVehicle.featuredImage,
    forSale: wpVehicle.forSale != null ? wpVehicle.forSale : false,
    year: wpVehicle.year,
    make: wpVehicle.make,
    model: wpVehicle.model,
    nickname: wpVehicle.nickname,
    location: wpVehicle.homeState,
    description: wpVehicle.blurb,
    exteriorColor: wpVehicle.color,
    miles: wpVehicle.miles,
    awards: wpVehicle.awards,
    engine: wpVehicle.engine,
    horsepower: wpVehicle.horsepower,
    torque: wpVehicle.torque,
    transmission: wpVehicle.transmission,
    suspension: wpVehicle.suspension,
    wheels: wpVehicle.wheels,
    tires: wpVehicle.tires,
    brakes: wpVehicle.brakes,
    curbWeight: wpVehicle.curbWeight,
    acceleratingTime: wpVehicle.acceleratingTime,
    quarterMileTime: wpVehicle.quarterMileTime,
    brakingTime: wpVehicle.brakingTime,
    instagram: wpVehicle.instagram,
  });
}

async function processVehicle(wpVehicle) {
  const vehicle = await models.Vehicle.findOne({
    where: { wpId: wpVehicle.wpId },
  });
  if (vehicle) {
    const updatedVehicle = await updateVehicle(vehicle, wpVehicle);
    console.log(
      `Updated Vehicle: ${updatedVehicle.id} (wpId: ${updatedVehicle.wpId})`
    );
    return updatedVehicle;
  }
  const createdVehicle = await createVehicle(wpVehicle);
  console.log(
    `Created Vehicle: ${createdVehicle.id} (wpId: ${createdVehicle.wpId})`
  );
  return createdVehicle;
}

async function getVehicles() {
  const query = `SELECT wp_posts.ID AS wpId,        owner_wp_postmeta.meta_value AS ownerId,        qrcode_wp_postmeta.meta_value AS qrcodeId,        year_wp_postmeta.meta_value AS year,        make_wp_postmeta.meta_value AS make,        model_wp_postmeta.meta_value AS model,        nickname_wp_postmeta.meta_value AS nickname,        instagram_handle_wp_postmeta.meta_value AS instagram,        miles_wp_postmeta.meta_value AS miles,        color_wp_postmeta.meta_value AS color,        trimlevel_wp_postmeta.meta_value AS trimlevel,        engine_wp_postmeta.meta_value AS engine,        horsepower_wp_postmeta.meta_value AS horsepower,        torque_wp_postmeta.meta_value AS torque,        gas_type_wp_postmeta.meta_value AS fuelType,        engine_mods_wp_postmeta.meta_value AS engineMods,        drivetrain_wp_postmeta.meta_value AS drivetrain,        transmission_wp_postmeta.meta_value AS transmission,        interior_mods_wp_postmeta.meta_value AS interiorMods,        wheels_wp_postmeta.meta_value AS wheels,        tires_wp_postmeta.meta_value AS tires,        curb_weight_wp_postmeta.meta_value AS curbWeight,        exterior_mods_wp_postmeta.meta_value AS exteriorMods,        suspension_wp_postmeta.meta_value AS suspension,        blurb_wp_postmeta.meta_value AS blurb,        future_plans_wp_postmeta.meta_value AS futurePlans,        wheelbase_wp_postmeta.meta_value AS wheelbase,        zero_to_sixty_wp_postmeta.meta_value AS acceleratingTime,        sixty_to_zero_wp_postmeta.meta_value AS brakingTime,        quarter_mile_wp_postmeta.meta_value AS quarterMileTime,        brakes_wp_postmeta.meta_value AS brakes,        epa_mpg_wp_postmeta.meta_value AS epa,        awards_wp_postmeta.meta_value AS awards,        home_state_wp_postmeta.meta_value AS homeState,        for_sale_wp_postmeta.meta_value AS for_sale,        additional_information_wp_postmeta.meta_value AS additionalInformation,        body_style_wp_postmeta.meta_value AS body_style,        youtube_video_1_wp_postmeta.meta_value AS youtube_video_1,        youtube_video_2_wp_postmeta.meta_value AS youtube_video_2,        vimeo_video_1_wp_postmeta.meta_value AS vimeo_video_1,        vimeo_video_2_wp_postmeta.meta_value AS vimeo_video_2,        featuredImage_wp_posts.guid AS featuredImage FROM wp_posts JOIN wp_postmeta AS owner_postmeta ON owner_postmeta.post_id = wp_posts.ID AND owner_postmeta.meta_key = 'owner' LEFT OUTER JOIN wp_postmeta AS year_wp_postmeta ON year_wp_postmeta.post_id = wp_posts.ID AND year_wp_postmeta.meta_key = 'year' LEFT OUTER JOIN wp_postmeta AS make_wp_postmeta ON make_wp_postmeta.post_id = wp_posts.ID AND make_wp_postmeta.meta_key = 'make' LEFT OUTER JOIN wp_postmeta AS model_wp_postmeta ON model_wp_postmeta.post_id = wp_posts.ID AND model_wp_postmeta.meta_key = 'model' LEFT OUTER JOIN wp_postmeta AS description_wp_postmeta ON description_wp_postmeta.post_id = wp_posts.ID AND description_wp_postmeta.meta_key = 'description' LEFT OUTER JOIN wp_postmeta AS color_wp_postmeta ON color_wp_postmeta.post_id = wp_posts.ID AND color_wp_postmeta.meta_key = 'color' LEFT OUTER JOIN wp_postmeta AS miles_wp_postmeta ON miles_wp_postmeta.post_id = wp_posts.ID AND miles_wp_postmeta.meta_key = 'miles' LEFT OUTER JOIN wp_postmeta AS transmission_wp_postmeta ON transmission_wp_postmeta.post_id = wp_posts.ID AND transmission_wp_postmeta.meta_key = 'transmission' LEFT OUTER JOIN wp_postmeta AS engine_mods_wp_postmeta ON engine_mods_wp_postmeta.post_id = wp_posts.ID AND engine_mods_wp_postmeta.meta_key = 'engine_mods' LEFT OUTER JOIN wp_postmeta AS wheels_wp_postmeta ON wheels_wp_postmeta.post_id = wp_posts.ID AND wheels_wp_postmeta.meta_key = 'wheels' LEFT OUTER JOIN wp_postmeta AS nickname_wp_postmeta ON nickname_wp_postmeta.post_id = wp_posts.ID AND nickname_wp_postmeta.meta_key = 'nickname' LEFT OUTER JOIN wp_postmeta AS trimlevel_wp_postmeta ON trimlevel_wp_postmeta.post_id = wp_posts.ID AND trimlevel_wp_postmeta.meta_key = 'trimlevel' LEFT OUTER JOIN wp_postmeta AS engine_wp_postmeta ON engine_wp_postmeta.post_id = wp_posts.ID AND engine_wp_postmeta.meta_key = 'engine' LEFT OUTER JOIN wp_postmeta AS horsepower_wp_postmeta ON horsepower_wp_postmeta.post_id = wp_posts.ID AND horsepower_wp_postmeta.meta_key = 'horsepower' LEFT OUTER JOIN wp_postmeta AS torque_wp_postmeta ON torque_wp_postmeta.post_id = wp_posts.ID AND torque_wp_postmeta.meta_key = 'torque' LEFT OUTER JOIN wp_postmeta AS gas_type_wp_postmeta ON gas_type_wp_postmeta.post_id = wp_posts.ID AND gas_type_wp_postmeta.meta_key = 'gas_type' LEFT OUTER JOIN wp_postmeta AS drivetrain_wp_postmeta ON drivetrain_wp_postmeta.post_id = wp_posts.ID AND drivetrain_wp_postmeta.meta_key = 'drivetrain' LEFT OUTER JOIN wp_postmeta AS interior_mods_wp_postmeta ON interior_mods_wp_postmeta.post_id = wp_posts.ID AND interior_mods_wp_postmeta.meta_key = 'interior_mods' LEFT OUTER JOIN wp_postmeta AS exterior_mods_wp_postmeta ON exterior_mods_wp_postmeta.post_id = wp_posts.ID AND exterior_mods_wp_postmeta.meta_key = 'exterior_mods' LEFT OUTER JOIN wp_postmeta AS body_style_wp_postmeta ON body_style_wp_postmeta.post_id = wp_posts.ID AND body_style_wp_postmeta.meta_key = 'body_style' LEFT OUTER JOIN wp_postmeta AS tires_wp_postmeta ON tires_wp_postmeta.post_id = wp_posts.ID AND tires_wp_postmeta.meta_key = 'tires' LEFT OUTER JOIN wp_postmeta AS curb_weight_wp_postmeta ON curb_weight_wp_postmeta.post_id = wp_posts.ID AND curb_weight_wp_postmeta.meta_key = 'curb_weight' LEFT OUTER JOIN wp_postmeta AS suspension_wp_postmeta ON suspension_wp_postmeta.post_id = wp_posts.ID AND suspension_wp_postmeta.meta_key = 'suspension' LEFT OUTER JOIN wp_postmeta AS blurb_wp_postmeta ON blurb_wp_postmeta.post_id = wp_posts.ID AND blurb_wp_postmeta.meta_key = 'blurb' LEFT OUTER JOIN wp_postmeta AS owner_wp_postmeta ON owner_wp_postmeta.post_id = wp_posts.ID AND owner_wp_postmeta.meta_key = 'owner' LEFT OUTER JOIN wp_postmeta AS qrcode_wp_postmeta ON qrcode_wp_postmeta.post_id = wp_posts.ID AND qrcode_wp_postmeta.meta_key = 'qrcode' LEFT OUTER JOIN wp_postmeta AS future_plans_wp_postmeta ON future_plans_wp_postmeta.post_id = wp_posts.ID AND future_plans_wp_postmeta.meta_key = 'future_plans' LEFT OUTER JOIN wp_postmeta AS wheelbase_wp_postmeta ON wheelbase_wp_postmeta.post_id = wp_posts.ID AND wheelbase_wp_postmeta.meta_key = 'wheelbase' LEFT OUTER JOIN wp_postmeta AS zero_to_sixty_wp_postmeta ON zero_to_sixty_wp_postmeta.post_id = wp_posts.ID AND zero_to_sixty_wp_postmeta.meta_key = 'zero_to_sixty' LEFT OUTER JOIN wp_postmeta AS sixty_to_zero_wp_postmeta ON sixty_to_zero_wp_postmeta.post_id = wp_posts.ID AND sixty_to_zero_wp_postmeta.meta_key = 'sixty_to_zero' LEFT OUTER JOIN wp_postmeta AS quarter_mile_wp_postmeta ON quarter_mile_wp_postmeta.post_id = wp_posts.ID AND quarter_mile_wp_postmeta.meta_key = 'quarter_mile' LEFT OUTER JOIN wp_postmeta AS brakes_wp_postmeta ON brakes_wp_postmeta.post_id = wp_posts.ID AND brakes_wp_postmeta.meta_key = 'brakes' LEFT OUTER JOIN wp_postmeta AS epa_mpg_wp_postmeta ON epa_mpg_wp_postmeta.post_id = wp_posts.ID AND epa_mpg_wp_postmeta.meta_key = 'epa_mpg' LEFT OUTER JOIN wp_postmeta AS awards_wp_postmeta ON awards_wp_postmeta.post_id = wp_posts.ID AND awards_wp_postmeta.meta_key = 'awards' LEFT OUTER JOIN wp_postmeta AS home_state_wp_postmeta ON home_state_wp_postmeta.post_id = wp_posts.ID AND home_state_wp_postmeta.meta_key = 'home_state' LEFT OUTER JOIN wp_postmeta AS owner_contact_info_wp_postmeta ON owner_contact_info_wp_postmeta.post_id = wp_posts.ID AND owner_contact_info_wp_postmeta.meta_key = 'owner_contact_info' LEFT OUTER JOIN wp_postmeta AS for_sale_wp_postmeta ON for_sale_wp_postmeta.post_id = wp_posts.ID AND for_sale_wp_postmeta.meta_key = 'for_sale' LEFT OUTER JOIN wp_postmeta AS additional_information_wp_postmeta ON additional_information_wp_postmeta.post_id = wp_posts.ID AND additional_information_wp_postmeta.meta_key = 'additional_information' LEFT OUTER JOIN wp_postmeta AS instagram_handle_wp_postmeta ON instagram_handle_wp_postmeta.post_id = wp_posts.ID AND instagram_handle_wp_postmeta.meta_key = 'instagram_handle' LEFT OUTER JOIN wp_postmeta AS youtube_video_1_wp_postmeta ON youtube_video_1_wp_postmeta.post_id = wp_posts.ID AND youtube_video_1_wp_postmeta.meta_key = 'youtube_video_1' LEFT OUTER JOIN wp_postmeta AS youtube_video_2_wp_postmeta ON youtube_video_2_wp_postmeta.post_id = wp_posts.ID AND youtube_video_2_wp_postmeta.meta_key = 'youtube_video_2' LEFT OUTER JOIN wp_postmeta AS vimeo_video_1_wp_postmeta ON vimeo_video_1_wp_postmeta.post_id = wp_posts.ID AND vimeo_video_1_wp_postmeta.meta_key = 'vimeo_video_1' LEFT OUTER JOIN wp_postmeta AS vimeo_video_2_wp_postmeta ON vimeo_video_2_wp_postmeta.post_id = wp_posts.ID AND vimeo_video_2_wp_postmeta.meta_key = 'vimeo_video_2' LEFT OUTER JOIN wp_postmeta AS featuredImage_wp_postmeta ON featuredImage_wp_postmeta.post_id = wp_posts.ID AND featuredImage_wp_postmeta.meta_key = 'featured_photo' LEFT OUTER JOIN wp_posts AS featuredImage_wp_posts ON featuredImage_wp_posts.id = featuredImage_wp_postmeta.meta_value WHERE wp_posts.post_type = 'vehicle'   AND wp_posts.post_status = 'publish' ORDER BY wp_posts.post_date ASC`;

  const db = await mysql.createConnection(connection);
  const [rows] = await db.execute(query);
  return rows;
}

export async function scrapeVehicles() {
  console.log(`Scraping Vehicles...`);
  const wpVehicles = await getVehicles();
  for (const wpVehicle of wpVehicles) {
    const vehicle = await processVehicle(wpVehicle);
    createVehicleLikes(vehicle);
  }
  console.log(`Scraping Vehicles Completed...`);
}
