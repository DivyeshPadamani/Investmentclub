const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: String,
    industry: String,
    ipoYear: Date,
    marketCap: String,
    nasdaqLink: String,
    sector: String,
    ticker: String,
    market: String,

    lastPrice: Number,
    high: Number,
    low: Number,
    open: Number,
    close: Number,
    volume: Number,
    peRatio: Number,
    week52High: Number,
    week52Low: Number,
    change: Number,
    changePercent: Number,

    news: String
});

CompanySchema.plugin(mongoosePaginate);

export default mongoose.model("company", CompanySchema);
