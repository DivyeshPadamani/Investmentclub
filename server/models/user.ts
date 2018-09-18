const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    birthday: Date,
    email: String,
    firstName: String,
    hash: Buffer,
    icon: String,
    lastName: String,
    roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
    salt: String,
    cash: Number,
    time: { type: Date, default: Date.now },
    type: String,
    token: String,
    orders: [{ type: Schema.Types.ObjectId, ref: "order" }],
    positions: [{ type: Schema.Types.ObjectId, ref: "position" }]
});
UserSchema.plugin(mongoosePaginate);

export default mongoose.model("user", UserSchema);
