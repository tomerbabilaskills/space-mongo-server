const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const solarSystemSchema = new Schema({
  starName: String,
  planets: [{ type: ObjectId, ref: 'Planet' }],
});

module.exports = mongoose.model('SolarSystem', solarSystemSchema);
