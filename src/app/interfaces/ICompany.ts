export default interface ICompany {
    companyName: String;
    industry: String;
    ipoYear: Date;
    marketCap: String;
    nasdaqLink: String;
    sector: String;
    ticker: String;
    market: String;
    // market
    lastPrice: Number;
    high: Number;
    low: Number;
    open: Number;
    close: Number;
    volume: Number;
    peRatio: Number;
    week52High: Number;
    week52Low: Number;
    change: Number;
    changePercent: Number;
    news: String;

    _id: String;
}
