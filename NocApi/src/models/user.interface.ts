import { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    facebook: string;
    tokens: [
        {
            kind: string;
            accessToken: string;
        }
    ];
    profile: {
        name: string;
        gender: string;
        picture: string;
    };
    createdAt: Date;
    updateAt: Date;
    validatePassword(): boolean;
}
