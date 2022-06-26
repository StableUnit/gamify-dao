import { Document } from "mongoose";

export interface IJob extends Document {
    userAddress: string;
    taskId: number;
    proofs: [];
    status: string;
    isConfirmed: boolean;
}
