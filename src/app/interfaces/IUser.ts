import IRole from './IRole';

export default interface IUser {
    firstName: String;
    lastName: String;
    email: String;
    birthday: Date;
    icon: String;
    cash: Number;
    type: String;
    roles: IRole[];
    _id: String;
}
