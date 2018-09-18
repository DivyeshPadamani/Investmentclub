const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    action: String,
    amount: Number,
    company: { type: Schema.Types.ObjectId, ref: "company" },
    completed: Boolean,
    expiration: Date,
    orderPrice: Number,
    stopLoss: Number,
    time: { type: Date, default: Date.now }
});
OrderSchema.plugin(mongoosePaginate);

export default mongoose.model("order", OrderSchema);
