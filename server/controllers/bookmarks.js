/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Bookmark from '../models/bookmark';
import bodyValidator from '../validators/bookmarks/body';
import queryValidator from '../validators/bookmarks/query';
import paramsValidator from '../validators/bookmarks/params';
const router = module.exports = express.Router();

// index
router.get('/', queryValidator, (req, res) => {
  Bookmark.find(res.locals.filter)
          .sort(res.locals.sort)
          .limit(res.locals.limit)
          .skip(res.locals.skip)
          .exec((err, bookmarks) => {
            res.send({ bookmarks });
          });
});

// show
router.get('/:id', paramsValidator, (req, res) => {
  Bookmark.findById(req.params.id, (err, bookmark) => {
    res.send({ bookmark });
  });
});

// update
router.put('/:id', paramsValidator, bodyValidator, (req, res) => {
  Bookmark.findByIdAndUpdate(req.params.id, res.locals, { new: true }, (err, bookmark) => {
    res.send({ bookmark });
  });
});

// create
router.post('/', bodyValidator, (req, res) => {
  Bookmark.create(res.locals, (err, bookmark) => {
    res.send({ bookmark });
  });
});

// delete
router.delete('/:id', paramsValidator, (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id, (err, bookmark) => {
    if (bookmark) {
      res.send({ id: bookmark._id });
    } else {
      res.status(400).send({ messages: ['id not found'] });
    }
  });
});
