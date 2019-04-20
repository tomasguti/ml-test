var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var got = require('got');

const ENDPOINT_SEARCH = 'https://api.mercadolibre.com/sites/MLA/search';
const ENDPOINT_ITEMS = 'https://api.mercadolibre.com/items';
const SEARCH_LIMIT = 4;

const AUTHOR = {
  name: 'Tomás',
  lastname: 'Gutiérrez'
}

/**
 * This catches and handles the possible errors from async functions.
 * Passing them to the express next step.
 */
const asyncMiddleware = handler => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

/**
 * Returns a JSON from a given URL.
 * @param {string} url endpoint
 */
async function fetchJson(url) {
  const body = await got(url, { json: true }).then(response => response.body);
  return body;
}

/**
 * Gets a item by its id.
 */
router.get('/:id', asyncMiddleware(async (req, res) => {

  const id = req.params.id;

  if (!id) {
    throw createError(400);
  }

  const result = new Object();
  result.author = AUTHOR;

  const item = await fetchJson(`${ENDPOINT_ITEMS}/${id}`);
  const description = await fetchJson(`${ENDPOINT_ITEMS}/${id}/description`);

  result.item = transformItem(item);
  result.item.sold_quantity = item.sold_quantity;
  result.item.description = description.plain_text;

  res.send(result);
}));

/**
 * Search by query.
 */
router.get('/', asyncMiddleware(async (req, res) => {

  const query = req.query.q;

  if (!query) {
    throw createError(400);
  }

  const search = await fetchJson(`${ENDPOINT_SEARCH}?q=${query}&limit=${SEARCH_LIMIT}`);

  const result = new Object();
  result.author = AUTHOR;
  result.categories = getCategories(search);
  result.items = new Array();

  if (search.results) {
    result.items = search.results.map(transformItem);
  }

  res.send(result);
}));

/**
 * Transforms an item into the desired format.
 * @param {Object} item an item result from the endpoint
 */
function transformItem(item) {
  const newItem = new Object();

  newItem.id = item.id;
  newItem.title = item.title;
  newItem.price = getPrice(item);
  newItem.picture = getPicture(item);
  newItem.condition = item.condition;
  newItem.free_shipping = item.shipping.free_shipping;

  return newItem;
}

/**
 * Returns the first picture if available or the thumbnail.
 * @param {Object} item an item result from the endpoint
 */
function getPicture(item) {

  let picture = '';

  if (item.pictures && item.pictures.length > 0) {
    const firstPicture = item.pictures.shift();
    picture = firstPicture.url;
  } else if (item.thumbnail) {
    picture = item.thumbnail;
  }

  return picture;
}

/**
 * Splits the item price into amount and decimals,
 * adds the currency and returns a price object.
 * @param {Object} item an item result from the endpoint
 */
function getPrice(item) {

  const price = new Object();
  const number = item.price.toString();
  const splitted = number.split('.');

  if (splitted.length > 1) {
    price.decimals = parseInt(splitted[1]);
  } else {
    price.decimals = 0;
  }

  price.currency = item.currency_id;
  price.amount = parseInt(splitted[0]);

  return price;
}

/**
 * Gets the available categories from the endpoint filter.
 * @param {Object} search the object returned from the search endpoint
 */
function getCategories(search) {

  const CATEGORY_ID = 'category';
  const getCategoryFilterById = filter => filter.id === CATEGORY_ID;
  
  let categories;

  // Search them in the filters.
  if (search.filters) {
    categories = search.filters.find(getCategoryFilterById);
  }

  // If not present, search them in the available_filters.
  if (!categories && search.available_filters) {
    categories = search.available_filters.find(getCategoryFilterById);
  }

  // Push all the available categories.
  for (let category of categories.values) {
    categories.push(category.name);
  }

  return categories || [];
}

module.exports = router;
