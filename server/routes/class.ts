import { Request, Response, Router } from "express";
import Class from "../models/class";
import Users from "../models/user";
import Role from "../models/role";
import Post from "../models/post";

function randomString(length) {
    var mask = '';
    // remove O and I to minimize confusion
    mask += 'ACDEFGHJKLMNPQRSTUVWXYZ';
    mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

const classRouter: Router = Router();

classRouter.get("/", async (request: Request, response: Response) => {
    const classes = await Class.find({});
    response.json(classes);
});

classRouter.get("/:id", async (request: Request, response: Response) => {
    const foundClass = await Class.findOne({ _id: request.params.id }).populate("instructors students").populate({
        path: "posts",
        populate: { path: "poster" }
    });
    response.json(foundClass);
});

classRouter.post("/post/:id", async (request: Request, response: Response) => {
    const user = await Users.findOne({ token: request.body.token });
    const foundClass = await Class.findOne({ _id: request.params.id, instructors: { $all: [user._id] } }).populate("instructors posts students");

    if (!foundClass) {
        response.status(400);
        return;
    }

    const postCreation = {
        poster: user._id,
        class: foundClass._id,
        body: request.body.body,
        emailed: request.body.emailed
    };

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vestomailinglist@gmail.com',
            pass: 'vesto-password'
        }
    });

    if (request.body.emailed) {
        var mailOptions = {
            from: 'vestomailinglist@gmail.com',
            to: foundClass.students.map(student => student.email).join(","),
            subject: '[Vesto] Notification from ' + user.lastName + ", " + user.firstName + " in " + foundClass.name,
            text: request.body.body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    const createdPost = await Post.create(postCreation);

    await Class.findOneAndUpdate({ _id: request.params.id }, { $push: { posts: createdPost._id } });

    response.json(createdPost);
});

classRouter.post("/", async (request: Request, response: Response) => {
    const user = await Users.findOne({ token: request.body.token });
    let classCode;
    do {
        classCode = randomString(4);
    } while (await Class.count({ classCode }) !== 0);

    const classCreation = {
        instructors: [user._id],
        classCode,
        name: request.body.name,
        posts: [],
        students: []
    };

    const createdClass = await Class.create(classCreation);

    const roleCreation = {
        role: "Mentor",
        classes: [createdClass._id]
    };
    const role = await Role.create(roleCreation);

    await Users.findOneAndUpdate({ token: request.body.token }, { $push: { roles: role } });
    response.json(createdClass);
});

export { classRouter };
