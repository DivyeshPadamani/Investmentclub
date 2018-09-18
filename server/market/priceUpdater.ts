import Company from "../models/company";

import axios from 'axios';

const API_KEY = "E4TIY0KLYY6CV1OD";

const API_ENDPOINT = "https://api.iextrading.com/1.0/stock/market/batch?symbols={TICKER}&types=quote,news&range=6m";

const TIME_DELAY = 2000;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updatePrices(done) {
    const companies = await Company.find({});

    const companyUpdates = [];
    for (var i = 0; i < companies.length; i += 100) {
        const checking = [];

        // grab the 100 we're gonna check
        for (var j = i; j < Math.min(companies.length, i + 100); j++) {
            checking.push(companies[j]);
        }

        const tickers = checking.map(company => company.ticker);
        const tickerString = tickers.join(",");

        const queryString = API_ENDPOINT.replace("{TICKER}", tickerString);

        const quoteResponse = await axios.get(queryString);

        if (quoteResponse.status !== 200) {
            console.log("Failed to get stock quote!");
            return;
        }

        const data = quoteResponse.data;

        Object.keys(data).forEach(key => {
            const quote = data[key].quote;
            companyUpdates.push({
                ticker: key,
                lastPrice: quote.latestPrice,
                high: quote.high,
                low: quote.low,
                close: quote.close,
                open: quote.open,
                volume: quote.latestVolume,
                peRatio: quote.peRatio,
                week52High: quote.week52High,
                week52Low: quote.week52Low,
                change: quote.change,
                changePercent: quote.changePercent,
                news: JSON.stringify(data[key].news)
            })
        });

        await timeout(TIME_DELAY);
    }

    var bulkUpdateCallback = function (err, r) {
    }

    var bulkUpdateOps = [],
        counter = 0;

    companyUpdates.forEach(function (update) {
        bulkUpdateOps.push({
            "updateOne": {
                "filter": { "ticker": update.ticker },
                "update": { "$set": update }
            }
        });
        counter++;

        if (counter % 500 == 0) {
            // Get the underlying collection via the native node.js driver collection object
            Company.collection.bulkWrite(bulkUpdateOps, { "ordered": true, w: 1 }, bulkUpdateCallback);
            bulkUpdateOps = []; // re-initialize
        }
    })

    if (counter % 500 != 0) { Company.collection.bulkWrite(bulkUpdateOps, { "ordered": true, w: 1 }, bulkUpdateCallback); }
    
    done(done);
}