const mongoose, {Schema} = require('mongoose');

const visitorSchema = new Schema({
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planet'}]
});

module.exports = mongoose.model('Visitor', visitorSchema);