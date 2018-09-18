import IUser from './IUser';
import IPost from './IPost';

export default interface IClass {
    instructors: IUser[];
    classCode: String;
    name: String;
    time: Date;
    post: IPost;
    students: IUser[];
    _id: String;
}
