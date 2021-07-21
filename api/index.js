const { Router } = require('express');
const solarSystemRouter = require('./solarSystemRouter');
const planetRouter = require('./planetRouter');
const visitorRouter = require('./visitorRouter');
const seedRouter = require('./seedRouter');

const router = Router();

router.use('/seed', seedRouter);
router.use('/solar-system', solarSystemRouter);
router.use('/planet', planetRouter);
router.use('/visitor', visitorRouter);

module.exports = router;
