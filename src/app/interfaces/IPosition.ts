import ICompany from './ICompany';

export default interface IPosition {
    action: String;
    amount: number;
    company: ICompany;
}
