const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    poster: { type: Schema.Types.ObjectId, ref: "user" },
    class: { type: Schema.Types.ObjectId, ref: "class" },
    body: String,
    emailed: Boolean,
    time: { type: Date, default: Date.now }
});

PostSchema.plugin(mongoosePaginate);

export default mongoose.model("post", PostSchema);
