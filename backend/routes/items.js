var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var got = require('got');

// Map the currencies to have a cache. Since they are unlikely to change.
var currencies = require('../data/currencies.json');
var currenciesSymbols = new Object();
for (let currency of currencies) {
  currenciesSymbols[currency.id] = currency.symbol;
}

const ENDPOINT_SEARCH = 'https://api.mercadolibre.com/sites/MLA/search';
const ENDPOINT_ITEMS = 'https://api.mercadolibre.com/items';
const ENDPOINT_CATEGORIES = 'https://api.mercadolibre.com/categories';

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

  result.categories = await getCategoryPathById(item.category_id);
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
  result.categories = getCategoryPathFromFilters(search.filters);
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
  if (item.address) {
    newItem.address_state = item.address.state_name;
  }
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
    picture = firstPicture.url.replace('-O.', '-B.');
  } else if (item.thumbnail) {
    // Replaces the last character of the URL to request a bigger thumbnail
    picture = item.thumbnail.replace('-I.', '-N.');
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

  price.currency = currenciesSymbols[item.currency_id];
  price.amount = parseInt(splitted[0]);

  return price;
}

/**
 * Gets the available categories from the endpoint filter.
 * @param {Object} search the object returned from the search endpoint
 */
function getCategoryPathFromFilters(filters) {

  let result = [];

  // Get the category filter.
  const CATEGORY_ID = 'category';
  const getCategoryFilterById = filter => filter.id === CATEGORY_ID;
  let categories = filters.find(getCategoryFilterById);

  if (categories && categories.values && categories.values.length > 0) {
    const first = categories.values[0];
    for (let subcategory of first.path_from_root) {
      result.push(subcategory.name);
    }
  }

  return result;
}

/**
 * Returns the category path from root as an ordered string array.
 * @param {string} category_id the category id
 */
async function getCategoryPathById(category_id) {
  
  let result = [];
  let category = await fetchJson(`${ENDPOINT_CATEGORIES}/${category_id}`);

  if (category && category.path_from_root && category.path_from_root.length > 0) {
    for (let subcategory of category.path_from_root) {
      result.push(subcategory.name);
    }
  }

  return result;
}

module.exports = router;
