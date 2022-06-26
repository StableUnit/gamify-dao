import { model, Schema } from "mongoose";
import { ITask } from "../task";

const taskSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        proofFormat: {
            type: String,
            required: false,
        },
        xp: {
            type: Number,
            required: false,
        },
        repeats: {
            type: Number,
            required: false,
        },
        deadlineMs: {
            type: Number,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        onCompleteCall: {
            type: String,
            required: false,
        },
        minLevel: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true }
);

export default model<ITask>("task", taskSchema);
