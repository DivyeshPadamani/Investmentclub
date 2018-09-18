import IUser from './IUser';
import IClass from './IClass';

export default interface IPost {
    poster: IUser;
    class: IClass;
    body: String;
    emailed: Boolean;
    time: Date;
}
