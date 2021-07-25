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

router.get('/:id', async (req, res) => {
  const visitorId = req.params.id;

  try {
    const visitedPlanets = await visitorModel
      .findById(visitorId)
      .populate({ path: 'visitedPlanets', select: 'name' });

    res.json(visitedPlanets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
