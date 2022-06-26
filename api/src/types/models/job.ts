import { model, Schema } from "mongoose";
import { IJob } from "../job";

const jobSchema: Schema = new Schema(
    {
        userAddress: {
            type: String,
            required: true,
        },
        taskId: {
            type: String,
            required: true,
        },
        proof: {
            type: Number,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default model<IJob>("job", jobSchema);
