const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    instructors: [{ type: Schema.Types.ObjectId, ref: "user" }],
    classCode: String,
    name: String,
    time: { type: Date, default: Date.now },
    students: [{ type: Schema.Types.ObjectId, ref: "user" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }]
});

ClassSchema.plugin(mongoosePaginate);

export default mongoose.model("class", ClassSchema);
