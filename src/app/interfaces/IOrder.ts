import ICompany from './ICompany';

export default interface IOrder {
    action: String;
    amount: String;
    stopLoss: Number;
    company: ICompany;
    completed: Boolean;
    expiration: Date;
    orderPrice: Number;
    time: Date;
}
