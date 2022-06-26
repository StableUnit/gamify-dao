import { model, Schema } from "mongoose";
import { ITask } from "../task";

const taskSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        proofFormat: {
            type: String,
            required: true,
        },
        reward: {
            type: Number,
            required: true,
        },
        repeats: {
            type: Number,
            required: true,
        },
        deadlineMs: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        onCompleteCall: {
            type: String,
            required: true,
        },
        minLevel: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<ITask>("task", taskSchema);
