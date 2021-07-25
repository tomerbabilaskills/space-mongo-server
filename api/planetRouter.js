const { Router } = require('express');
const mongoose = require('mongoose');
const planetModel = require('../models/planetModel');
const visitorModel = require('../models/visitorModel');

const router = Router();

const { ObjectId } = mongoose.Types;

// [GET] - find all visitors on a planet
router.get('/:id?', async (req, res) => {
  const planetId = req.params.id;

  try {
    const pipeline = [
      {
        $lookup: {
          from: visitorModel.collection.name,
          localField: 'visitors',
          foreignField: '_id',
          as: 'visitors',
        },
      },
      { $project: { _id: 1, name: 1, visitors: { _id: 1, name: 1 } } },
    ];

    if (planetId) pipeline.unshift({ $match: { _id: ObjectId(planetId) } });

    let response = await planetModel.aggregate(pipeline);
    response = response.length === 1 ? response[0] : response;

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
