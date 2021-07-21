const { Router } = require('express');
const mongoose = require('mongoose');
const planetModel = require('../models/planetModel');
const visitorModel = require('../models/visitorModel');

const router = Router();

const { ObjectId } = mongoose.Types;

router.post('/visit', async (req, res) => {
  const { planetId, visitorId } = req.body;

  const visitor = await visitorModel.findByIdAndUpdate(visitorId, {
    $push: { visitedPlanets: ObjectId(planetId) },
  });

  const planet = await planetModel.findByIdAndUpdate(planetId, {
    $push: { visitors: ObjectId(visitorId) },
  });

  res.json({ visitor, planet });
});

module.exports = router;
