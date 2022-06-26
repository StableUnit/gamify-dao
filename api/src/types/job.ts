import { Document } from "mongoose";

export interface IJob extends Document {
    userAddress: string;
    taskId: string;
    proof: string;
    status: string;
}
