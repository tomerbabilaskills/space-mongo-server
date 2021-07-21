const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const visitorSchema = new Schema({
  name: String,
  homePlanet: { type: ObjectId, ref: 'Planet' },
  visitedPlanets: [{ type: ObjectId, ref: 'Planet' }],
});

module.exports = mongoose.model('Visitor', visitorSchema);
