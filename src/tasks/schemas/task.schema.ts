import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    title: string;
    @Prop()
    done: number;//1 - done, 0 - processing
    @Prop()
    createdAt: number;
    @Prop()
    finishAt: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
