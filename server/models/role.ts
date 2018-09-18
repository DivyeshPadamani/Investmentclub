const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    classes: [{ type: Schema.Types.ObjectId, ref: "class" }],
    role: String,
});
RoleSchema.plugin(mongoosePaginate);

export default mongoose.model("role", RoleSchema);
