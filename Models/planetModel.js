const mongoose, {Schema} = require('mongoose');

const planetSchema = new Schema({
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'System'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
});

module.exports = mongoose.model('Planet', planetSchema);