import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;
    @Prop()
    password: string;
    @Prop()
    status: string;
    @Prop()
    list: String[];
    @Prop()
    friends: Array<ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);
