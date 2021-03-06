const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT * 
    FROM users 
    WHERE email = $1;
  `, [email])
  .then(res => res.rows[0]);
}
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  return pool.query(`
    SELECT * 
    FROM users
    WHERE id = $1;
  `, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const queryString = `INSERT INTO users(name,email,password) VALUES ($1, $2,$3) RETURNING *;`
  return pool.query(queryString, [user.name, user.email, user.password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit) {
  const queryStringResos = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `
  return pool.query(queryStringResos, [guest_id, limit = 10])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;




/// Properties




/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit) {

  //1
  const queryParams = [];

  //2
let queryString = 
` SELECT properties.*, avg(property_reviews.rating) as  average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (!options.city) {
    options.city = 'Montreal'
  } 

  queryString += `WHERE city LIKE $1`
  queryParams.push(`%${options.city}%`)
  // console.log(options.minimum_price_per_night)
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryString += ` AND (cost_per_night > $2 AND cost_per_night < $3)`
    queryParams.push(`${options.minimum_price_per_night * 100}`)
    queryParams.push(`${options.maximum_price_per_night * 100}`)
  } 
  
  queryString += `
  GROUP BY properties.id`;

  if(options.minimum_rating) {
    queryString += ` HAVING avg(property_reviews.rating) >= $4`
    queryParams.push(`${options.minimum_rating}`)
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // console.log(queryString, queryParams)

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties





/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property)
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  const propertyParams = [
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.owner_id
  ]
  const insertString = `INSERT INTO properties(title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms, owner_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`
  return pool.query(insertString, propertyParams)
  .then(res => res.rows[0]);
}
exports.addProperty = addProperty;
