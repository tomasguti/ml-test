var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var got = require('got');

const ENDPOINT_SEARCH = 'https://api.mercadolibre.com/sites/MLA/search?q=';
const ENDPOINT_ITEMS = 'https://api.mercadolibre.com/items/';

router.get('/:id', function(req, res, next) {

  const id = req.params.id;

  if (!id) {
    next(createError(400));
    return;
  }

  const result = id;
  res.send(result);
});

router.get('/', function(req, res, next) {

  const query = req.query.q;

  if (!query) {
    next(createError(400));
    return;
  }

  const result = query;
  res.send(result);
});

module.exports = router;
