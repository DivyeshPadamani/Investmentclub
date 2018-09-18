import Company from "../models/company";
import * as fs from 'fs';

const NASDAQ_CSV = "companylist-nasdaq.csv";
const NYSE_CSV = "companylist-nyse.csv";

export async function loadCompanies() {
    const existing = await Company.find({});
    if (existing.length) {
        return;
    }
    if (fs.existsSync(NASDAQ_CSV)) {
        const str = fs.readFileSync(NASDAQ_CSV, "utf-8");
        const companies = str.split("\r\n");

        const companiesCreateQuery = [];
        companies.forEach(companyString => {
            const components = companyString.split('","').map(component => component.replace('"', ''));

            const ticker = components[0];

            if (ticker.length === 0) {
                return;
            }
            
            const companyName = components[1];
            const lastPrice = (components[2] !== 'n/a') ? components[2] : null;
            const marketCap = components[3];
            const ipoYear = (components[4] !== 'n/a') ? components[4] : null;
            const sector = components[5];
            const industry = components[6];
            const nasdaqLink = components[7];
            const market = "NASDAQ";

            const companyQuery = {
                industry,
                ipoYear,
                lastPrice,
                marketCap,
                companyName,
                nasdaqLink,
                sector,
                ticker,
                market
            };

            companiesCreateQuery.push(companyQuery);
        });

        await Company.create(companiesCreateQuery);
    }
    if (fs.existsSync(NYSE_CSV)) {
        const str = fs.readFileSync(NYSE_CSV, "utf-8");
        const companies = str.split("\r\n");

        const companiesCreateQuery = [];
        companies.forEach(companyString => {
            const components = companyString.split('","').map(component => component.replace('"', ''));

            const ticker = components[0];

            if (ticker.length === 0) {
                return;
            }
            
            const companyName = components[1];
            const lastPrice = (components[2] !== 'n/a') ? components[2] : null;
            const marketCap = components[3];
            const ipoYear = (components[4] !== 'n/a') ? components[4] : null;
            const sector = components[5];
            const industry = components[6];
            const nasdaqLink = components[7];
            const market = "NYSE";
            const companyQuery = {
                industry,
                ipoYear,
                lastPrice,
                marketCap,
                companyName,
                nasdaqLink,
                sector,
                ticker,
                market
            };

            companiesCreateQuery.push(companyQuery);
        });

        await Company.create(companiesCreateQuery);
    }
}
