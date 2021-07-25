const { Router } = require('express');
const mongoose = require('mongoose');
const planetModel = require('../models/planetModel');
const solarSystemModel = require('../models/solarSystemModel');
const visitorModel = require('../models/visitorModel');

const router = Router();

const { ObjectId } = mongoose.Types;

// [GET] - find all visitors of solar system
router.get('/visitors/:id?', async (req, res) => {
  const systemId = req.params.id;

  try {
    const pipeline = [
      {
        $lookup: {
          from: planetModel.collection.name,
          localField: 'planets',
          foreignField: '_id',
          as: 'planets',
        },
      },
      {
        $lookup: {
          from: visitorModel.collection.name,
          localField: 'planets.visitors',
          foreignField: '_id',
          as: 'visitors',
        },
      },
      { $project: { _id: 1, starName: 1, visitors: { _id: 1, name: 1 } } },
    ];

    if (systemId) pipeline.unshift({ $match: { _id: ObjectId(systemId) } });

    let response = await solarSystemModel.aggregate(pipeline);
    response = response.length === 1 ? response[0] : response;

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
