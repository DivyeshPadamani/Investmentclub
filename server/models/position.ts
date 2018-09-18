const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    action: String,
    amount: Number,
    company: { type: Schema.Types.ObjectId, ref: "company" },
    order: { type: Schema.Types.ObjectId, ref: "order" }
});
PositionSchema.plugin(mongoosePaginate);

export default mongoose.model("position", PositionSchema);
