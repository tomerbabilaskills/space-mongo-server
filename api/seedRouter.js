const { Router } = require('express');
const planetModel = require('../Models/planetModel');
const solarSystemModel = require('../Models/solarSystemModel');
const visitorModel = require('../Models/visitorModel');

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

module.exports = router;
