const { Router } = require('express');
const mongoose = require('mongoose');
const planetModel = require('../models/planetModel');
const solarSystemModel = require('../models/solarSystemModel');
const visitorModel = require('../models/visitorModel');

const router = Router();

const mockData = {
  solarSystems: [
    { starName: 'Sun' },
    { starName: 'Proxima Centauri' },
    { starName: 'Lalande 21185' },
  ],
  planets: [
    { name: 'Earth' },
    { name: 'Jupiter' },
    { name: 'Saturn' },
    { name: 'Neptune' },
    { name: 'Altair' },
    { name: 'Rigel' },
    { name: 'Sirius' },
    { name: 'Pollux' },
    { name: 'Deneb' },
    { name: 'Arcturus' },
  ],
  visitors: [
    { name: 'Tomer' },
    { name: 'Ron' },
    { name: 'Shaked' },
    { name: 'Dvir' },
    { name: 'Moshe' },
    { name: 'Yuval' },
  ],
};

router.post('/', async (req, res) => {
  try {
    const newSolarSystems = await solarSystemModel.create(
      mockData.solarSystems
    );
    const newPlanets = await planetModel.create(mockData.planets);
    const newVisitors = await visitorModel.create(mockData.visitors);

    res.json({ newSolarSystems, newPlanets, newVisitors });
  } catch (error) {
    res.send(error);
  }
});

router.post('/connections', async (req, res) => {
  const whatToFind = req.body.type;

  try {
    if (whatToFind === 'planet') {
      await planetModel.findByIdAndUpdate(req.body.id, {
        system: mongoose.Types.ObjectId(req.body.systemId),
      });
    }
    if (whatToFind === 'visitor') {
      await visitorModel.findByIdAndUpdate(req.body.id, {
        homePlanet: mongoose.Types.ObjectId(req.body.planetId),
      });
    }

    res.send(`${whatToFind} updated`);
  } catch (error) {
    console.log(error);
  }
});

router.post('/reset', async (req, res) => {
  try {
    await planetModel.updateMany({}, { visitors: [] });
    await visitorModel.updateMany({}, { visitedPlanets: [] });

    res.send('reset visits');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
