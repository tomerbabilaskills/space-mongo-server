const mongoose, {Schema} = require('mongoose');

const solarSystemSchema = new Schema({
    starName: String,
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
});

module.exports = mongoose.model('SolarSystem', solarSystemSchema);