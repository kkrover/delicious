/* eslint-disable consistent-return, no-param-reassign */

import joi from 'joi';

const schema = {
  page: joi.number().default(1),
  limit: joi.number().default(25),
  filter: joi.object().keys({
    title: joi.string(),
    isProtected: joi.boolean(),
    stars: joi.number(),
  }),
  sort: joi.object(),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.query, schema);

  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    res.locals.skip = (res.locals.page - 1) * res.locals.limit;
    next();
  }
};
