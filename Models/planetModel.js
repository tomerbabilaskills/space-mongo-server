const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const planetSchema = new Schema({
  name: String,
  system: { type: ObjectId, ref: 'System' },
  visitors: [{ type: ObjectId, ref: 'Visitor' }],
});

module.exports = mongoose.model('Planet', planetSchema);
